import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import VerifyMail from './components/auth/VerifyMail';
import Verify from './components/auth/Verify';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import PasswordUpdated from './components/auth/PasswordUpdated';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/home/Home';
import Requests from './components/requests/Requests';
import PostsCategory from './components/posts/PostsCategory';
import Post from './components/post/Post';
import SavedPosts from './components/posts/SavedPosts';
import Categories from './components/categories/Categories';
import University from './components/university/University';
import Profile from './components/profile/Profile';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/verification" component={VerifyMail} />
            <Route exact path="/verify/:token" component={Verify} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/password-updated" component={PasswordUpdated} />
            <Route
              exact
              path="/reset-password/:token"
              component={ResetPassword}
            />
            {/* Change to private route */}
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute exact path="/explore" component={Categories} />
            <PrivateRoute exact path="/saved-posts" component={SavedPosts} />
            <AdminRoute exact path="/requests" component={Requests} />
            <PrivateRoute exact path="/profile/:id" component={Profile} />
            <PrivateRoute exact path="/:uni" component={University} />
            <PrivateRoute
              exact
              path="/:uni/:module"
              component={PostsCategory}
            />
            <PrivateRoute exact path="/:uni/:module/:id" component={Post} />
            {/* <Route exact path="/categories" component={Categories} /> */}
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
