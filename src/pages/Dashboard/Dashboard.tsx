import React, { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';

import api from '../../services/api';

import DonationBox from '../../components/DonationBox';
import SimpleBox from '../../components/SimpleBox';
import AnimatedValue from '../../components/AnimatedValue';

import { Container, DonationsList, Boxes, EventInfo } from './styles';

interface Donation {
  id: number;
  amount: number;
  from: string;
  message: string;
  created_at: string;
  reviewer?: {
    name: string;
  };
}

interface Event {
  id: string;
  name: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState<Event>({} as Event);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [total, setTotal] = useState<number>(0);

  const fetchDashboardData = useCallback(async () => {
    const { data: event } = await api.get<Event>('/events/active');
    setActiveEvent(event);
    api.get<Donation[]>('/donations').then(({ data }) => {
      setDonations(data);
    });
    api.get<{ total: number }>(`/events/${event.id}/total`).then(({ data }) => {
      setTotal(data.total);
    });
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    const socket = io('http://localhost:3333', { transports: ['websocket'] });

    socket.on(`total_donations:${activeEvent.id}`, (data: number) => {
      setTotal(data);
    });
  }, [activeEvent.id]);

  return (
    <Container>
      <EventInfo>
        <h1>{activeEvent.name}</h1>
        <span>{activeEvent.description}</span>
      </EventInfo>
      <Boxes>
        <SimpleBox title="TOTAL" color="primary">
          R$ <AnimatedValue value={total} formatValue={(n) => n.toFixed(2)} />
        </SimpleBox>
        <SimpleBox title="NUM. DONATIONS" color="info">
          {donations.length}
        </SimpleBox>
      </Boxes>
      <DonationsList>
        {donations.map((donation) => (
          <DonationBox
            key={donation.id}
            from={donation.from}
            message={donation.message}
            amount={donation.amount}
            reviewer={donation.reviewer?.name}
            createdAt={donation.created_at}
          />
        ))}
      </DonationsList>
    </Container>
  );
};

export default Dashboard;
