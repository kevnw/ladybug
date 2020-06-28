import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';

const CategoryFormModal = (props) => {
  const closeModalHandler = () => {
    props.setShowing(false);
  };

  const content = (
    <form className="ui form">
      <div className="field">
        <label className="header">University</label>
        <select name="category" className="ui selection dropdown">
          <option value="">Select a University</option>
          <option value="CS2040S">National University of Singapore</option>
          <option value="CS2030">Nanyang Technological University</option>
        </select>
      </div>
      <div className="field">
        <label className="header">Module Code</label>
        <div className="ui input">
          <input type="text" name="code" placeholder="Module Code" />
        </div>
      </div>
      <div className="field">
        <label className="">Description</label>
        <div className="ui input">
          <textarea
            name="text"
            placeholder="Write short description for the module"
          ></textarea>
        </div>
      </div>
    </form>
  );

  const actions = (
    <Fragment>
      <button className="ui button red-button">Add</button>
      <button onClick={closeModalHandler} className="ui button">
        Cancel
      </button>
    </Fragment>
  );

  return (
    <Modal
      onDismiss={closeModalHandler}
      title="Add a Category"
      content={content}
      actions={actions}
    />
  );
};

CategoryFormModal.propTypes = {};

export default CategoryFormModal;
