import React, { useCallback } from 'react';

import api from 'services/api';

import Autocomplete from 'components/Autocomplete';

import { Container } from './styles';

const Allocate: React.FC = () => {
  const handleSearch = useCallback(async (inputValue: string) => {
    const { data } = await api.get(`/games/search?input=${inputValue}`);

    return data;
  }, []);

  return (
    <Container>
      <Autocomplete
        onSearch={handleSearch}
        onChange={(data) => console.log(data)}
      />
    </Container>
  );
};

export default Allocate;
