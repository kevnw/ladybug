import React, { Fragment, useEffect } from 'react';
import PostItem from '../posts/PostItem';

const ProfilePosts = ({ postsByUser }) => {
  return (
    postsByUser.length > 0 &&
    postsByUser.map((post) => <PostItem post={post} key={post._id} />)
  );
};

export default ProfilePosts;
