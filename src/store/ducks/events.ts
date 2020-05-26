import { createSlice } from '@reduxjs/toolkit';
import Event from 'models/Event';

export interface EventsDuck {
  activeEvent?: Event;
  total: number;
}

const INITIAL_STATE: EventsDuck = { total: 0 } as EventsDuck;

const setActiveEvent = (
  state = INITIAL_STATE,
  action: { payload: { event: Event } },
): EventsDuck => ({ ...state, activeEvent: action.payload.event });

const setTotalActiveEvent = (
  state = INITIAL_STATE,
  action: { payload: { total: number } },
): EventsDuck => ({ ...state, total: action.payload.total });

export const { reducer, actions } = createSlice({
  name: 'events',
  initialState: INITIAL_STATE,
  reducers: {
    setActiveEvent,
    setTotalActiveEvent,
  },
});
