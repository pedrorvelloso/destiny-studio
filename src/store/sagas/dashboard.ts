/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { call, takeLatest, put } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';

import Event from 'models/Event';
import Donation from 'models/Donation';

import api from 'services/api';

import { actions as eventsActions } from '../ducks/events';
import { actions as donationsActions } from '../ducks/donations';

export const actions = {
  getDashboard: createAction('saga/events/getDashboard'),
};

const getActiveEvent = async (): Promise<Event> => {
  const { data } = await api.get<Event>('/events/active');

  return data;
};

const getDonations = async (): Promise<Donation[]> => {
  const { data } = await api.get<Donation[]>('/donations');

  return data;
};

const getActiveEventTotal = async (eventId: number): Promise<number> => {
  const { data } = await api.get<{ total: number }>(`/events/${eventId}/total`);
  return data.total;
};

function* getDashboard() {
  const event = yield call(getActiveEvent);
  yield put(eventsActions.setActiveEvent({ event }));
  const donations = yield call(getDonations);
  yield put(donationsActions.initDonationList({ donations }));
  const total = yield call(getActiveEventTotal, event.id);
  yield put(eventsActions.setTotalActiveEvent({ total }));
}

function* dashboardSaga() {
  yield takeLatest(actions.getDashboard.toString(), getDashboard);
}

export default dashboardSaga;
