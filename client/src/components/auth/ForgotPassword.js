import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';
import { forgotPassword } from '../../actions/auth';

const ForgotPassword = ({ auth, forgotPassword }) => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    forgotPassword(email);
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
    return <Redirect to="/verification" />;
  }

  return (
    <Fragment>
      <div className="red-background">
        <div className="ui container-body">
          <Alert />
          <div className="form-center">
            <h1 className="large white-text center-text">Forgot Password?</h1>
            <form className="ui form" onSubmit={onSubmit}>
              <div className="ui raised segment">
                <h3 className="ui dividing header">
                  {' '}
                  Don't worry! Enter your email address and we will send you a
                  password reset link
                </h3>
                <div className="field">
                  <label className="header">Email</label>
                  <div className="ui left icon input">
                    <i className="envelope icon"></i>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="ui vertical animated fluid large submit button red-button"
                >
                  <div className="visible content">Send Reset Link</div>
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

ForgotPassword.propTypes = {
  auth: PropTypes.object.isRequired,
  forgotPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);
