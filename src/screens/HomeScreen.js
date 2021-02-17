import React, {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {useSelector, useDispatch} from 'react-redux';
import {FlatList, Text} from 'react-native';
import styled from 'styled-components/native';
import Input from '../components/Input';
import Card from '../components/Card';
import {listJobs} from '../actions/jobActions';

const HomeScreen = () => {
  const [position, setPosition] = useState(null);

  const dispatch = useDispatch();

  const jobList = useSelector((state) => state.jobList);

  useEffect(() => {
    Geolocation.getCurrentPosition((info) => setPosition(info));

    dispatch(listJobs());
  }, []);

  const renderData = () => {
    if (!jobList.loading) {
      return (
        <FlatList
          data={jobList.jobs}
          renderItem={({item}) => {
            return <Card job={item} />;
          }}
          keyExtractor={(item, index) => `${item.id}`}
          onEndReachedThreshold={0.2}
        />
      );
    } else {
      return <Text>Loading Data...</Text>;
    }
  };

  return (
    <Wrapper>
      <StyledText>
        This application uses your current position for a better and accurate
        results
      </StyledText>
      <Input />
      <Title>Jobs for you</Title>
      {renderData()}
    </Wrapper>
  );
};
const Wrapper = styled.View`
  flex: 1;
  background-color: #06022f;

  padding: 15px;
`;

const StyledText = styled.Text`
  font-size: 14px;
  margin: 10px 20px;
  color: #d8d8d8;
`;

const Title = styled.Text`
  font-size: 19px;
  margin: 10px 20px;
  color: #f3f3f5;
  font-weight: bold;
`;

export default HomeScreen;
