import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import module from './module';
import university from './university';
import post from './post';
import profile from './profile';
import request from './request';
import notification from './notification';

export default combineReducers({
  alert,
  auth,
  module,
  university,
  post,
  profile,
  request,
  notification,
});
