import React, { useReducer } from 'react';
import ApiContext from './apiContext';
import ApiReducer from './apiReducer';
import { SEARCH_DOMAIN, SET_LOADING, CLEAR_DOMAIN } from '../types';

let hunterioClientid;

if (process.env.NODE_ENV !== 'production') {
  hunterioClientid = process.env.REACT_APP_API_KEY;
} else {
  hunterioClientid = process.env.APPI_CLIENT_ID;
}

// Initial State
const ApiState = (props) => {
  document.title = 'Steadfast CMS Contact Searcher';
  const initialState = {
    contacts: [],
    contact: {},
    search: '',
    loading: false,
  };

  // Reducer
  const [state, dispatch] = useReducer(ApiReducer, initialState);

  // Search Users
  async function searchDomain(text) {
    try {
      setLoading();
      const res = await fetch(
        `https://api.hunter.io/v2/domain-search?domain=${text}&api_key=${hunterioClientid}`
      );
      const data = await res.json();

      console.log(data.data);
      dispatch({ type: SEARCH_DOMAIN, payload: data.data.emails });
    } catch (e) {
      console.log('There was a problem');
    }
  }

  // Clear Users
  const clearDomain = () => dispatch({ type: CLEAR_DOMAIN });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <ApiContext.Provider
      // Prop of value
      value={{
        contacts: state.contacts,
        contact: state.contact,
        loading: state.loading,
        searchDomain,
        clearDomain,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiState;
