import styled from 'styled-components';
import { linearGradient, darken } from 'polished';
import { Styles } from 'polished/lib/types/style';

export interface ContainerProps {
  color: 'primary' | 'info';
}

const colorVariations = {
  primary: '#A751B7',
  info: '#3172b7',
};

export const Container = styled.div<ContainerProps>`
  ${({ color }): Styles =>
    linearGradient({
      colorStops: [
        `${darken(0.2, colorVariations[color])} 0%`,
        `${colorVariations[color]} 100%`,
      ],
      toDirection: 'to right',
      fallback: colorVariations[color],
    })}

  padding: 15px;

  margin-bottom: 16px;
  border-radius: 5px;

  font-family: 'Roboto Mono', monospace;
`;
