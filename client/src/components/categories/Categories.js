import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';
import CategoryFormModal from './CategoryFormModal';
import Alert from '../layout/Alert';
import { getModules } from '../../actions/module';
import { getUniversities, getUniversity } from '../../actions/university';

const Categories = ({
  getUniversities,
  getModules,
  university,
  module,
  auth,
}) => {
  let moduleList;
  const universities = university.universities;
  const universityLoading = university.loading;
  const modules = module.modules;
  const moduleLoading = module.loading;

  useEffect(() => {
    getModules();
  }, []);

  useEffect(() => {
    getUniversities();
  }, []);

  moduleList = _.mapValues(_.keyBy(modules, '_id'));

  const [isShowing, setShowing] = useState(false);
  return (
    <div>
      <div className="container-body">
        <Alert />
        <div className="ui grid">
          <div className="eight wide column">
            <h1 className="red-text">Explore modules</h1>
          </div>
          <div className="eight wide right aligned column">
            <button
              onClick={() => setShowing(true)}
              className="ui button red-button"
            >
              <i className="ui icon plus"></i>
              Request New Module
            </button>
          </div>
        </div>

        {auth.user &&
          !universityLoading &&
          !moduleLoading &&
          modules &&
          moduleList &&
          universities && (
            <div>
              {universities.length > 0 &&
                universities.map((university) => (
                  <div
                    key={university._id}
                    className="ui segment"
                    style={{ border: 'none', boxShadow: 'none' }}
                  >
                    <h3>
                      <Link to={`/${university.acronym}`} className="red-link">
                        {`${university.name}`}
                      </Link>
                    </h3>
                    <hr />
                    <div
                      className="ui segment"
                      style={{ border: 'none', boxShadow: 'none' }}
                    >
                      <div className="ui three doubling cards">
                        {university.modules.length > 0 &&
                          university.modules.map((module) => (
                            <CategoryItem
                              module={moduleList[module]}
                              key={module}
                              // university={university.acronym}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
      </div>
      {isShowing && <CategoryFormModal setShowing={setShowing} />}
    </div>
  );
};

Categories.propTypes = {
  getUniversities: PropTypes.func.isRequired,
  getModules: PropTypes.func.isRequired,
  module: PropTypes.object,
  university: PropTypes.object,
};

const mapStateToProps = (state) => ({
  university: state.university,
  module: state.module,
  auth: state.auth,
});

export default connect(mapStateToProps, { getUniversities, getModules })(
  Categories
);
