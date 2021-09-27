import {
  SEARCH_DOMAIN,
  SEARCH_COMPANY,
  SET_LOADING,
  CLEAR_DOMAIN,
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case SEARCH_DOMAIN:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      }
    case SEARCH_COMPANY:
      return {
        ...state,
        company: action.payload,
        loading: false,
      }
    case CLEAR_DOMAIN:
      return {
        ...state,
        contacts: [],
        company: {},
        loading: false,
      }

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}
