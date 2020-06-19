import React, { useCallback, useState, useEffect } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { FaTimes, FaAngleRight } from 'react-icons/fa';
import { useTransition, animated } from 'react-spring';

import destiny from 'services/destiny';

import Game from 'models/Game';
import Incentive from 'models/Incentive';

import Autocomplete from 'components/Autocomplete';
import FullScreenLoading from 'components/FullScreenLoading';

import { Container, IncentiveContainer, IncentiveHeader } from './styles';

import ToOption from './ToOption';
import ToGoal from './ToGoal';

const Allocate: React.FC = () => {
  const location = useLocation<{ amount: number }>();
  const history = useHistory();
  const { id } = useParams();

  const [donation, setDonation] = useState<{
    id: number;
    amount: number;
  } | null>(() => {
    if (location.state) return { id, amount: location.state.amount };

    return null;
  });
  const [loading, setLoading] = useState(true);
  const [incentives, setIncentives] = useState<Incentive[]>([]);
  const [selectedIncentive, setSelectedIncentive] = useState<Incentive | null>(
    null,
  );

  const transitions = useTransition(selectedIncentive, null, {
    from: { opacity: 0, position: 'absolute', width: '100%' },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 200,
    },
  });

  const handleSelectedGameIncentives = useCallback(async (game: Game) => {
    const { data } = await destiny.get(`/incentives/game/${game.id}`);

    setIncentives(data);
  }, []);

  const handleSearch = useCallback(async (inputValue: string) => {
    const { data } = await destiny.get(`/games/search?input=${inputValue}`);

    return data;
  }, []);

  const fetchPageInfo = useCallback(async () => {
    const { data } = await destiny.get(`/donations/${id}`);

    setDonation({ id: data.id, amount: data.amount });
    setLoading(false);
  }, [id]);

  const handleAllocate = useCallback(
    async (incentiveId: number) => {
      await destiny.patch(`/donations/${id}/allocate`, {
        incentive_option_id: incentiveId,
      });

      history.push('/');
    },
    [history, id],
  );

  useEffect(() => {
    if (!donation) fetchPageInfo();
    else setLoading(false);
  }, [donation, fetchPageInfo]);

  if (loading && !donation) return <FullScreenLoading />;

  return (
    <Container>
      {transitions.map(({ item, key, props }) =>
        item ? (
          <animated.div style={props} key={key}>
            <h6>Allocate to</h6>
            <h1>
              {item.name} <FaTimes onClick={() => setSelectedIncentive(null)} />
            </h1>

            {item.type === 'option' && (
              <ToOption
                donationAmount={donation?.amount || 0}
                options={item.options}
                canCreate={item.enable_option}
                onAllocate={handleAllocate}
                incentiveId={item.id}
              />
            )}
            {item.type === 'goal' && (
              <ToGoal
                donationAmount={donation?.amount || 0}
                option={item.options[0]}
                onAllocate={handleAllocate}
                goal={item.goal as number}
              />
            )}
          </animated.div>
        ) : (
          <animated.div style={props} key={key}>
            <h1 className="title">Pick an incentive</h1>
            <Autocomplete
              onSearch={handleSearch}
              onChange={(data: Game) => handleSelectedGameIncentives(data)}
              placeholder="Search game..."
            />

            {incentives.map((incentive) => (
              <IncentiveContainer
                key={incentive.id}
                onClick={() => setSelectedIncentive(incentive)}
              >
                <IncentiveHeader>
                  <div>
                    <h3>{incentive.name}</h3>
                    <p>{incentive.description}</p>
                  </div>
                  <FaAngleRight size={32} />
                </IncentiveHeader>
              </IncentiveContainer>
            ))}
          </animated.div>
        ),
      )}
    </Container>
  );
};

export default Allocate;
