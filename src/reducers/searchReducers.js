import {SET_JOB_TYPE, SET_KEYWORD} from '../constants/searchConstants';

export const searchReducers = (state = {keyword: '', type: 'Full'}, action) => {
  switch (action.type) {
    case SET_KEYWORD:
      return {...state, keyword: action.payload};
    case SET_JOB_TYPE:
      return {...state, type: action.payload};
    default:
      return state;
  }
};
