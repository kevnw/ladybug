import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import { updateProfile } from '../../actions/profile';

const HeaderFormModal = ({ setShowingHeader, profile, updateProfile }) => {
  const [formData, setFormData] = useState({
    skills: `${profile.skills.join(',')}`,
    status: `${profile.status}`,
    social: profile.social,
  });

  const { status, social } = formData;

  const [socialData, setSocialData] = useState({
    website: social && social.website ? social.website : '',
    twitter: social && social.twitter ? social.twitter : '',
    facebook: social && social.facebook ? social.facebook : '',
    linkedin: social && social.linkedin ? social.linkedin : '',
    youtube: social && social.youtube ? social.youtube : '',
    instagram: social && social.instagram ? social.instagram : '',
  });

  const {
    website,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = socialData;

  const closeModalHandler = () => {
    setShowingHeader(false);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeSocial = (e) =>
    setSocialData({ ...socialData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    formData.social = socialData;
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
        <label className="header">Status</label>
        <div className="ui input">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0">Select your status</option>
            <option value="Student">Student</option>
            <option value="Teaching Assistant">Teaching Assistant</option>
            <option value="Instructor">Instructor</option>
          </select>
        </div>
      </div>
      <h5 className="header">Social Network Links</h5>
      <div className="field">
        <label className="header">
          <i className="ui icon globe"></i>Website
        </label>
        <input
          type="text"
          placeholder="Website URL"
          name="website"
          value={website}
          onChange={(e) => onChangeSocial(e)}
        />
      </div>
      <div className="field">
        <label className="header">
          <i className="ui icon twitter"></i>Twitter
        </label>
        <input
          type="text"
          placeholder="Twitter URL"
          name="twitter"
          value={twitter}
          onChange={(e) => onChangeSocial(e)}
        />
      </div>
      <div className="field">
        <label className="header">
          <i className="ui icon facebook"></i>Facebook
        </label>
        <input
          type="text"
          placeholder="Facebook URL"
          name="facebook"
          value={facebook}
          onChange={(e) => onChangeSocial(e)}
        />
      </div>
      <div className="field">
        <label className="header">
          <i className="ui icon linkedin"></i>Linkedin
        </label>
        <input
          type="text"
          placeholder="Linkedin URL"
          name="linkedin"
          value={linkedin}
          onChange={(e) => onChangeSocial(e)}
        />
      </div>
      <div className="field">
        <label className="header">
          <i className="ui icon youtube"></i>Youtube
        </label>
        <input
          type="text"
          placeholder="Youtube URL"
          name="youtube"
          value={youtube}
          onChange={(e) => onChangeSocial(e)}
        />
      </div>
      <div className="field">
        <label className="header">
          <i className="ui icon instagram"></i>Instagram
        </label>
        <input
          type="text"
          placeholder="Instagram URL"
          name="instagram"
          value={instagram}
          onChange={(e) => onChangeSocial(e)}
        />
      </div>
    </form>
  );

  return (
    <Modal
      onDismiss={closeModalHandler}
      title="Edit your personal info"
      content={content}
      actions={actions}
    />
  );
};

HeaderFormModal.propTypes = {
  updateProfile: PropTypes.func.isRequired,
};

export default connect(null, { updateProfile })(HeaderFormModal);
