import Event from 'models/Event';
import Donation from 'models/Donation';

interface DashboardState {
  activeEvent?: Event;
  loadingActiveEvent: boolean;
  total: number;
  donations: Donation[];
}

export const initialState: DashboardState = {
  loadingActiveEvent: true,
  total: 0,
  donations: [],
};

type DashboardAction =
  | { type: 'loading:activeEvent'; status: boolean }
  | { type: 'activeEvent'; event: Event }
  | { type: 'donations'; donations: Donation[] }
  | { type: 'total'; total: number }
  | { type: 'reviewDonation'; donation: Donation }
  | { type: 'addDonation'; donation: Donation };

export const reducer = (
  state: DashboardState,
  action: DashboardAction,
): DashboardState => {
  switch (action.type) {
    case 'loading:activeEvent':
      return { ...state, loadingActiveEvent: action.status };
    case 'activeEvent':
      return { ...state, activeEvent: action.event, loadingActiveEvent: false };
    case 'donations':
      return { ...state, donations: action.donations };
    case 'total':
      return { ...state, total: action.total };
    case 'reviewDonation':
      return {
        ...state,
        donations: state.donations.map((donation) =>
          donation.id === action.donation.id ? action.donation : donation,
        ),
      };
    case 'addDonation':
      return { ...state, donations: [action.donation, ...state.donations] };
    default:
      return state;
  }
};
