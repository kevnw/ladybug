import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';
import PostItem from '../posts/PostItem';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { getPost } from '../../actions/post';
import { getModule } from '../../actions/module';
import { followModule, unfollowModule } from '../../actions/module';

const Post = ({
  getPost,
  getModule,
  followModule,
  unfollowModule,
  post: { post, loading },
  module,
  match,
  auth,
}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  useEffect(() => {
    {
      post && getModule(post.module);
    }
  }, [getModule, post]);

  const [icon, setIcon] = useState(null);

  return (
    <div className="container-body">
      <Alert />
      {auth &&
        !module.loading &&
        module.module &&
        icon === null &&
        setIcon(
          module.module.followers.indexOf(auth.user._id) === -1
            ? 'plus'
            : 'minus'
        )}
      {!loading && post && auth && !module.loading && module.module && (
        <Fragment>
          {/* Change to Unfollow */}
          <div className="ui stackable grid">
            <div className="twelve wide centered column">
              <button
                onClick={() => {
                  if (icon === 'plus') {
                    setIcon('minus');
                    followModule(post.module, post.moduleName);
                  } else {
                    setIcon('plus');
                    unfollowModule(post.module, post.moduleName);
                  }
                }}
                className="ui button red-button"
              >
                <i className={`ui icon ${icon}`}></i>
                {icon === 'plus' ? 'Follow' : 'Unfollow'} {`${post.moduleName}`}
              </button>
              <PostItem post={post} />
              <div className="ui comments">
                <h3 className="ui dividing header">Comments</h3>
                {post.comments.map((comment) => (
                  <CommentItem
                    key={comment._id}
                    comment={comment}
                    postId={post._id}
                  />
                ))}

                <CommentForm postId={post._id} />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  module: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  getModule: PropTypes.func.isRequired,
  followModule: PropTypes.func.isRequired,
  unfollowModule: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  module: state.module,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getPost,
  getModule,
  followModule,
  unfollowModule,
})(Post);
