import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {GEOCODER_API} from '../../env';
import {
  GEOCODER_FAIL,
  GEOCODER_REQUEST,
  GEOCODER_SUCCESS,
  GEOLOCATION_FAIL,
  GEOLOCATION_REQUEST,
  GEOLOCATION_SUCCESS,
} from '../constants/geoLocationConstants';

export const getCurrentPosition = () => (disaptch) => {
  disaptch({type: GEOLOCATION_REQUEST});

  Geolocation.getCurrentPosition(
    (info) => {
      disaptch({
        type: GEOLOCATION_SUCCESS,
        payload: {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        },
      });
    },
    (error) => {
      disaptch({type: GEOLOCATION_FAIL, payload: error});
    },
  );
};

export const getCountryName = ({latitude, longitude}) => async (disaptch) => {
  try {
    disaptch({type: GEOCODER_REQUEST});

    const {data} = await axios.get(
      `http://api.positionstack.com/v1/reverse?access_key=${GEOCODER_API}&query=${latitude},${longitude}`,
    );

    disaptch({type: GEOCODER_SUCCESS, payload: data});
  } catch (error) {
    disaptch({type: GEOCODER_FAIL, payload: error});
  }
};
