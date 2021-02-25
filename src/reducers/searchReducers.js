import {
  SET_JOB_TYPE,
  SET_KEYWORD,
  SET_PAGE_NUMBER,
} from '../constants/searchConstants';

export const searchReducers = (
  state = {keyword: '', type: 'Full', pageNumber: 1},
  action,
) => {
  switch (action.type) {
    case SET_KEYWORD:
      return {...state, keyword: action.payload};
    case SET_JOB_TYPE:
      return {...state, type: action.payload};
    case SET_PAGE_NUMBER:
      return {...state, pageNumber: action.payload};
    default:
      return state;
  }
};
