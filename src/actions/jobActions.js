import axios from 'axios';
import {
  JOB_DETAILS_FAIL,
  JOB_DETAILS_REQUEST,
  JOB_DETAILS_SUCCESS,
  JOB_LIST_FAIL,
  JOB_LIST_REQUEST,
  JOB_LIST_SUCCESS,
  JOB_NEXT_PAGE_REQUEST,
  JOB_NEXT_PAGE_SUCCESS,
} from '../constants/jobConstants';

export const listJobs = (
  keyword = '',
  jobType = false,
  pageNumber = 1,
  location = '',
) => async (dispatch) => {
  const config = {
    timeout: 300,
  };

  try {
    if (pageNumber === 1) {
      dispatch({type: JOB_LIST_REQUEST});
    } else {
      dispatch({type: JOB_NEXT_PAGE_REQUEST});
    }
    const {data} = await axios.get(
      `https://jobs.github.com/positions.json?description=${keyword}&full_time=${
        jobType === 'Full' ? true : false
      }&location=${location}&page=${pageNumber}`,
      config,
    );
    console.log(
      `https://jobs.github.com/positions.json?description=${keyword}&full_time=${
        jobType === 'Full' ? true : false
      }&location=${location}&page=${pageNumber}`,
    );
    if (pageNumber === 1) {
      dispatch({type: JOB_LIST_SUCCESS, payload: data});
    } else {
      dispatch({type: JOB_NEXT_PAGE_SUCCESS, payload: data});
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: JOB_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const jobDetails = (id) => async (dispatch) => {
  try {
    dispatch({type: JOB_DETAILS_REQUEST});
    const {data} = await axios.get(
      `https://jobs.github.com/positions/${id}.json`,
    );
    dispatch({type: JOB_DETAILS_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: JOB_DETAILS_FAIL,
      payload: error.message,
    });
  }
};
