import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import mailImg from '../../img/verifymail.png';

const VerifyMail = ({ auth }) => {
  return (
    <Fragment>
      <div className="red-background">
        <div className="center-page">
          <div className="ui center-text white-text">
            <img src={mailImg} className="ui large image centered" />
            {!auth.loading && auth.isAuthenticated && auth.user && (
              <Fragment>
                <h3>
                  Thank you! An email has been sent to {`${auth.user.email}`}
                </h3>
                <h5>Please check your inbox to verify your email address</h5>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

VerifyMail.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(VerifyMail);
