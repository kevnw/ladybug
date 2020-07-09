import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');
  return (
    <form
      className="ui reply form"
      onSubmit={(e) => {
        e.preventDefault();
        addComment(postId, { text });
        setText('');
      }}
    >
      <div className="field">
        <textarea
          name="text"
          placeholder="Add comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <button
        type="submit"
        className="ui red-button labeled submit icon button"
      >
        <i className="icon edit"></i> Add Reply
      </button>
    </form>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
