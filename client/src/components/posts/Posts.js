import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import {
  getPostsFromModule,
  getMostRecentPosts,
  getMostLikedPosts,
  getMostDiscussedPosts,
} from '../../actions/post';
import { Dropdown } from 'semantic-ui-react';

const Posts = ({
  moduleId,
  getPostsFromModule,
  getMostRecentPosts,
  getMostLikedPosts,
  getMostDiscussedPosts,
  post: { posts, loading },
}) => {
  const [sortBy, setSortBy] = useState('most-recent');
  useEffect(() => {
    if (sortBy === 'most-recent') {
      getMostRecentPosts(moduleId);
    } else if (sortBy === 'most-liked') {
      getMostLikedPosts(moduleId);
    } else if (sortBy === 'most-discussed') {
      getMostDiscussedPosts(moduleId);
    }
  }, [loading, moduleId, posts.length, sortBy]);

  const options = [
    {
      key: 'Most Recent',
      text: 'Most Recent',
      value: 'most-recent',
    },
    {
      key: 'Most Liked',
      text: 'Most Liked',
      value: 'most-liked',
    },
    {
      key: 'Most Discussed',
      text: 'Most Discussed',
      value: 'most-discussed',
    },
  ];

  return (
    <Fragment>
      <span>
        Show posts by{' '}
        <Dropdown
          inline
          options={options}
          defaultValue={options[0].value}
          onChange={(e, val) => {
            setSortBy(val.value);
            console.log(val.value);
          }}
        />
      </span>
      {!loading &&
        posts.length > 0 &&
        posts[0].module === moduleId &&
        posts.map((post) => <PostItem post={post} key={post._id} />)}
    </Fragment>
  );
};

Posts.propTypes = {
  getPostsFromModule: PropTypes.func.isRequired,
  getMostRecentPosts: PropTypes.func.isRequired,
  getMostLikedPosts: PropTypes.func.isRequired,
  getMostDiscussedPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {
  getPostsFromModule,
  getMostRecentPosts,
  getMostLikedPosts,
  getMostDiscussedPosts,
})(Posts);
