import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import ConfirmationModal from '../ConfirmationModal';
import { deleteEducation } from '../../actions/profile';

const EducationItem = ({ user, profile, education, deleteEducation }) => {
  const [modalShowing, setModalShowing] = useState(false);

  const closeModalHandler = () => {
    setModalShowing(false);
  };

  const actions = (
    <Fragment>
      <button
        onClick={() => deleteEducation(education._id)}
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
        <h3>{`${education.school}`}</h3>
        {user._id === profile.user && (
          <button
            onClick={() => setModalShowing(true)}
            className="ui right floated icon small button"
          >
            <i className="ui icon trash"></i>
          </button>
        )}
        <p>
          <Moment format="DD/MM/YYYY">{education.startDate}</Moment> -{' '}
          {education.current ? (
            ' Current'
          ) : (
            <Moment format="DD/MM/YYYY">{education.endDate}</Moment>
          )}
        </p>
        <p>
          <strong>Degree: </strong>
          {`${education.degree}`}
        </p>
        <p>
          <strong>Field of Study: </strong>
          {`${education.fieldOfStudy}`}
        </p>
        {education.description && (
          <p>
            <strong>Description: </strong>
            {`${education.description}`}
          </p>
        )}
      </div>
      {modalShowing && (
        <ConfirmationModal
          onDismiss={closeModalHandler}
          title="Delete Education"
          content="Are you sure you want to delete this item?"
          actions={actions}
        />
      )}
    </div>
  );
};

EducationItem.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(EducationItem);
