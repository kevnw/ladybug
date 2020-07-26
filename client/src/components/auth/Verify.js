import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { verifyUser, loadUser } from '../../actions/auth';
import setAuthToken from '../../utils/setAuthToken';

const Verify = ({ auth, verifyUser, loadUser, match }) => {
  useEffect(() => {
    verifyUser(match.params.token);
  }, []);

  useEffect(() => {
    loadUser();
  }, []);

  if (!auth.loading && auth.user && auth.user.verified) {
    return <Redirect to="/home" />;
  }
  return auth.loading ? (
    <div className="ui centered active loader"></div>
  ) : auth.error ? (
    <Fragment>
      <div className="container-body">
        <h1 className="large">404 Bad Request</h1>
      </div>
    </Fragment>
  ) : (
    <div></div>
  );
};

Verify.propTypes = {
  auth: PropTypes.object.isRequired,
  verifyUser: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { verifyUser, loadUser })(Verify);
