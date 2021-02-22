import {
  JOB_DETAILS_FAIL,
  JOB_DETAILS_RESET,
  JOB_DETAILS_SUCCESS,
  JOB_LIST_FAIL,
  JOB_LIST_REQUEST,
  JOB_LIST_SUCCESS,
  JOB_NEXT_PAGE_REQUEST,
  JOB_NEXT_PAGE_SUCCESS,
} from '../constants/jobConstants';

export const jobListReducer = (state = {jobs: []}, action) => {
  switch (action.type) {
    case JOB_LIST_REQUEST:
      return {loading: true, jobs: []};
    case JOB_NEXT_PAGE_REQUEST:
      return {...state, loadingNext: true};
    case JOB_LIST_SUCCESS:
      return {loading: false, jobs: action.payload};
    case JOB_NEXT_PAGE_SUCCESS:
      let objects = state.jobs;
      action.payload.map((job) => {
        objects = [...objects, job];
      });
      console.log(objects);
      return {loadingNext: false, jobs: objects};
    case JOB_LIST_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

export const jobDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case JOB_LIST_REQUEST:
      return {loading: true};
    case JOB_DETAILS_SUCCESS:
      return {loading: false, job: action.payload};
    case JOB_DETAILS_FAIL:
      return {loading: false, error: action.payload};
    case JOB_DETAILS_RESET:
      return {loading: true};
    default:
      return state;
  }
};
