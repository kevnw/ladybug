import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmationModal from '../ConfirmationModal';
import { deleteRequest } from '../../actions/request';
import ApproveRequestFormModal from './ApproveRequestFormModal';

const RequestItem = ({ request, deleteRequest }) => {
  const [formShowing, setFormShowing] = useState(false);
  const [modalShowing, setModalShowing] = useState(false);
  const closeModalHandler = () => {
    setModalShowing(false);
  };
  const actions = (
    <Fragment>
      <button
        onClick={() => deleteRequest(request._id)}
        className="ui button red-button"
      >
        Yes
      </button>
      <button onClick={closeModalHandler} className="ui button">
        Cancel
      </button>
    </Fragment>
  );

  return (
    <Fragment>
      <div className="card">
        <div className="content">
          <div className="header">{request.module}</div>
          <div className="meta">{request.university}</div>
          <div className="description">
            {request.counter.length} users requested this module
          </div>
        </div>
        <div className="extra content">
          <div className="ui two buttons">
            <div
              onClick={() => setFormShowing(true)}
              className="ui basic green button"
            >
              Approve
            </div>
            <div
              onClick={() => setModalShowing(true)}
              className="ui basic red button"
            >
              Decline
            </div>
          </div>
        </div>
      </div>
      {formShowing && (
        <ApproveRequestFormModal
          setFormShowing={setFormShowing}
          request={request}
        />
      )}
      {modalShowing && (
        <ConfirmationModal
          onDismiss={closeModalHandler}
          title="Decline Request"
          content="Are you sure you want to decline this request?"
          actions={actions}
        />
      )}
    </Fragment>
  );
};

RequestItem.propTypes = {
  deleteRequest: PropTypes.func.isRequired,
};

export default connect(null, { deleteRequest })(RequestItem);
