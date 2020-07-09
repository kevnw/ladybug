import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Interest from './Interest';
import Recommendation from './Recommendation';
import Alert from '../layout/Alert';
import PostForm from '../posts/PostForm';
import PostFormModal from '../posts/PostFormModal';
import Posts from '../posts/Posts';
import { getFollowedModules } from '../../actions/module';

const Home = ({
  user,
  getFollowedModules,
  module: { followedModules, loading },
}) => {
  useEffect(() => {
    getFollowedModules();
  }, [getFollowedModules, followedModules.length]);

  const [isShowing, setShowing] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  return (
    <Fragment>
      {user && !loading && (
        <div>
          <div className="container-body">
            <Alert />
            <div className="ui stackable grid">
              <div className="four wide column">
                <Interest
                  followedModules={followedModules}
                  setSelectedModule={setSelectedModule}
                  selectedModule={selectedModule}
                />
              </div>
              <div className="twelve wide column">
                <PostForm setShowing={setShowing} name={user.name} />
                {followedModules.length > 0 && selectedModule && (
                  <Posts moduleId={selectedModule} />
                )}
                {followedModules.length === 0 && <Recommendation />}
              </div>
            </div>
          </div>
          {isShowing && (
            <PostFormModal
              setShowing={setShowing}
              setSelectedModule={setSelectedModule}
            />
          )}
        </div>
      )}
    </Fragment>
  );
};

Home.propTypes = {
  user: PropTypes.object,
  module: PropTypes.object.isRequired,
  getFollowedModules: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  module: state.module,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getFollowedModules })(Home);
