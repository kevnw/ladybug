import axios from 'axios';
import { setAlert } from './alert';
import { ADD_REQUEST, REQUEST_ERROR } from './types';

export const addRequest = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/requests/add', formData, config);

    dispatch({
      type: ADD_REQUEST,
      payload: res.data,
    });
    dispatch(setAlert('Request successfully sent to Ladybug Admin', 'success'));
  } catch (err) {
    console.log(err);
    const errors = err.response.data.errors;

    if (errors) {
      dispatch(setAlert(errors.msg, 'error'));
    }

    dispatch({
      type: REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
