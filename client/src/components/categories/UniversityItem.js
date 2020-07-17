import React, { useState } from 'react';
// import InfiniteCarousel from 'react-leaf-carousel';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
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

  const responsive = {
    0: { items: 1 },
    500: { items: 2 },
    768: { items: 3 },
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
      {/* <div className="ui segment" > */}

      <div className="ui three doubling cards">
        {state.results.length > 0 ? (
          // <div>
          //   <AliceCarousel
          //     items={state.results.map((module) => (
          //       <div
          //         className="ui segment"
          //         style={{ border: 'none', boxShadow: 'none' }}
          //       >
          //         <CategoryItem module={module} key={module._id} />
          //       </div>
          //     ))}
          //     responsive={responsive}
          //     fadeOutAnimation={true}
          //     mouseTrackingEnabled={true}
          //     infinite={false}
          //     stagePadding={{
          //       paddingLeft: 0, // in pixels
          //       paddingRight: 0,
          //     }}
          //     // autoHeight={true}
          //     // buttonsDisabled={true}
          //     controlsStrategy="responsive"
          //   />
          // </div>
          state.results.map((module) => (
            <CategoryItem module={module} key={module._id} />
          ))
        ) : (
          <div>No results found.</div>
        )}
      </div>
      {/* <div className="ui hidden divider"></div> */}
    </div>
    // </div>
  );
};

UniversityItem.propTypes = {};

export default UniversityItem;
