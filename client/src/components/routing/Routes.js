import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../routing/PrivateRoute';
import AdminRoute from '../routing/AdminRoute';
import VerifyMail from '../auth/VerifyMail';
import Verify from '../auth/Verify';
import ForgotPassword from '../auth/ForgotPassword';
import ResetPassword from '../auth/ResetPassword';
import PasswordUpdated from '../auth/PasswordUpdated';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Home from '../home/Home';
import Requests from '../requests/Requests';
import PostsCategory from '../posts/PostsCategory';
import Post from '../post/Post';
import SavedPosts from '../posts/SavedPosts';
import Categories from '../categories/Categories';
import University from '../university/University';
import Profile from '../profile/Profile';
import Notifications from '../notifications/Notifications';
import NotFound from '../layout/NotFound';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/verification" component={VerifyMail} />
      <Route exact path="/verify/:token" component={Verify} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/password-updated" component={PasswordUpdated} />
      <Route exact path="/reset-password/:token" component={ResetPassword} />
      {/* Change to private route */}
      <PrivateRoute exact path="/home" component={Home} />
      <PrivateRoute exact path="/explore" component={Categories} />
      <PrivateRoute exact path="/saved-posts" component={SavedPosts} />
      <PrivateRoute exact path="/notifications" component={Notifications} />
      <AdminRoute exact path="/requests" component={Requests} />
      <PrivateRoute exact path="/profile/:id" component={Profile} />
      <PrivateRoute exact path="/:uni" component={University} />
      <PrivateRoute exact path="/:uni/:module" component={PostsCategory} />
      <PrivateRoute exact path="/:uni/:module/:id" component={Post} />
      {/* <Route exact path="/categories" component={Categories} /> */}
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
