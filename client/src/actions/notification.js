import axios from 'axios';
// import { setAlert } from './alert';
import {
  GET_NOTIFICATIONS,
  MARK_NOTIFICATION_AS_READ,
  DELETE_NOTIFICATION,
  NOTIFICATION_ERROR,
} from './types';

export const getNotifications = () => async (dispatch) => {
  try {
    const res = await axios.get('/notifications');
    dispatch({
      type: GET_NOTIFICATIONS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NOTIFICATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const markAsRead = (id) => async (dispatch) => {
  try {
    const res = await axios.post(`/notifications/mark-read/${id}`);
    dispatch({
      type: MARK_NOTIFICATION_AS_READ,
      payload: { id: id, data: res.data },
    });
  } catch (err) {
    dispatch({
      type: NOTIFICATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteNotification = (id) => async (dispatch) => {
  try {
    await axios.delete(`/notifications/delete/${id}`);
    dispatch({
      type: DELETE_NOTIFICATION,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: NOTIFICATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
