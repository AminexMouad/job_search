import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text} from 'react-native';
import {useQuery} from 'react-query';
import Icon from 'react-native-vector-icons/dist/Feather';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {getCurrentPosition} from '../actions/geoLocationActions';
import {listJobs} from '../actions/jobActions';
import {setPageNumber} from '../actions/searchActions';
import Card from '../components/Card';
import Modal from '../components/CustomModal';
import Wrapper from '../components/Wrapper';

import {useJobs} from '../api';

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [jobs, setJobs] = useState([]);
  const dispatch = useDispatch();

  // const jobList = useSelector((state) => state.jobList);
  // const {jobs, loading, loadingNext, error: errorFetching} = jobList;
  const geoLocation = useSelector((state) => state.geoLocation);
  const {location, error} = geoLocation;
  const search = useSelector((state) => state.search);
  const {keyword, type, pageNumber} = search;

  // useEffect(() => {
  //   dispatch(getCurrentPosition());
  // }, []);

  // useEffect(() => {
  //   if (location) {
  //     console.log(location);
  //   } else if (error) {
  //     dispatch(listJobs());
  //     dispatch(setPageNumber(pageNumber + 1));
  //   } else {
  //     dispatch(listJobs());
  //     console.log('no location');
  //   }
  // }, [location, error]);

  const queryInfo = useJobs();

  if (queryInfo.data) {
    console.log('data jat', queryInfo.data);
  }

  const renderData = () => {
    if (queryInfo.isLoading) {
      return (
        <Container>
          <ActivityIndicator size="large" color="#f3f3f5" />
        </Container>
      );
    } else if (queryInfo.isError) {
      return (
        <Container>
          <Title align="center">{queryInfo.error.message}</Title>
        </Container>
      );
    }
    return (
      <FlatList
        data={queryInfo.data.data}
        renderItem={({item}) => {
          return <Card job={item} />;
        }}
        ListEmptyComponent={() => (
          <Container>
            <Title>There are no job available.</Title>
          </Container>
        )}
        // refreshing={loadingNext ? true : false}
        keyExtractor={(item, index) => `${index}`}
        // onRefresh={() => {
        //   dispatch(listJobs());
        // }}
        // scrollEnabled={loadingNext ? false : true}
        // onEndReached={() => {
        //   dispatch(setPageNumber(pageNumber + 1));
        //   dispatch(listJobs(keyword, type, pageNumber + 1));
        // }}
        onEndReachedThreshold={0.1}
      />
    );

    // if (!loading) {
    //   if (errorFetching) {
    //     return (
    //       <Container>
    //         <Title>{errorFetching}</Title>
    //       </Container>
    //     );
    //   } else {
    //     return (
    //       <FlatList
    //         data={jobs}
    //         renderItem={({item}) => {
    //           return <Card job={item} />;
    //         }}
    //         ListEmptyComponent={() => (
    //           <Container>
    //             <Title>There are no job available.</Title>
    //           </Container>
    //         )}
    //         refreshing={loadingNext ? true : false}
    //         keyExtractor={(item, index) => `${index}`}
    //         onRefresh={() => {
    //           dispatch(listJobs());
    //         }}
    //         scrollEnabled={loadingNext ? false : true}
    //         onEndReached={() => {
    //           dispatch(setPageNumber(pageNumber + 1));
    //           dispatch(listJobs(keyword, type, pageNumber + 1));
    //         }}
    //         onEndReachedThreshold={0.1}
    //       />
    //     );
    //   }
    // } else {
    //   return (
    //     <Container>
    //       <ActivityIndicator size="large" color="#f3f3f5" />
    //     </Container>
    //   );
    // }
  };

  return (
    <Wrapper>
      <Row>
        <Title>Jobs for you</Title>
        <Button onPress={() => setModalVisible(!modalVisible)}>
          <Icon name="search" color="white" size={22} />
        </Button>
      </Row>
      {renderData()}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(!modalVisible)}
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
  font-size: 25px;
  margin: 5px 20px;
  color: #f3f3f5;
  font-weight: bold;
  text-align: ${(props) => props.align || 'left'};
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
