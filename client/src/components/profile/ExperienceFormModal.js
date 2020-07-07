import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import { addExperience } from '../../actions/profile';

const ExperienceFormModal = ({ setShowingExperience, addExperience }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  });

  const { company, title, startDate, endDate, current, description } = formData;

  const [endDateDisabled, toggleDisabled] = useState(false);

  const closeModalHandler = () => {
    setShowingExperience(false);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const newExperience = { experience: formData };
    addExperience(newExperience);
    closeModalHandler();
    // console.log(newExperience);
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
        <label className="header">Position or Job Title</label>
        <div className="ui input">
          <input
            type="text"
            placeholder="Position or Job Title"
            name="title"
            required
            value={title}
            onChange={(e) => onChange(e)}
          />
        </div>
      </div>
      <div className="field">
        <label className="header">Company</label>
        <div className="ui input">
          <input
            type="text"
            placeholder="Company"
            name="company"
            required
            value={company}
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
        <input
          type="checkbox"
          className="ui checkbox"
          name="current"
          checked={current}
          value={current}
          onChange={(e) => {
            setFormData({ ...formData, current: !current });
            toggleDisabled(!endDateDisabled);
          }}
        />
        {' Current Job'}
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
      title="Add Experience"
      content={content}
      actions={actions}
    />
  );
};

ExperienceFormModal.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(ExperienceFormModal);
