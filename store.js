import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {
  jobDetailReducer,
  jobListReducer,
  JobNextPageReducer,
} from './src/reducers/jobReducers';
import {
  geoCoderReducer,
  geoLocalisationReducer,
} from './src/reducers/geolocationReducers';

const reducer = combineReducers({
  jobList: jobListReducer,
  jobNextPage: JobNextPageReducer,
  jobDetail: jobDetailReducer,
  geoLocation: geoLocalisationReducer,
  geoCoder: geoCoderReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
