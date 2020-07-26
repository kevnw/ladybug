import React, { Fragment } from 'react';

const NotFound = () => {
  return (
    <Fragment>
      <div className="container-body">
        <h1 className="large">
          <i className="icon exclamation triangle" /> 404 Page Not Found
        </h1>
        <p className="lead">Sorry, this page does not exist</p>
      </div>
    </Fragment>
  );
};

export default NotFound;
