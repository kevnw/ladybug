import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmationModal from '../ConfirmationModal';
import ReactAvatarEditor from 'react-avatar-editor';

const ChangeProfileModal = ({ setShowingPhoto, profile }) => {
  const src = profile.avatar;
  const [state, setState] = useState({
    image: src,
    allowZoomOut: false,
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 120,
    preview: null,
    width: 200,
    height: 200,
  });

  const handleNewImage = (e) => {
    setState({ ...state, image: e.target.files[0] });
  };

  const handleScale = (e) => {
    const scale = parseFloat(e.target.value);
    setState({ ...state, scale: scale });
  };

  const handlePositionChange = (position) => {
    setState({ ...state, position: position });
  };

  const profileImageChange = (fileChangeEvent) => {
    const file = fileChangeEvent.target.files[0];
    const { type } = file;
    if (type.endsWith('jpeg') || type.endsWith('png') || type.endsWith('jpg')) {
      setState({ selectedImage: file });
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
    <div align="center">
      <ReactAvatarEditor
        scale={parseFloat(state.scale)}
        width={state.width}
        height={state.height}
        position={state.position}
        onPositionChange={(position) => handlePositionChange(position)}
        rotate={parseFloat(state.rotate)}
        borderRadius={state.width / (100 / state.borderRadius)}
        image={state.image}
      />

      <div
        align="center"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <label for="file" class="ui icon button">
          <i class="file icon"></i>
          Choose File
        </label>
        <input
          name="newImage"
          accept="image/png, image/jpeg"
          type="file"
          id="file"
          style={{ display: 'none' }}
          onChange={(e) => handleNewImage(e)}
        />
        {/* </div>
      <div className="ui horizontal divider"></div>
      <div> */}
        <input
          className="ui slider range"
          name="scale"
          type="range"
          onChange={(e) => handleScale(e)}
          min={state.allowZoomOut ? '0.1' : '1'}
          max="2"
          step="0.01"
          defaultValue="1"
          style={{ color: '#b82601' }}
        />
      </div>
    </div>
  );

  return (
    <ConfirmationModal
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
