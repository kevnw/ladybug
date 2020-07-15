import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import ConfirmationModal from '../ConfirmationModal';
import { deleteComment } from '../../actions/post';
import axios from 'axios';

const CommentItem = ({
  postId,
  comment: { _id, text, authorName, author, date },
  auth,
  deleteComment,
}) => {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    axios
      .get(`/profiles/${author}`)
      .then((response) => setAvatar(response.data.avatar));
  }, []);

  const [modalShowing, setModalShowing] = useState(false);
  const closeModalHandler = () => {
    setModalShowing(false);
  };
  const actions = (
    <Fragment>
      <button
        onClick={() => deleteComment(postId, _id)}
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
    avatar && (
      <div className="ui clearing segment">
        <div className="comment">
          <a className="avatar">
            <img src={avatar} />
          </a>
          <div className="content">
            {!auth.loading && auth.user._id === author ? (
              <Link to={`/profile/me`} className="author">
                {authorName}
              </Link>
            ) : (
              <Link to={`/profile/${author}`} className="author">
                {authorName}
              </Link>
            )}

            <div className="metadata">
              <span className="date">
                Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
              </span>
            </div>
            <div className="text">{text}</div>
          </div>
          {!auth.loading && author === auth.user._id && (
            <button
              onClick={() => setModalShowing(true)}
              className="ui right floated icon mini button"
            >
              <i className="ui icon trash"></i>
            </button>
          )}
        </div>
        {modalShowing && (
          <ConfirmationModal
            onDismiss={closeModalHandler}
            title="Delete Comment"
            content="Are you sure you want to delete this comment?"
            actions={actions}
          />
        )}
      </div>
    )
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
