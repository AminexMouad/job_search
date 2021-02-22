import {SET_JOB_TYPE, SET_KEYWORD} from '../constants/searchConstants';

export const setKeyword = (keyword) => async (dispatch) => {
  dispatch({type: SET_KEYWORD, payload: keyword});
};

export const setType = (type) => async (dispatch) => {
  dispatch({type: SET_JOB_TYPE, payload: type});
};
