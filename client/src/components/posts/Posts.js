import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import { getPostsFromModule } from '../../actions/post';
import { getModule } from '../../actions/module';

const Posts = ({
  moduleId,
  getPostsFromModule,
  getModule,
  post: { posts, loading },
  module: { module },
}) => {
  useEffect(() => {
    getPostsFromModule(moduleId);
    getModule(moduleId);
  }, [getPostsFromModule, loading, moduleId, posts.length]);

  return (
    !loading &&
    posts.length > 0 &&
    module &&
    posts.map((post) => <PostItem post={post} key={post._id} />)
  );
};

Posts.propTypes = {
  getPostsFromModule: PropTypes.func.isRequired,
  getModule: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  module: state.module,
});

export default connect(mapStateToProps, { getPostsFromModule, getModule })(
  Posts
);
