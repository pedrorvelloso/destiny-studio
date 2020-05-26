import { createSlice } from '@reduxjs/toolkit';
import Donation from 'models/Donation';

const INITIAL_STATE: Donation[] = [];

const addDonation = (
  state = INITIAL_STATE,
  action: { payload: { donation: Donation } },
): Donation[] => [action.payload.donation, ...state];

const reviewDonation = (
  state = INITIAL_STATE,
  action: { payload: { reviewedDonation: Donation } },
): Donation[] =>
  state.map((donation) =>
    donation.id === action.payload.reviewedDonation.id
      ? action.payload.reviewedDonation
      : donation,
  );

const initDonationList = (
  _ = INITIAL_STATE,
  action: { payload: { donations: Donation[] } },
): Donation[] => action.payload.donations;

export const { reducer, actions } = createSlice({
  name: 'donations',
  initialState: INITIAL_STATE,
  reducers: {
    addDonation,
    initDonationList,
    reviewDonation,
  },
});
