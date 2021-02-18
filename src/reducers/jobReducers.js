import {
  JOB_LIST_FAIL,
  JOB_LIST_REQUEST,
  JOB_LIST_SUCCESS,
  JOB_DETAILS_FAIL,
  JOB_DETAILS_SUCCESS,
  JOB_DETAILS_RESET,
  JOB_NEXT_PAGE_SUCCESS,
  JOB_NEXT_PAGE_REQUEST,
  JOB_NEXT_PAGE_FAIL,
} from '../constants/jobConstants';

export const jobListReducer = (state = {jobs: []}, action) => {
  switch (action.type) {
    case JOB_LIST_REQUEST:
      return {loading: true, jobs: []};
    case JOB_LIST_SUCCESS:
      return {loading: false, jobs: action.payload};
    case JOB_NEXT_PAGE_SUCCESS:
      console.log(action.payload);
      let objects = state.jobs;
      action.payload.data.map((job) => {
        objects = [...objects, job];
      });
      console.log(objects);
      return {loading: false, jobs: objects};
    case JOB_LIST_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

export const JobNextPageReducer = (state = {}, action) => {
  switch (action.type) {
    // case JOB_NEXT_PAGE_REQUEST:
    //   return {loading: true};
    // case JOB_NEXT_PAGE_SUCCESS:
    //   console.log(action.payload);
    //   let objects = action.payload.jobs;
    //   action.payload.data.map((job) => {
    //     objects = [...objects, job];
    //   });
    //   return {loading: false, jobs: objects};

    case JOB_NEXT_PAGE_FAIL:
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
