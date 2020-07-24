import {
  ADD_REQUEST,
  REQUEST_ERROR,
  GET_REQUESTS,
  DELETE_REQUEST,
} from '../actions/types';

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
    case GET_REQUESTS:
      return {
        ...state,
        requests: payload,
        loading: false,
      };
    case DELETE_REQUEST:
      return {
        ...state,
        requests: state.requests.filter((request) => request._id !== payload),
      };
    default:
      return state;
  }
}
