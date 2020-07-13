import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import Avatar from 'react-avatar-edit';
// import { updateProfile } from '../../actions/profile';

const ChangeProfileModal = ({ setShowingPhoto, profile }) => {
  const src = profile.avatar;
  const [state, setState] = useState({ preview: null, src });
  const onClose = () => {
    this.setState({ preview: null });
  };

  const onCrop = (preview) => {
    console.log(preview);
    this.setState({ ...state, preview });
  };

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 71680) {
      alert('File is too big!');
      elem.target.value = '';
    }
  };

  const closeModalHandler = () => {
    setShowingPhoto(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // closeModalHandler();
    // console.log(newProfile);
  };

  const actions = (
    <Fragment>
      <button className="ui button red-button">Save</button>
      <button onClick={closeModalHandler} className="ui button">
        Cancel
      </button>
    </Fragment>
  );

  const content = (
    <div>
      <Avatar
        crossOrigin="anonymous"
        width={390}
        height={295}
        onCrop={() => onCrop}
        onClose={() => onClose}
        onBeforeFileLoad={() => onBeforeFileLoad}
        src={state.src}
      />
      <img src={state.preview} alt="Preview" crossOrigin="anonymous" />
    </div>
  );

  return (
    <Modal
      onDismiss={closeModalHandler}
      title="Profile Photo"
      content={content}
      actions={actions}
    />
  );
};

ChangeProfileModal.propTypes = {
  //   updateProfile: PropTypes.func.isRequired,
};

export default connect(null, {})(ChangeProfileModal);
