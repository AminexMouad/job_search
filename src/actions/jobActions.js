import axios from 'axios';
import {
  JOB_DETAILS_FAIL,
  JOB_DETAILS_REQUEST,
  JOB_DETAILS_SUCCESS,
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

export const jobDetails = (id) => async (dispatch) => {
  try {
    dispatch({type: JOB_DETAILS_REQUEST});
    const {data} = await axios.get(
      `https://jobs.github.com/positions/${id}.json?markdown=true`,
    );
    dispatch({type: JOB_DETAILS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: JOB_DETAILS_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
