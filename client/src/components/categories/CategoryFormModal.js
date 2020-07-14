import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ModalDropdown from '../ModalDropdown';
import { Dropdown } from 'semantic-ui-react';
import { addRequest } from '../../actions/request';
import data from '../../data'

const CategoryFormModal = ({ setShowing, addRequest }) => {
  const countryOptions = [
    { key: 'au', value: 'australia', flag: 'au', text: 'Australia' },
    { key: 'ca', value: 'canada', flag: 'ca', text: 'Canada' },
    { key: 'cn', value: 'china', flag: 'cn', text: 'China' },
    { key: 'dk', value: 'Denmark', flag: 'dk', text: 'Denmark' },
    { key: 'fi', value: 'Finland', flag: 'fi', text: 'Finland' },
    { key: 'de', value: 'Germany', flag: 'de', text: 'Germany' },
    { key: 'hk', value: 'HongKong', flag: 'hk', text: 'Hong Kong' },
    { key: 'in', value: 'India', flag: 'in', text: 'India' },
    { key: 'id', value: 'Indonesia', flag: 'id', text: 'Indonesia' },
    { key: 'it', value: 'Italy', flag: 'it', text: 'Italy' },
    { key: 'jp', value: 'Japan', flag: 'jp', text: 'Japan' },
    { key: 'my', value: 'Malaysia', flag: 'my', text: 'Malaysia' },
    { key: 'nl', value: 'Netherlands', flag: 'nl', text: 'Netherlands' },
    { key: 'nz', value: 'NewZealand', flag: 'nz', text: 'New Zealand' },
    { key: 'ph', value: 'Philippines', flag: 'ph', text: 'Philippines' },
    { key: 'sg', value: 'Singapore', flag: 'sg', text: 'Singapore' },
    { key: 'za', value: 'SouthAfrica', flag: 'za', text: 'South Africa' },
    { key: 'es', value: 'Spain', flag: 'es', text: 'Spain' },
    { key: 'ch', value: 'Switzerland', flag: 'ch', text: 'Switzerland' },
    { key: 'tw', value: 'Taiwan', flag: 'tw', text: 'Taiwan' },
    { key: 'th', value: 'Thailand', flag: 'th', text: 'Thailand' },
    { key: 'us', value: 'UnitedStates', flag: 'us', text: 'United States' },
    { key: 'vn', value: 'Vietnam', flag: 'vn', text: 'Vietnam' },
  ];
  const [country, setCountry] = useState(null);
  const [uniList, setUniList] = useState([]);
  const [formData, setFormData] = useState({
    university: '',
    module: '',
  });
  const { university, module } = formData;

  const closeModalHandler = () => {
    setShowing(false);
  };

  useEffect(() => {
    if (country) {
      var countryCode = country.toLowerCase()
      const path = `university/${countryCode}.json`
      axios.get(path)
        .then((response) => setUniList(response.data));
      // console.log(countryCode)
      // setUniList(data[0][`${countryCode}`])
    }
  }, [country]);

  const uniqueUni = _.uniqBy(uniList, 'name');
  const uniOptions = uniqueUni.map((uni) => ({
    ...uni,
    text: uni.name,
    key: uni.name,
    value: uni.name,
  }));

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    addRequest(formData);
    closeModalHandler();
  };

  const content = (
    <form id="myform" className="ui form" onSubmit={(e) => onSubmit(e)}>
      <div className="field">
        <label className="header">Country</label>
        <Dropdown
          placeholder="Select Country"
          fluid
          search
          selection
          options={countryOptions}
          onChange={(e, { value }) => {
            setCountry(value);
            setUniList([]);
            setFormData({ ...formData, university: '' });
          }}
          required
        />
      </div>
      <div className="field">
        <label className="header">University</label>
        {/* <select name="category" className="ui selection dropdown">
          <option value="">Select a University</option>
          <option value="CS2040S">National University of Singapore</option>
          <option value="CS2030">Nanyang Technological University</option>
        </select> */}
        <Dropdown
          placeholder="Select University"
          fluid
          search
          selection
          options={uniOptions}
          onChange={(e, { value }) =>
            setFormData({ ...formData, university: value })
          }
          required
        />
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

CategoryFormModal.propTypes = {
  addRequest: PropTypes.func.isRequired,
};

export default connect(null, { addRequest })(CategoryFormModal);
