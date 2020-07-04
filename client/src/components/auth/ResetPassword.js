import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';

import { setAlert } from '../../actions/alert';

const ResetPassword = ({ auth, setAlert }) => {
  const [formData, setFormData] = useState({
    password: '',
    password2: '',
  });

  const { password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'error');
    } else {
      //   register({ name, email, password });
    }
  };

  if (
    !auth.loading &&
    auth.isAuthenticated &&
    auth.user &&
    auth.user.verified
  ) {
    return <Redirect to="/home" />;
  }

  if (
    !auth.loading &&
    auth.isAuthenticated &&
    auth.user &&
    !auth.user.verified
  ) {
    // console.log(auth);
    return <Redirect to="/verification" />;
  }

  return (
    <Fragment>
      <div className="red-background">
        <div className="ui container-body">
          <Alert />
          <div className="form-center">
            <h1 className="large white-text center-text">Reset Password</h1>
            <form className="ui form" onSubmit={onSubmit}>
              <div className="ui raised segment">
                <h3 className="ui dividing header"> Reset your password</h3>
                <div className="field">
                  <label className="">New Password</label>
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input
                      type="password"
                      name="password"
                      placeholder="New password"
                      value={password}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="">Confirm New Password</label>
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input
                      type="password"
                      name="password2"
                      placeholder="Confirm new password"
                      value={password2}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="ui vertical animated fluid large submit button red-button"
                >
                  <div className="visible content">Reset Password</div>
                  <div className="hidden content">
                    <i className="sign-in icon"></i>
                  </div>
                </button>
              </div>
              <div className="ui bottom attached message">
                <Link to="/login">Back to Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ResetPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(ResetPassword);
