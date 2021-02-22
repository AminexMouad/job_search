import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  geoCoderReducer,
  geoLocalisationReducer,
} from './src/reducers/geolocationReducers';
import {jobDetailReducer, jobListReducer} from './src/reducers/jobReducers';
import {searchReducers} from './src/reducers/searchReducers';
const reducer = combineReducers({
  jobList: jobListReducer,
  jobDetail: jobDetailReducer,
  geoLocation: geoLocalisationReducer,
  geoCoder: geoCoderReducer,
  search: searchReducers,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
