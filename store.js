import {createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {jobListReducer} from './src/reducers/jobReducers';

const reducer = combineReducers({
  jobList: jobListReducer,
});

const initialState = {};

const middleware = [thunk];



const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
