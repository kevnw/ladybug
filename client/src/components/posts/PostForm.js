import React from 'react';
import PropTypes from 'prop-types';

const PostForm = ({ setShowing, name }) => {
  return (
    <div className="ui segment">
      <button
        onClick={() => setShowing(true)}
        className="ui button fluid basic left-text"
      >
        <i className="edit icon"></i>
        {`What bugs you, ${name}?`}
      </button>
    </div>
  );
};

PostForm.propTypes = {
  setShowing: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default PostForm;
