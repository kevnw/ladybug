import axios from 'axios';
// import { setAlert } from './alert';
import {
  GET_UNIVERSITIES,
  UNIVERSITIES_ERROR,
  GET_UNIVERSITY,
  UNIVERSITY_ERROR,
} from './types';

// Get all universities
export const getUniversities = () => async (dispatch) => {
  try {
    const res = await axios.get('/categories');
    dispatch({
      type: GET_UNIVERSITIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: UNIVERSITIES_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get university from acronym
export const getUniversity = (acronym) => async (dispatch) => {
  try {
    const res = await axios.get(`/universities/${acronym}`);
    dispatch({
      type: GET_UNIVERSITY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: UNIVERSITY_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};
