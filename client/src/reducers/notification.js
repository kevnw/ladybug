import {
  GET_NOTIFICATIONS,
  MARK_NOTIFICATION_AS_READ,
  DELETE_NOTIFICATION,
  NOTIFICATION_ERROR,
} from '../actions/types';

const initialState = {
  notifications: [],
  notification: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: payload,
        loading: false,
      };
    case MARK_NOTIFICATION_AS_READ:
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification._id === payload.id ? payload.data : notification
        ),
        loading: false,
      };
    case DELETE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification._id !== payload
        ),
        loading: false,
      };
    case NOTIFICATION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
