import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import { addEducation } from '../../actions/profile';

const EducationFormModal = ({ setShowingEducation, addEducation }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  });

  const {
    school,
    degree,
    fieldOfStudy,
    startDate,
    endDate,
    current,
    description,
  } = formData;

  const [endDateDisabled, toggleDisabled] = useState(false);

  const closeModalHandler = () => {
    setShowingEducation(false);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const newEducation = { education: formData };
    addEducation(newEducation);
    closeModalHandler();
    // console.log(newEducation);
  };

  const actions = (
    <Fragment>
      <button type="submit" form="myform" className="ui button red-button">
        Add
      </button>
      <button onClick={closeModalHandler} className="ui button">
        Cancel
      </button>
    </Fragment>
  );

  const content = (
    <form id="myform" className="ui form" onSubmit={(e) => onSubmit(e)}>
      <div className="field">
        <label className="header">School or Bootcamp</label>
        <div className="ui input">
          <input
            type="text"
            placeholder="School or Bootcamp"
            name="school"
            required
            value={school}
            onChange={(e) => onChange(e)}
          />
        </div>
      </div>
      <div className="field">
        <label className="header">Degree or Certificate</label>
        <div className="ui input">
          <input
            type="text"
            placeholder="Degree or Certificate"
            name="degree"
            required
            value={degree}
            onChange={(e) => onChange(e)}
          />
        </div>
      </div>
      <div className="field">
        <label className="header">Field of Study</label>
        <div className="ui input">
          <input
            type="text"
            placeholder="Field of Study"
            name="fieldOfStudy"
            value={fieldOfStudy}
            onChange={(e) => onChange(e)}
          />
        </div>
      </div>
      <div className="field">
        <label className="header">Start Date</label>
        <div className="ui input">
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={(e) => onChange(e)}
          />
        </div>
      </div>
      <div className="field">
        {/* <div className="ui input"> */}
        <input
          type="checkbox"
          name="current"
          checked={current}
          value={current}
          onChange={(e) => {
            setFormData({ ...formData, current: !current });
            toggleDisabled(!endDateDisabled);
          }}
        />
        {' Current School'}
        {/* </div> */}
      </div>
      <div className="field">
        <label className="header">End Date</label>
        <div className="ui input">
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={(e) => onChange(e)}
            disabled={endDateDisabled ? 'disabled' : ''}
          />
        </div>
      </div>
      <div className="field">
        <label className="header">Description</label>
        <div className="ui input">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Description"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
      </div>
    </form>
  );

  return (
    <Modal
      onDismiss={closeModalHandler}
      title="Add Education"
      content={content}
      actions={actions}
    />
  );
};

EducationFormModal.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(EducationFormModal);
