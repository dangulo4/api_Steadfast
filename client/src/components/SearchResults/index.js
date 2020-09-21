import React, { useContext, Fragment } from 'react';
import ApiContext from '../pages/utils/apiContext';
import './style.css';

function SearchResults() {
  const { organization, domain } = useContext(ApiContext);
  return (
    <Fragment>
      <h2>{organization}</h2>
      {/* <ul className='list-group search-results'>
        <li className='list-group-item'>
          <h2>{organization}</h2>
          <a href={domain}>{domain}</a>
        </li>
      </ul> */}
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Department</th>
            <th>Position</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>State</th>
          </tr>
        </thead>
      </table>
      <ul className='list-group search-results'>
        <li className='list-group-item'>
          <a href={domain}>{domain}</a>
        </li>
      </ul>
    </Fragment>
  );
}
export default SearchResults;
