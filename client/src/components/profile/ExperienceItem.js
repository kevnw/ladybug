import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import ConfirmationModal from '../ConfirmationModal';
import { deleteExperience } from '../../actions/profile';

const ExperienceItem = ({ user, profile, experience, deleteExperience }) => {
  const [modalShowing, setModalShowing] = useState(false);
  const closeModalHandler = () => {
    setModalShowing(false);
  };
  const actions = (
    <Fragment>
      <button
        onClick={() => deleteExperience(experience._id)}
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
    <div>
      <div className="ui segment" style={{ border: 'none', boxShadow: 'none' }}>
        <h3>{`${experience.company}`}</h3>
        {user._id === profile.user && (
          <button
            onClick={() => setModalShowing(true)}
            className="ui right floated icon small button"
          >
            <i className="ui icon trash"></i>
          </button>
        )}
        <p>
          <Moment format="DD/MM/YYYY">{experience.startDate}</Moment> -{' '}
          {experience.current ? (
            ' Current'
          ) : (
            <Moment format="DD/MM/YYYY">{experience.endDate}</Moment>
          )}
        </p>
        <p>
          <strong>Position: </strong>
          {`${experience.title}`}
        </p>
        {experience.description && (
          <p>
            <strong>Description: </strong>
            {`${experience.description}`}
          </p>
        )}
      </div>
      {modalShowing && (
        <ConfirmationModal
          onDismiss={closeModalHandler}
          title="Delete Experience"
          content="Are you sure you want to delete this item?"
          actions={actions}
        />
      )}
    </div>
  );
};

ExperienceItem.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(ExperienceItem);
