import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';
import { getSavedPosts } from '../../actions/post';
import PostItem from './PostItem';

const SavedPosts = ({ post: { savedPosts, loading }, getSavedPosts }) => {
  useEffect(() => {
    getSavedPosts();
  }, []);
  return (
    <div className="container-body">
      <Alert />
      {loading ? (
        <div className="ui centered active loader"></div>
      ) : (
        <div className="ui stackable grid">
          <div className="twelve wide centered column">
            <h1 className="red-text">Saved posts</h1>
            {savedPosts.length > 0 ? (
              savedPosts.map((post) => <PostItem key={post._id} post={post} />)
            ) : (
              <h4>You have no saved posts</h4>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

SavedPosts.propTypes = {
  post: PropTypes.object.isRequired,
  getSavedPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getSavedPosts })(SavedPosts);
