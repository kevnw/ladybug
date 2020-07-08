import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ModalDropdown from '../ModalDropdown';
import { Dropdown } from 'semantic-ui-react';
import { addRequest } from '../../actions/request';

const CategoryFormModalFixed = ({ uniName, setShowing, addRequest }) => {
  const [formData, setFormData] = useState({
    university: uniName,
    module: '',
  });
  const { university, module } = formData;

  const closeModalHandler = () => {
    setShowing(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    addRequest(formData);
    closeModalHandler();
  };

  const content = (
    <form id="myform" className="ui form" onSubmit={(e) => onSubmit(e)}>
      <div className="field">
        <label className="header">University</label>
        <div className="ui input">{`${uniName}`}</div>
      </div>
      <div className="field">
        <label className="header">Module Code</label>
        <div className="ui input">
          <input
            type="text"
            name="module"
            placeholder="Module Code"
            value={module}
            onChange={(e) =>
              setFormData({ ...formData, module: e.target.value })
            }
            required
          />
        </div>
      </div>
    </form>
  );

  const actions = (
    <Fragment>
      <button type="submit" form="myform" className="ui button red-button">
        Request
      </button>
      <button onClick={closeModalHandler} className="ui button">
        Cancel
      </button>
    </Fragment>
  );

  return (
    <ModalDropdown
      onDismiss={closeModalHandler}
      title="Request New Module"
      content={content}
      actions={actions}
    />
  );
};

CategoryFormModalFixed.propTypes = {
  addRequest: PropTypes.func.isRequired,
};

export default connect(null, { addRequest })(CategoryFormModalFixed);
