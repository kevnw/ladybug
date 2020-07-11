import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import Modal from '../Modal';

const ApproveRequestFormModal = ({ setFormShowing, request }) => {
  useEffect(() => {
    axios.get(`/universities/name/${name}`).then(({ data }) => {
      setFormData({
        ...formData,
        acronym: data ? data.acronym : '',
        overview: data ? data.overview : '',
        website: data ? data.website : '',
        logo: data ? data.logo : '',
      });
      setUniversity(data ? data : null);
    });
  }, []);
  const [university, setUniversity] = useState(null);
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    name: request.university,
    acronym: '',
    overview: '',
    website: '',
    logo: '',
    module: {
      name: request.module,
      title: '',
      description: '',
      university: '',
    },
  });

  const { name, acronym, overview, website, logo, module } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (university) {
      console.log(module);
    } else {
      console.log(formData);
    }
  };

  const closeModalHandler = () => {
    setFormShowing(false);
  };

  const actions1 = (
    <Fragment>
      <button onClick={() => setPage(2)} className="ui button red-button">
        Next
      </button>
      <button onClick={closeModalHandler} className="ui button">
        Cancel
      </button>
    </Fragment>
  );

  const actions2 = (
    <Fragment>
      <button
        onClick={() => setPage(1)}
        className="ui button"
        style={{ float: 'left' }}
      >
        Previous
      </button>
      <button type="submit" form="myform" className="ui button red-button">
        Add Module
      </button>
      <button onClick={closeModalHandler} className="ui button">
        Cancel
      </button>
    </Fragment>
  );

  const content1 = (
    <Fragment>
      <div className="field">
        <label className="header">University Name</label>
        <div className="ui input">
          <input
            type="text"
            name="name"
            placeholder="University Name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
      </div>
      <div className="field">
        <label className="header">University Acronym</label>
        <div className="ui input">
          <input
            type="text"
            name="acronym"
            placeholder="University Acronym"
            value={acronym}
            onChange={(e) => onChange(e)}
          />
        </div>
      </div>
      <div className="field">
        <label className="header">Overview</label>
        <div className="ui input">
          <textarea
            type="text"
            name="overview"
            placeholder="Overview"
            value={overview}
            onChange={(e) => onChange(e)}
          />
        </div>
      </div>
      <div className="field">
        <label className="header">Website</label>
        <div className="ui input">
          <input
            type="text"
            name="website"
            placeholder="Website"
            value={website}
            onChange={(e) => onChange(e)}
          />
        </div>
      </div>
      <div className="field">
        <label className="header">Logo</label>
        <div className="ui input">
          <input
            type="text"
            name="logo"
            placeholder="Logo URL"
            value={logo}
            onChange={(e) => onChange(e)}
          />
        </div>
      </div>
    </Fragment>
  );

  const content2 = (
    <Fragment>
      <div className="field">
        <label className="header">Module Code</label>
        <div className="ui input">
          <input
            type="text"
            name="moduleName"
            placeholder="Module Code"
            value={module.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                module: { ...module, name: e.target.value },
              })
            }
          />
        </div>
      </div>
      <div className="field">
        <label className="header">Module Name</label>
        <div className="ui input">
          <input
            type="text"
            name="title"
            placeholder="Module Name"
            value={module.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                module: { ...module, title: e.target.value },
              })
            }
          />
        </div>
      </div>
      <div className="field">
        <label className="header">Description</label>
        <div className="ui input">
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            value={module.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                module: { ...module, description: e.target.value },
              })
            }
          />
        </div>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      <div>
        <Modal
          onDismiss={closeModalHandler}
          title={page == 1 ? 'University Details' : 'Module Details'}
          content={
            <form id="myform" className="ui form" onSubmit={(e) => onSubmit(e)}>
              {page == 1 ? content1 : content2}
            </form>
          }
          actions={page == 1 ? actions1 : actions2}
        />
      </div>
    </Fragment>
  );
};

ApproveRequestFormModal.propTypes = {};

export default connect(null, {})(ApproveRequestFormModal);
