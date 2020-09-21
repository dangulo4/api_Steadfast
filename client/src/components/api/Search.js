import React, { useState, useContext, useEffect, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import AlertContext from '../../context/alert/alertContext';
import ApiContext from '../../context/api/apiContext';
import AuthContext from '../../context/auth/authContext';
import PropTypes from 'prop-types';

const Search = (contact) => {
  const authContext = useContext(AuthContext);
  const apiContext = useContext(ApiContext);
  const alertContext = useContext(AlertContext);

  const { loading, contacts } = apiContext;

  const {
    value,
    department,
    first_name,
    last_name,
    position,
    phone,
  } = contacts;

  // Run as soon as component loads
  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  // Get Api search
  // useEffect(() => {
  //   apiContext.searchDomain();
  //   // eslint-disable-next-line
  // });

  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      alertContext.setAlert('Please enter a value', 'light');
    } else {
      apiContext.searchDomain(text);
      setText('');
    }
  };

  const onChange = (e) => setText(e.target.value);
  if (loading) return <Spinner />;

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={onChange}
          autoComplete='off'
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {apiContext.contacts.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={apiContext.clearDomain}
        >
          Clear
        </button>
      )}

      <Fragment>
        <table className='table'>
          <thead>
            <tr>
              <th>Department</th>
              <th>Position</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>State</th>
            </tr>
          </thead>
          {first_name}
        </table>
      </Fragment>
      <div>
        <a href='/' className='btn btn-info btn-lg active'>
          Return to Port
        </a>
      </div>
    </div>
  );
};

Search.protoTypes = {
  contact: PropTypes.object.isRequired,
};

export default Search;
