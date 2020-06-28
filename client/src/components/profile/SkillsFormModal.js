import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import { updateProfile } from '../../actions/profile';

const SkillsFormModal = ({ setShowingSkills, profile, updateProfile }) => {
  const [formData, setFormData] = useState({
    skills: `${profile.skills.join(',')}`,
  });

  const { skills } = formData;

  const closeModalHandler = () => {
    setShowingSkills(false);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const newProfile = { profile: formData };
    updateProfile(newProfile);
    closeModalHandler();
    // console.log(newProfile);
  };

  const actions = (
    <Fragment>
      <button type="submit" form="myform" className="ui button red-button">
        Save
      </button>
      <button onClick={closeModalHandler} className="ui button">
        Cancel
      </button>
    </Fragment>
  );

  const content = (
    <form id="myform" className="ui form" onSubmit={(e) => onSubmit(e)}>
      <div className="field">
        <label className="header">Skills</label>
        <div className="ui input">
          <input
            type="text"
            name="skills"
            value={skills}
            onChange={(e) => onChange(e)}
            placeholder="Tell us more about your skills (use comma to separate values, e.g. HTML,CSS,AdobeXD,PHP)"
          />
        </div>
      </div>
    </form>
  );

  return (
    <Modal
      onDismiss={closeModalHandler}
      title="Edit your skill set"
      content={content}
      actions={actions}
    />
  );
};

SkillsFormModal.propTypes = {
  updateProfile: PropTypes.func.isRequired,
};

export default connect(null, { updateProfile })(SkillsFormModal);
