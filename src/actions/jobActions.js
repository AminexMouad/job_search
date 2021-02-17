import axios from 'axios';
import {
  JOB_LIST_FAIL,
  JOB_LIST_REQUEST,
  JOB_LIST_SUCCESS,
} from '../constants/jobConstants';

export const listJobs = (keyword = '', pageNumber = '') => async (dispatch) => {
  try {
    dispatch({type: JOB_LIST_REQUEST});
    const {data} = await axios.get(`https://jobs.github.com/positions.json`);
    dispatch({type: JOB_LIST_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: JOB_LIST_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
