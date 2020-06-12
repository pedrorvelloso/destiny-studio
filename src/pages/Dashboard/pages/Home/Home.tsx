import React, { useEffect, useCallback, useReducer } from 'react';
import { useTransition } from 'react-spring';
import InfiniteScroll from 'react-infinite-scroller';

import Donation from 'models/Donation';
import Event from 'models/Event';

import { useSocket } from 'modules/SocketManager';

import api from 'services/api';
import { useAuth } from 'modules/AuthManager';

import DonationBox from 'components/DonationBox';
import SimpleBox from 'components/SimpleBox';
import AnimatedValue from 'components/AnimatedValue';
import FullScreenLoading from 'components/FullScreenLoading';
import LoadingIndicator from 'components/LoadingIndicator';

import { initialState, reducer } from './state';
import { DonationsList, Boxes, EventInfo } from './styles';

const Home: React.FC = () => {
  const [
    { donations, total, activeEvent, loadingActiveEvent, hasMore, cursor },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { socket } = useSocket();
  const { user } = useAuth();

  const handleReview = useCallback(async (donationId) => {
    const { data: donation } = await api.patch<Donation>(
      `/donations/${donationId}/review`,
    );
    dispatch({ type: 'reviewDonation', donation });
  }, []);

  const fetchDashboard = useCallback(async () => {
    const { data: event } = await api.get<Event>('/events/active');
    dispatch({ type: 'activeEvent', event });

    api.get<{ total: number }>(`/events/${event.id}/total`).then(({ data }) => {
      dispatch({ type: 'total', total: data.total });
    });

    api
      .get(`/events/${event.id}/donations`, {
        params: {
          limit: 5,
        },
      })
      .then(({ data }) => {
        dispatch({
          type: 'donations',
          donations: data.donations,
          hasMore: data.hasNextPage,
          cursor: data.cursor,
        });
      });
  }, []);

  const loadMore = useCallback(async () => {
    const { data } = await api.get(`/events/${activeEvent?.id}/donations`, {
      params: {
        limit: 5,
        cursor,
      },
    });
    dispatch({
      type: 'pagination',
      donations: data.donations,
      hasMore: data.hasNextPage,
      cursor: data.cursor,
    });
  }, [activeEvent, cursor]);

  const donationsWithTransition = useTransition(
    donations,
    (donation) => donation.id,
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
    },
  );

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  useEffect(() => {
    socket.on(`total_donations:${activeEvent?.id}`, (data: number) => {
      dispatch({ type: 'total', total: data });
    });

    socket.on(`new_donation:${activeEvent?.id}`, (data: Donation) => {
      dispatch({ type: 'addDonation', donation: data });
    });

    socket.on(`new_reviewed_donation:${activeEvent?.id}`, (data: Donation) => {
      dispatch({ type: 'reviewDonation', donation: data });
    });
  }, [activeEvent, socket]);

  if (loadingActiveEvent && !activeEvent) return <FullScreenLoading />;

  return (
    <div>
      <EventInfo>
        <h1>
          {activeEvent?.name} <span>ID: {activeEvent?.id}</span>
        </h1>
        <span>{activeEvent?.description}</span>
      </EventInfo>
      <Boxes>
        <SimpleBox title="TOTAL" color="primary">
          R$ <AnimatedValue value={total} formatValue={(n) => n.toFixed(2)} />
        </SimpleBox>
        <SimpleBox title="NUM. DONATIONS" color="info">
          --
          {/* <AnimatedValue
            value={donations.length}
            formatValue={(n) => n.toFixed(0)}
          /> */}
        </SimpleBox>
      </Boxes>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={<LoadingIndicator size={32} centered key={0} />}
      >
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
              id={item.id}
              onReview={() => handleReview(item.id)}
              canReview={!!user}
            />
          ))}
        </DonationsList>
      </InfiniteScroll>
    </div>
  );
};

export default Home;
