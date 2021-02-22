import {
  GEOCODER_FAIL,
  GEOCODER_SUCCESS,
  GEOLOCATION_FAIL,
  GEOLOCATION_REQUEST,
  GEOLOCATION_SUCCESS,
} from '../constants/geoLocationConstants';

export const geoLocalisationReducer = (state = {}, action) => {
  switch (action.type) {
    case GEOLOCATION_REQUEST:
      return {loading: true};
    case GEOLOCATION_SUCCESS:
      return {loading: false, location: action.payload};
    case GEOLOCATION_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

export const geoCoderReducer = (state = {}, action) => {
  switch (action.type) {
    case GEOCODER_FAIL:
      return {loading: true};
    case GEOCODER_SUCCESS:
      return {loading: false, location: action.payload.data[0]};
    case GEOCODER_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};
