import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_CONTRIBUTIONS,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
  contributions: null,
  contributionsId: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    case GET_CONTRIBUTIONS:
      return {
        ...state,
        contributions: payload.data,
        contributionsId: payload.id,
        loading: false,
      };
    default:
      return state;
  }
}
