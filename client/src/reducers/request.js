import { ADD_REQUEST, REQUEST_ERROR } from '../actions/types';

const initialState = {
  request: null,
  requests: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_REQUEST:
      return {
        ...state,
        request: payload,
        loading: false,
      };
    case REQUEST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    default:
      return state;
  }
}
