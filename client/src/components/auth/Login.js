import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = (props) => {
  // Initialize Context
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <div className='row align-items-center'>
      <div className='col-lg-7 py-3 py-md-5'>
        <h1 className='display-3'>Modernization CMS Platform</h1>
        <p className='lead text-muted'>
          Steadfast removes road blocks for sales teams by providing a cohesive
          platform that allows for online growth using modern, scalable and
          secure CMS application for business.
        </p>
      </div>
      <div className='col-lg-5 pl-lg-5 pb-3 py-lg-5'>
        <div className='form-group'>
          <div className='form-container'>
            <h1>
              Account <span className='text primary'>Login</span>
            </h1>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <label htmlFor='email'>Email Address</label>
                <input
                  type='email'
                  name='email'
                  value={email}
                  onChange={onChange}
                  autoComplete='off'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  name='password'
                  value={password}
                  onChange={onChange}
                  autoComplete='Off'
                />
              </div>
              <input
                type='submit'
                value='Login'
                className='btn btn-primary btn-block'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
