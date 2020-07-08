import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';
import CategoryItem from '../categories/CategoryItem';
import CategoryFormModalFixed from '../categories/CategoryFormModalFixed';
import { getModulesInUniversity } from '../../actions/module';
import { getUniversity } from '../../actions/university';

const University = ({
  getModulesInUniversity,
  getUniversity,
  match,
  module: { modulesInUniversity, loading },
  university,
}) => {
  useEffect(() => {
    getModulesInUniversity(match.params.uni);
    getUniversity(match.params.uni);
  }, []);

  const [isShowing, setShowing] = useState(false);
  const [activeOverview, setActiveOverview] = useState(true);
  const [activeModules, setActiveModules] = useState(false);

  const toggleOverview = () => {
    setActiveOverview(true);
    setActiveModules(false);
  };

  const toggleModules = () => {
    setActiveOverview(false);
    setActiveModules(true);
  };

  const overview =
    university.loading ||
    !university.university ||
    university.university.acronym != match.params.uni ? (
      <div></div>
    ) : (
      <Fragment>
        <div className="picture-container">
          <img
            src={`${university.university.logo}`}
            className="university-picture"
          />
        </div>
        {/* <div className="ui segment center-text">
        <h1 className="large">National University of Singapore</h1>
        <div className="lead">Singapore</div>
      </div> */}
        <div className="ui segment">
          <h3>Overview:</h3>
          <p>{`${university.university.overview}`}</p>
          <h3>Website:</h3>
          <p>{`${university.university.website}`}</p>
        </div>
      </Fragment>
    );

  const moduleList =
    loading || !modulesInUniversity ? (
      <div></div>
    ) : (
      <Fragment>
        <button
          onClick={() => setShowing(true)}
          className="ui button red-button"
        >
          <i className="ui icon plus"></i>
          Request New Module
        </button>
        <div
          className="ui segment"
          style={{ border: 'none', boxShadow: 'none' }}
        >
          <div className="ui three doubling cards">
            {modulesInUniversity.length > 0 &&
              modulesInUniversity.map((module) => (
                <CategoryItem
                  module={module}
                  key={module._id}
                  // university={match.params.uni}
                />
              ))}
          </div>
        </div>
      </Fragment>
    );

  return university.loading ||
    !university.university ||
    loading ||
    !modulesInUniversity ||
    university.university.acronym != match.params.uni ? (
    <div className="ui centered active loader"></div>
  ) : (
    <div>
      <div className="container-body">
        <Alert />
        <div className="ui stackable grid">
          <div className="twelve wide centered column">
            <div className="ui secondary pointing menu">
              <a
                onClick={toggleOverview}
                className={`item ${activeOverview ? 'active' : ''}`}
              >
                Overview
              </a>
              <a
                onClick={toggleModules}
                className={`item ${activeModules ? 'active' : ''}`}
              >
                Modules
              </a>
            </div>
            <div className="">{activeOverview ? overview : moduleList}</div>
          </div>
        </div>
      </div>
      {isShowing && (
        <CategoryFormModalFixed
          uniName={university.university.name}
          setShowing={setShowing}
        />
      )}
    </div>
  );
};

University.propTypes = {
  getModulesInUniversity: PropTypes.func.isRequired,
  getUniversity: PropTypes.func.isRequired,
  module: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  module: state.module,
  university: state.university,
});

export default connect(mapStateToProps, {
  getModulesInUniversity,
  getUniversity,
})(University);
