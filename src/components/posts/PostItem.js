import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deletePost, upvotePost, downvotePost } from '../../actions/post';

const PostItem = ({ post, auth, deletePost, upvotePost, downvotePost }) => {
  const {
    _id,
    moduleName,
    authorName,
    author,
    date,
    title,
    text,
    upvote,
    downvote,
    comments,
    avatar,
    uniAcronym,
  } = post;
  // console.log(uniAcronym);
  return (
    <div className="ui segment">
      <div className="ui top attached label red-label">
        <div className="ui grid">
          <div className="ui four wide column">
            {/* MODIFY THIS */}
            <Link
              to={`/${uniAcronym}/${moduleName}`}
              style={{ color: 'inherit' }}
            >
              {`${moduleName}`}
            </Link>
          </div>
          <div className="ui right floated twelve wide column right-text">
            Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
          </div>
        </div>
      </div>
      <div className="ui stackable grid">
        <div className="ui three wide column">
          <img
            className="ui tiny circular centered image"
            src={avatar}
            alt=""
          />
          {!auth.loading && auth.user._id === author ? (
            <Link to={`/profile/me`} className="center-text padding-text">
              <h4>{`${authorName}`}</h4>
            </Link>
          ) : (
            <Link
              to={`/profile/${author}`}
              className="center-text padding-text"
            >
              <h4>{`${authorName}`}</h4>
            </Link>
          )}
        </div>
        <div className="ui thirteen wide column">
          <h3>{`${title}`}</h3>
          <p>{`${text}`}</p>

          {!auth.loading && auth.user && (
            <Fragment>
              <div className="ui labeled small button" tabIndex="0">
                <button
                  onClick={() => upvotePost(_id)}
                  className={`ui icon small button ${
                    upvote.indexOf(auth.user._id) === -1 ? '' : 'red-button'
                  }`}
                >
                  <i className="thumbs up icon"></i>
                </button>
                <div className="ui basic label">{`${upvote.length}`}</div>
              </div>
              <div className="ui labeled small button" tabIndex="0">
                <button
                  onClick={() => downvotePost(_id)}
                  className={`ui icon small button ${
                    downvote.indexOf(auth.user._id) === -1 ? '' : 'red-button'
                  }`}
                >
                  <i className="thumbs down icon"></i>
                </button>
                <div className="ui basic label">{`${downvote.length}`}</div>
              </div>
            </Fragment>
          )}
          <div className="ui labeled small button" tabIndex="0">
            {/* MODIFY THIS */}
            <Link
              to={`/${uniAcronym}/${moduleName}/${_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ui icon small button"
            >
              <i className="comment icon"></i> Discussion
            </Link>
            <div className="ui basic label">{`${comments.length}`}</div>
          </div>
          {!auth.loading && author === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              className="ui right floated icon small button"
            >
              <i className="ui icon trash"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  upvotePost: PropTypes.func.isRequired,
  downvotePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deletePost,
  upvotePost,
  downvotePost,
})(PostItem);
