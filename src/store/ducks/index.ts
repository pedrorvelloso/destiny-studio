import { combineReducers } from 'redux';

import { reducer as donations } from './donations';
import { reducer as events } from './events';

export default combineReducers({ donations, events });
