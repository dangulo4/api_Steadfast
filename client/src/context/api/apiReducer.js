import { SEARCH_DOMAIN, SET_LOADING, CLEAR_DOMAIN } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SEARCH_DOMAIN:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case CLEAR_DOMAIN:
      return {
        ...state,
        contacts: [],
        loading: false,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
