import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FlatList, ActivityIndicator} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import styled from 'styled-components/native';
import Input from '../components/Input';
import Card from '../components/Card';
import Wrapper from '../components/Wrapper';
import {listJobs, nextPageJobs} from '../actions/jobActions';
import {
  getCurrentPosition,
  getCountryName,
} from '../actions/geoLocationActions';
import Geolocation from '@react-native-community/geolocation';

const HomeScreen = () => {
  const [keyword, setKeyword] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();

  const jobList = useSelector((state) => state.jobList);
  const {jobs, loading} = jobList;
  const geoLocation = useSelector((state) => state.geoLocation);
  const {location} = geoLocation;
  const geoCoder = useSelector((state) => state.geoCoder);
  const {location: locationData} = geoCoder;
  useEffect(() => {
    if (location) {
      // console.log('ddd');
      // dispatch(getCountryName(location));
    } else {
      dispatch(listJobs(keyword));
      setPageNumber(pageNumber + 1);
      dispatch(getCurrentPosition());
    }
  }, [location, locationData]);
  console.log(locationData);
  const renderData = () => {
    if (!loading) {
      return (
        <FlatList
          data={jobs}
          renderItem={({item}) => {
            return <Card job={item} />;
          }}
          keyExtractor={(item, index) => `${item.id}`}
          refreshing={false}
          onRefresh={() => {
            dispatch(listJobs(keyword));
          }}
          onEndReached={() => {
            setPageNumber(pageNumber + 1);
            dispatch(listJobs(keyword, pageNumber));
          }}
          onEndReachedThreshold={0.2}
        />
      );
    } else {
      return (
        <Container>
          <ActivityIndicator size="large" color="#f3f3f5" />
        </Container>
      );
    }
  };
  return (
    <Wrapper>
      <StyledText>
        This application uses your current position for a better {'\n'}and
        accurate results.
      </StyledText>
      <Input
        value={keyword}
        onChangeText={(e) => {
          console.log(e);
          setKeyword(e);
        }}
        onSubmitEditing={() => {
          dispatch(listJobs(keyword));
        }}
      />
      <Title>Jobs for you</Title>
      {renderData()}
    </Wrapper>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text`
  font-size: ${responsiveFontSize(1.5)}px;
  margin: 10px 20px;
  color: #d8d8d8;
  text-align: center;
`;

const Title = styled.Text`
  font-size: ${responsiveFontSize(2)}px;
  margin: 10px 20px;
  color: #f3f3f5;
  font-weight: bold;
`;

export default HomeScreen;
