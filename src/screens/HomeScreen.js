import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {
  getCountryName,
  getCurrentPosition,
} from '../actions/geoLocationActions';
import {listJobs} from '../actions/jobActions';
import Card from '../components/Card';
import Wrapper from '../components/Wrapper';
import Modal from '../components/CustomModal';
import Icon from 'react-native-vector-icons/dist/Feather';

const HomeScreen = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [modalVisible, setModalVisible] = useState(true);

  const dispatch = useDispatch();

  const emitter = new EventEmitter();

  const jobList = useSelector((state) => state.jobList);
  const {jobs, loading, loadingNext, error: errorFetching} = jobList;
  const geoLocation = useSelector((state) => state.geoLocation);
  const {location, error} = geoLocation;
  const geoCoder = useSelector((state) => state.geoCoder);
  const {location: locationData} = geoCoder;

  const search = useSelector((state) => state.search);
  const {keyword, type} = search;

  useEffect(() => {


    dispatch(getCurrentPosition());
  }, []);

  useEffect(() => {
    if (location) {
      console.log(location);
      // dispatch(getCountryName(location));
    } else if (error) {
      dispatch(listJobs());
      setPageNumber(pageNumber + 1);
    } else {
      console.log('no location');
    }
  }, [location, error]);

  useEffect(() => {
    if (locationData) {
      // dispatch(listJobs(keyword, pageNumber, locationData.region));
      setPageNumber(pageNumber + 1);
    } else {
      console.log('no data about your position');
    }
  }, [locationData]);

  const renderData = () => {
    if (!loading) {
      if (errorFetching) {
        return (
          <Container>
            <Title>{errorFetching}</Title>
          </Container>
        );
      } else {
        return (
          <FlatList
            data={jobs}
            renderItem={({item}) => {
              return <Card job={item} />;
            }}
            refreshing={loadingNext ? true : false}
            keyExtractor={(item) => `${item.id}`}
            onRefresh={() => {
              dispatch(listJobs());
            }}
            scrollEnabled={loadingNext ? false : true}
            onEndReached={() => {
              setPageNumber(pageNumber + 1);
              dispatch(listJobs(keyword, type, pageNumber));
            }}
            onEndReachedThreshold={0.2}
          />
        );
      }
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
      <Row>
        <Title>Jobs for you</Title>
        <Button onPress={() => setModalVisible(!modalVisible)}>
          <Icon name="search" color="white" size={responsiveFontSize(2.5)} />
        </Button>
      </Row>
      {renderData()}
      <Modal
        error={error}
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onPressExit={() => setModalVisible(!modalVisible)}
      />
    </Wrapper>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: ${responsiveFontSize(2.5)}px;
  margin: 5px 20px;
  color: #f3f3f5;
  font-weight: bold;
`;

const Row = styled.View`
  margin: 10px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.TouchableOpacity`
  background-color: #516add;
  padding: 10px;
  border-radius: 50px;
`;

export default HomeScreen;
