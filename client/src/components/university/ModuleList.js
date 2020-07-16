import React, { Fragment, useState } from 'react';
import CategoryItem from '../categories/CategoryItem';
import PropTypes from 'prop-types';

const ModuleList = ({ modules, setShowing }) => {
  const [state, setState] = useState({
    value: '',
    results: modules,
  });

  const onChange = (e) => {
    let filteredResult = modules;
    filteredResult = filteredResult.filter(
      (module) =>
        module.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        module.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    // filteredResult = filteredResult.map((module) => console.log(module));
    setState({ results: filteredResult, value: e.target.value });
  };
  return (
    <Fragment>
      <div className="ui stackable grid">
        <div className="seven wide column">
          <button
            onClick={() => setShowing(true)}
            className="ui button red-button"
          >
            <i className="ui icon plus"></i>
            Request New Module
          </button>
        </div>
        <div className="nine wide right aligned column">
          <div className={`ui category search`}>
            <div className="ui fluid icon input">
              <input
                type="text"
                name="search"
                placeholder="Search module name or code..."
                value={state.value}
                onChange={(e) => onChange(e)}
              />
              <i className="search icon"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="ui hidden divider"></div>
      <div className="ui three doubling cards">
        {state.results.length > 0 ? (
          state.results.map((module) => (
            <CategoryItem
              module={module}
              key={module._id}
              // university={match.params.uni}
            />
          ))
        ) : (
          <div
            className="ui segment"
            style={{ border: 'none', boxShadow: 'none' }}
          >
            No results found.
          </div>
        )}
      </div>
      {/* </div> */}
      <div className="ui hidden divider"></div>
    </Fragment>
  );
};

ModuleList.propTypes = {};

export default ModuleList;
