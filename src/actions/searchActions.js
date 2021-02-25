import {
  SET_JOB_TYPE,
  SET_KEYWORD,
  SET_PAGE_NUMBER,
} from '../constants/searchConstants';

export const setKeyword = (keyword) => async (dispatch) => {
  dispatch({type: SET_KEYWORD, payload: keyword});
};

export const setType = (type) => async (dispatch) => {
  dispatch({type: SET_JOB_TYPE, payload: type});
};

export const setPageNumber = (page) => async (dispatch) => {
  dispatch({type: SET_PAGE_NUMBER, payload: page});
};
