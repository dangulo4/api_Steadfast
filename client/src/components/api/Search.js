import React, { useState, useContext, useEffect, Fragment } from 'react'
import Spinner from '../layout/Spinner'
import AuthContext from '../../context/auth/authContext'
import ApiContext from '../../context/api/apiContext'
import AlertContext from '../../context/alert/alertContext'
// import { useParams, Link } from 'react-router-dom';

const Search = () => {
  const authContext = useContext(AuthContext)
  const apiContext = useContext(ApiContext)
  const alertContext = useContext(AlertContext)
  const { loading, contacts, company } = apiContext
  const [text, setText] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (text === '') {
      alertContext.setAlert('Please enter a value', 'light')
    } else {
      apiContext.searchDomain(text)
      apiContext.searchCompany(text)
      setText('')
    }
  }

  const onChange = (e) => setText(e.target.value)

  const { organization } = company

  // Run as soon as component loads
  useEffect(() => {
    authContext.loadUser()
    // eslint-disable-next-line
  }, [])
  // Get Api search
  // useEffect(() => {
  //   onSubmit()
  //   // eslint-disable-next-line
  // }, [])

  if (loading) return <Spinner />

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Domain...'
          value={text}
          onChange={onChange}
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

      <h1>{organization}</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Email</th>
            <th>Phone</th>
            <th>LinkedIn</th>
            <th>Twitter</th>
          </tr>
        </thead>

        {contacts.map((e, index) => {
          return (
            <Fragment key={index}>
              <tbody>
                <tr>
                  <td>{e.first_name}</td>
                  <td>{e.last_name}</td>
                  <td>{e.department}</td>
                  <td>{e.position}</td>
                  <td>{e.value}</td>
                  <td>{e.phone_number}</td>
                  <td>{e.linkedin}</td>
                  <td>{e.twitter}</td>
                </tr>
              </tbody>
            </Fragment>
          )
        })}
      </table>

      <div>
        <a href='/' className='btn btn-info btn-lg active'>
          Return to Port
        </a>
      </div>
    </div>
  )
}

export default Search
