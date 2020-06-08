import React, { useState, useCallback, useRef } from 'react';
import { useTransition } from 'react-spring';
import { debounce, startCase } from 'lodash';

import Input from 'components/Input';

import { Containers, OptionsContainer, Option } from './styles';

interface AutocompleteProps {
  onSearch(inputValue: string): Promise<any[]>;
  onChange(option: any): void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ onSearch, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<any[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const transitions = useTransition(isOpen, null, {
    from: { transform: 'translate3d(0,-10px,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(0,-10px,0)', opacity: 0 },
  });

  const handleSearch = useCallback(
    debounce(async (inputValue: string) => {
      const result = await onSearch(startCase(inputValue));
      setIsLoading(false);
      setOptions(result);
    }, 1000),
    [onSearch],
  );

  return (
    <Containers>
      <Input
        name="search"
        onChange={(e) => {
          if (e.target.value) {
            if (!isLoading) setIsLoading(true);
            return handleSearch(e.target.value);
          }
          return setOptions([]);
        }}
        autoComplete="off"
        placeholder="Search..."
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        innerRef={inputRef}
      />
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <OptionsContainer key={key} style={props}>
              {options.map((option) => {
                return (
                  <Option
                    key={option.id}
                    onClick={() => {
                      if (inputRef.current)
                        inputRef.current.value = option.name;
                      onChange(option);
                    }}
                  >
                    {option.name}
                  </Option>
                );
              })}
              {options.length === 0 && !isLoading && <p>No results...</p>}
              {isLoading && <p>Loading...</p>}
            </OptionsContainer>
          ),
      )}
    </Containers>
  );
};

export default Autocomplete;
