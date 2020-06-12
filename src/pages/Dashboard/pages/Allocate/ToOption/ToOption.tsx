import React, { useState, useCallback } from 'react';

import IncentiveOptions from 'models/IncentiveOptions';

import Button from 'components/Button';
import SelectIncentiveButton from 'components/SelectIncentiveButton';
import CreateInput from 'components/CreateInput';

import api from 'services/api';

interface ToOptionProps {
  options: IncentiveOptions[];
  donationAmount: number;
  canCreate: boolean;
  onAllocate(id: number): void;
  incentiveId: number;
}

const ToOption: React.FC<ToOptionProps> = ({
  options,
  donationAmount,
  onAllocate,
  canCreate,
  incentiveId,
}) => {
  const [selectedOption, setSelectedOption] = useState<IncentiveOptions | null>(
    null,
  );
  const [incentiveOptions, setIncentiveOptions] = useState(options);

  const handleCreateOption = useCallback(
    async (id: number, optionValue: string) => {
      const { data } = await api.post(`/incentives/${id}/options`, {
        name: optionValue,
      });
      data.total = 0;

      setIncentiveOptions((prevOptions) => [...prevOptions, data]);
    },
    [],
  );

  return (
    <div>
      {incentiveOptions.map((option) => (
        <SelectIncentiveButton
          key={option.id}
          label={option.name}
          checked={selectedOption?.id === option.id}
          onClick={() => setSelectedOption(option)}
          total={option.total}
          donationAmount={donationAmount}
        />
      ))}
      {canCreate && (
        <CreateInput
          onSubmit={(value) => handleCreateOption(incentiveId, value)}
        />
      )}
      <Button
        disabled={!selectedOption}
        onClick={() => {
          if (selectedOption) onAllocate(selectedOption.id);
        }}
      >
        Allocate
      </Button>
    </div>
  );
};

export default ToOption;
