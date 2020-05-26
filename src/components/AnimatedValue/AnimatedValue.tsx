import React from 'react';
import { useSpring, animated } from 'react-spring';

interface AnimatedValueProps {
  value: number;
  formatValue?: (n: number) => string | number;
}

const AnimatedValue: React.FC<AnimatedValueProps> = ({
  value,
  formatValue,
}) => {
  const { number } = useSpring({
    number: value,
    from: { number: 0 },
  });

  if (formatValue)
    return <animated.span>{number.interpolate(formatValue)}</animated.span>;

  return <animated.span>{number}</animated.span>;
};

export default AnimatedValue;
