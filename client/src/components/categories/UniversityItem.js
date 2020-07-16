import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';

const UniversityItem = ({ university, modules }) => {
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
    setState({ results: filteredResult, value: e.target.value });
  };

  return (
    <div className="ui segment" style={{ border: 'none', boxShadow: 'none' }}>
      <div className="ui stackable grid">
        <div className="eight wide column">
          <h3>
            <Link to={`/${university.acronym}`} className="red-link">
              {`${university.name}`}
            </Link>
          </h3>
        </div>
        <div className="eight wide right aligned column">
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

      <hr />
      <div className="ui segment" style={{ border: 'none', boxShadow: 'none' }}>
        {/* <Carousel> */}
        <div className="ui three doubling cards">
          {state.results.length > 0 ? (
            state.results.map((module) => (
              <CategoryItem module={module} key={module._id} />
            ))
          ) : (
            <div>No results found.</div>
          )}
        </div>
        {/* </Carousel> */}
      </div>
    </div>
  );
};

UniversityItem.propTypes = {};

export default UniversityItem;
