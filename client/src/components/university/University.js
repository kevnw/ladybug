import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';
import CategoryFormModalFixed from '../categories/CategoryFormModalFixed';
import ModuleList from './ModuleList';
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
      <ModuleList modules={modulesInUniversity} setShowing={setShowing} />
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
