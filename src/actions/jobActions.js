import axios from 'axios';
import {
  JOB_DETAILS_FAIL,
  JOB_DETAILS_REQUEST,
  JOB_DETAILS_SUCCESS,
  JOB_LIST_FAIL,
  JOB_LIST_REQUEST,
  JOB_LIST_SUCCESS,
  JOB_NEXT_PAGE_FAIL,
  JOB_NEXT_PAGE_REQUEST,
  JOB_NEXT_PAGE_SUCCESS,
} from '../constants/jobConstants';

export const listJobs = (keyword = '', pageNumber = 1, location = '') => async (
  dispatch,
) => {
  try {
    if (pageNumber === 1) {
      dispatch({type: JOB_LIST_REQUEST});
    }
    const {data} = await axios.get(
      `https://jobs.github.com/positions.json?description=${keyword}&location=${location}&page=${pageNumber}`,
    );
    if (pageNumber === 1) {
      dispatch({type: JOB_LIST_SUCCESS, payload: data});
    } else {
      dispatch({type: JOB_NEXT_PAGE_SUCCESS, payload: {data}});
    }
  } catch (error) {
    dispatch({
      type: JOB_LIST_FAIL,
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// export const nextPageJobs = (
//   keyword = '',
//   pageNumber = 2,
//   location = '',
// ) => async (dispatch, getState) => {
//   try {
//     dispatch({type: JOB_NEXT_PAGE_REQUEST});

//     const {
//       jobList: {jobs},
//     } = getState();
//     const {data} = await axios.get(
//       `https://jobs.github.com/positions.json?description=${keyword}&location=${location}&page=${pageNumber}`,
//     );
//     console.log(data);
//     dispatch({type: JOB_NEXT_PAGE_SUCCESS, payload: {jobs, data}});
//   } catch (error) {
//     dispatch({
//       type: JOB_NEXT_PAGE_FAIL,
//       payload: error.response.data.message
//         ? error.response.data.message
//         : error.message,
//     });
//   }
// };

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
      payload: error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
