import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem';
import { getPostsByCurrentUser, getPostsByUser } from '../../actions/post';

const ProfilePosts = ({
  userId,
  getPostsByUser,
  getPostsByCurrentUser,
  post: { postsByUser, loading },
}) => {
  useEffect(() => {
    if (userId === 'me') {
      getPostsByCurrentUser();
    } else {
      getPostsByUser(userId);
    }
  }, [getPostsByCurrentUser, getPostsByUser]);

  return (
    !loading &&
    postsByUser.length > 0 &&
    postsByUser.map((post) => <PostItem post={post} key={post._id} />)
  );
};

ProfilePosts.propTypes = {
  getPostsByCurrentUser: PropTypes.func.isRequired,
  getPostsByUser: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {
  getPostsByCurrentUser,
  getPostsByUser,
})(ProfilePosts);
