import IncentiveOptions from './IncentiveOptions';

export default interface Incentive {
  id: number;
  name: string;
  description: string;
  enable_option: boolean;
  type: 'goal' | 'option';
  goal: number | null;
  options: IncentiveOptions[];
}
