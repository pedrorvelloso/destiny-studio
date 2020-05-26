import Donation from 'models/Donation';

import { EventsDuck } from './ducks/events';

export default interface RootState {
  donations: Donation[];
  events: EventsDuck;
}
