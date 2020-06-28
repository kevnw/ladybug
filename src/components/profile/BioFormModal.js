import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import { updateProfile } from '../../actions/profile';

const BioFormModal = ({ setShowingBio, profile, updateProfile }) => {
  const [formData, setFormData] = useState({
    bio: profile.bio ? profile.bio : '',
    skills: `${profile.skills.join(',')}`,
  });

  const { bio } = formData;

  const closeModalHandler = () => {
    setShowingBio(false);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    const newProfile = { profile: formData };
    updateProfile(newProfile);
    closeModalHandler();
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
        <label className="header">Bio</label>
        <div className="ui input">
          <input
            type="text"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
            placeholder="Tell us a little about yourself"
          />
        </div>
      </div>
    </form>
  );

  return (
    <Modal
      onDismiss={closeModalHandler}
      title="Edit your bio"
      content={content}
      actions={actions}
    />
  );
};

BioFormModal.propTypes = {
  updateProfile: PropTypes.func.isRequired,
};

export default connect(null, { updateProfile })(BioFormModal);
