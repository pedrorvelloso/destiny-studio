import React, { useEffect, useCallback } from 'react';
import { useTransition } from 'react-spring';
import { useDispatch, useSelector } from 'react-redux';

import Donation from 'models/Donation';

import { useSocket } from 'modules/SocketManager';

import RootState from 'store/RootState';
import { actions as donationsActions } from 'store/ducks/donations';
import { actions as eventsActions } from 'store/ducks/events';
import { actions as dashboardActionsSaga } from 'store/sagas/dashboard';

import api from 'services/api';

import DonationBox from 'components/DonationBox';
import SimpleBox from 'components/SimpleBox';
import AnimatedValue from 'components/AnimatedValue';

import { Container, DonationsList, Boxes, EventInfo } from './styles';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();

  const { donations, event, total } = useSelector((state: RootState) => ({
    donations: state.donations,
    event: state.events.activeEvent,
    total: state.events.total,
  }));

  const { socket } = useSocket();

  const handleReview = useCallback(
    async (donationId) => {
      const { data: donation } = await api.patch<Donation>(
        `/donations/${donationId}/review`,
      );
      dispatch(donationsActions.reviewDonation({ reviewedDonation: donation }));
    },
    [dispatch],
  );

  const donationsWithTransition = useTransition(
    donations,
    (donation) => donation.id,
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
    },
  );

  useEffect(() => {
    dispatch(dashboardActionsSaga.getDashboard());
  }, [dispatch]);

  useEffect(() => {
    socket.on(`total_donations:${event?.id}`, (data: number) => {
      dispatch(eventsActions.setTotalActiveEvent({ total: data }));
    });

    socket.on(`new_donation:${event?.id}`, (data: Donation) => {
      dispatch(donationsActions.addDonation({ donation: data }));
    });

    socket.on(`new_reviewed_donation:${event?.id}`, (data: Donation) => {
      dispatch(donationsActions.reviewDonation({ reviewedDonation: data }));
    });
  }, [dispatch, event, socket]);

  return (
    <Container>
      <EventInfo>
        <h1>{event?.name}</h1>
        <span>{event?.description}</span>
      </EventInfo>
      <Boxes>
        <SimpleBox title="TOTAL" color="primary">
          R$ <AnimatedValue value={total} formatValue={(n) => n.toFixed(2)} />
        </SimpleBox>
        <SimpleBox title="NUM. DONATIONS" color="info">
          <AnimatedValue
            value={donations.length}
            formatValue={(n) => n.toFixed(0)}
          />
        </SimpleBox>
      </Boxes>
      <DonationsList>
        {donationsWithTransition.map(({ item, key, props }) => (
          <DonationBox
            style={props}
            key={key}
            from={item.from}
            message={item.message}
            amount={item.amount}
            reviewer={item.reviewer?.name}
            createdAt={item.created_at}
            onReview={() => handleReview(item.id)}
          />
        ))}
      </DonationsList>
    </Container>
  );
};

export default Dashboard;
