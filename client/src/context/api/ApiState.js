import React, { useReducer } from 'react'
import ApiContext from './apiContext'
import ApiReducer from './apiReducer'
import {
  SEARCH_DOMAIN,
  SEARCH_COMPANY,
  SET_LOADING,
  CLEAR_DOMAIN,
} from '../types'

const url = 'https://api.hunter.io/v2/domain-search?domain='

let hunterioClientid

if (process.env.NODE_ENV !== 'production') {
  hunterioClientid = process.env.REACT_APP_API_KEY
} else {
  hunterioClientid = process.env.REACT_APP_API_KEY
}

const ApiState = (props) => {
  document.title = 'Steadfast CMS Contact Searcher'
  const initialState = {
    contacts: [],
    company: {},
    loading: false,
  }
  // Reducer
  const [state, dispatch] = useReducer(ApiReducer, initialState)

  // Search Users
  const searchDomain = async (text) => {
    try {
      setLoading()
      const response = await fetch(`${url}${text}&api_key=${hunterioClientid}`)
      const data = await response.json()

      dispatch({ type: SEARCH_DOMAIN, payload: data.data.emails })
    } catch (e) {
      console.log('There was a problem')
    }
  }
  // Search Users
  const searchCompany = async (text) => {
    try {
      setLoading()
      const response = await fetch(`${url}${text}&api_key=${hunterioClientid}`)
      const data = await response.json()

      console.log(data.data)
      dispatch({ type: SEARCH_COMPANY, payload: data.data })
    } catch (e) {
      console.log('There was a problem')
    }
  }

  // useEffect(() => {
  //   searchDomain()
  // }, [])

  // Clear Users
  const clearDomain = () => dispatch({ type: CLEAR_DOMAIN })

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING })

  return (
    <ApiContext.Provider
      // Prop of value
      value={{
        contacts: state.contacts,
        company: state.company,
        loading: state.loading,
        searchDomain,
        searchCompany,
        clearDomain,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  )
}
export default ApiState
