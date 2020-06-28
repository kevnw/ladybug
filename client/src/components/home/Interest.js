import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { getFollowedModules, getModules } from '../../actions/module';

const Interest = ({
  followedModules,
  selectedModule,
  setSelectedModule,
  // getFollowedModules,
  getModules,
  // module: { followedModules, modules, loading },
  module: { modules, loading },
}) => {
  let moduleList;
  const [activeModule, setActiveModule] = useState(selectedModule);

  useEffect(() => {
    // getFollowedModules();
    getModules();
    setActiveModule(
      followedModules.length > 0 ? followedModules[0].modules[0]._id : null
    );
    setSelectedModule(
      followedModules.length > 0 ? followedModules[0].modules[0]._id : null
    );
  }, [getModules, loading, followedModules.length]);

  useEffect(() => {
    setActiveModule(selectedModule);
  }, [selectedModule]);

  moduleList = _.mapValues(_.keyBy(modules, '_id'));

  return (
    <Fragment>
      {!loading && moduleList && followedModules && modules && (
        <Fragment>
          <h2 className="red-text">Your interest.</h2>
          {followedModules.length > 0 ? (
            <div className="ui vertical fluid tabular menu">
              {activeModule === null &&
                setActiveModule(followedModules[0].modules[0]) &&
                setSelectedModule(followedModules[0].modules[0])}
              {followedModules.map((university) => (
                <div key={university._id}>
                  {university.modules.length > 0 && (
                    <div className="item header">{`${university.name}`}</div>
                  )}
                  {university.modules.length > 0 &&
                    university.modules.map((module) => (
                      <a
                        className={`${
                          activeModule === module._id ? 'active' : ''
                        } item`}
                        key={module._id}
                        onClick={() => {
                          setActiveModule(module._id);
                          setSelectedModule(module._id);
                        }}
                      >
                        {`${module.name}`}
                      </a>
                    ))}
                </div>
              ))}
            </div>
          ) : (
            <div>
              You have not followed any modules
              <div className="ui hidden divider" />
            </div>
          )}
          <Link to="/explore" className="ui button">
            <i className="icon plus"></i>Add more modules
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Interest.propTypes = {
  module: PropTypes.object.isRequired,
  // getFollowedModules: PropTypes.func.isRequired,
  getModules: PropTypes.func.isRequired,
  setSelectedModule: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  module: state.module,
});

export default connect(mapStateToProps, {
  // getFollowedModules,
  getModules,
})(Interest);
