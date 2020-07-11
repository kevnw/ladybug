import {
  GET_UNIVERSITIES,
  UNIVERSITIES_ERROR,
  GET_UNIVERSITY,
  UNIVERSITY_ERROR,
} from '../actions/types';

const initialState = {
  universities: [],
  university: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_UNIVERSITIES:
      return {
        ...state,
        universities: payload,
        loading: false,
      };
    case GET_UNIVERSITY:
      return {
        ...state,
        university: payload,
        loading: false,
      };
    case UNIVERSITIES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UNIVERSITY_ERROR:
      return {
        ...state,
        error: payload,
        university: null,
        loading: false,
      };
    default:
      return state;
  }
}
