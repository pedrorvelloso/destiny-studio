import React, { useEffect, useCallback, useReducer } from 'react';
import { useTransition } from 'react-spring';
import InfiniteScroll from 'react-infinite-scroller';

import Donation from 'models/Donation';
import Event from 'models/Event';

import { useSocket } from 'modules/SocketManager';

import destiny from 'services/destiny';
import { useAuth } from 'modules/AuthManager';

import DonationBox from 'components/DonationBox';
import SimpleBox from 'components/SimpleBox';
import AnimatedValue from 'components/AnimatedValue';
import FullScreenLoading from 'components/FullScreenLoading';
import LoadingIndicator from 'components/LoadingIndicator';

import { currency } from 'utils/currency';
import { initialState, reducer } from './state';
import { DonationsList, Boxes, EventInfo } from './styles';

const Home: React.FC = () => {
  const [
    { donations, total, activeEvent, loadingActiveEvent, hasMore, cursor },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { subscribe } = useSocket();
  const { user } = useAuth();

  const handleReview = useCallback(async (donationId) => {
    const { data: donation } = await destiny.patch<Donation>(
      `/donations/${donationId}/review`,
    );
    dispatch({ type: 'reviewDonation', donation });
  }, []);

  const fetchDashboard = useCallback(async () => {
    const { data: event } = await destiny.get<Event>('/events/active');
    dispatch({ type: 'activeEvent', event });

    destiny
      .get<{ total: number }>(`/events/${event.id}/total`)
      .then(({ data }) => {
        dispatch({ type: 'total', total: data.total });
      });

    destiny
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
    const { data } = await destiny.get(`/events/${activeEvent?.id}/donations`, {
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
    const { unsubscribe } = subscribe(
      [
        {
          channel: `total_donations:${activeEvent?.id}`,
          onMessage(data: number) {
            dispatch({ type: 'total', total: data });
          },
        },
        {
          channel: `new_donation:${activeEvent?.id}`,
          onMessage(data: Donation) {
            dispatch({ type: 'addDonation', donation: data });
          },
        },
        {
          channel: `new_reviewed_donation:${activeEvent?.id}`,
          onMessage(data: Donation) {
            dispatch({ type: 'reviewDonation', donation: data });
          },
        },
      ],
      {
        skip: !activeEvent,
      },
    );
    return () => {
      unsubscribe();
    };
  }, [activeEvent, subscribe]);

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
          <AnimatedValue value={total} formatValue={(n) => currency(n)} />
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
              incentive={item.donation_incentive}
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
