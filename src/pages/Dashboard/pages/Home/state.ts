import Event from 'models/Event';
import Donation from 'models/Donation';

interface DashboardState {
  activeEvent?: Event;
  hasMore: boolean;
  cursor?: number;
  loadingActiveEvent: boolean;
  total: number;
  donations: Donation[];
}

export const initialState: DashboardState = {
  loadingActiveEvent: true,
  total: 0,
  donations: [],
  hasMore: false,
};

type DashboardAction =
  | { type: 'loading:activeEvent'; status: boolean }
  | { type: 'activeEvent'; event: Event }
  | {
      type: 'donations';
      donations: Donation[];
      hasMore: boolean;
      cursor: number;
    }
  | { type: 'total'; total: number }
  | { type: 'reviewDonation'; donation: Donation }
  | { type: 'addDonation'; donation: Donation }
  | {
      type: 'pagination';
      donations: Donation[];
      hasMore: boolean;
      cursor: number;
    };

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
      return {
        ...state,
        donations: action.donations,
        hasMore: action.hasMore,
        cursor: action.cursor,
      };
    case 'pagination':
      return {
        ...state,
        donations: [...state.donations, ...action.donations],
        hasMore: action.hasMore,
        cursor: action.cursor,
      };
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
