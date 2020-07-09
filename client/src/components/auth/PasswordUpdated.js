import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PasswordUpdated = (props) => {
  return (
    <Fragment>
      <div className="red-background">
        <div className="center-page" style={{ textAlign: 'center' }}>
          <i className="ui icon lock massive" style={{ color: 'white' }} />
          <h1 className="large white-text">Password Updated!</h1>
          <div className="ui center-text white-text">
            <div className="ui  message">
              <Link to="/login">Back to Login</Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PasswordUpdated;
