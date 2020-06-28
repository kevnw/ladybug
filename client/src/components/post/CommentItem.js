import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
  postId,
  comment: { _id, text, authorName, avatar, author, date },
  auth,
  deleteComment,
}) => {
  return (
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
            onClick={() => deleteComment(postId, _id)}
            className="ui right floated icon mini button"
          >
            <i className="ui icon trash"></i>
          </button>
        )}
        {/* <div className="ui right floated labeled mini button" tabindex="0">
          <button className="ui icon mini button">
            <i className="thumbs down icon"></i>
          </button>
          <div className="ui basic label">63</div>
        </div>
        <div className="ui right floated labeled mini button" tabindex="0">
          <button className="ui icon mini button">
            <i className="thumbs up icon"></i>
          </button>
          <div className="ui basic label">1,048</div>
        </div> */}
      </div>
    </div>
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
