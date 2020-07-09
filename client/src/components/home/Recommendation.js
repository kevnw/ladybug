import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem';
import { getPostsRecommendations } from '../../actions/post';
import { getModulesRecommendations } from '../../actions/module';
import CategoryItem from '../categories/CategoryItem';

const Recommendation = ({
  getModulesRecommendations,
  getPostsRecommendations,
  post: { recommendedPosts, loading },
  module: { recommendedModules },
}) => {
  useEffect(() => {
    getPostsRecommendations();
    getModulesRecommendations();
  }, [getModulesRecommendations, getPostsRecommendations]);
  return (
    <Fragment>
      <h3>Recommended Posts</h3>

      {!loading &&
        recommendedPosts &&
        recommendedModules &&
        recommendedPosts.length > 0 &&
        recommendedPosts.map(
          (post, index) =>
            post && (
              <Fragment key={post._id}>
                <PostItem post={post} />
                {index === 0 && recommendedModules.length > 0 && (
                  <div className="ui segment">
                    <p>Discover New Modules</p>
                    <div className="ui three doubling cards">
                      {recommendedModules.map((module) => (
                        <CategoryItem module={module} key={module._id} />
                      ))}
                    </div>
                  </div>
                )}
              </Fragment>
            )
        )}
    </Fragment>
  );
};

Recommendation.propTypes = {
  getModulesRecommendations: PropTypes.func.isRequired,
  getPostsRecommendations: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  module: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  module: state.module,
});

export default connect(mapStateToProps, {
  getPostsRecommendations,
  getModulesRecommendations,
})(Recommendation);
