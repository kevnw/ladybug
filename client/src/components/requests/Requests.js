import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRequests } from '../../actions/request';
import RequestItem from './RequestItem';
import Alert from '../layout/Alert';

const Requests = ({ getRequests, request: { requests, loading } }) => {
  useEffect(() => {
    getRequests();
  }, []);

  return loading ? (
    <div className="ui active centered loader"></div>
  ) : (
    <div>
      <div className="container-body">
        <Alert />
        <div
          className="ui segment"
          style={{ border: 'none', boxShadow: 'none' }}
        >
          <h1 className="red-text">Module Requests</h1>
          <div className="ui three doubling cards">
            {requests.length > 0 &&
              requests.map((request) => (
                <RequestItem request={request} key={request._id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Requests.propTypes = {
  getRequests: PropTypes.func.isRequired,
  request: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  request: state.request,
});

export default connect(mapStateToProps, { getRequests })(Requests);
