import CheckBox from '@react-native-community/checkbox';
import React, {useState, useEffect} from 'react';
import {Modal, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {getCountryName} from '../actions/geoLocationActions';
import {listJobs} from '../actions/jobActions';
import {setKeyword, setType, setPageNumber} from '../actions/searchActions';
import { useJobs } from '../api';
import Button from './Button';
import Input from './Input';
const CustomModal = (props) => {
  const [currentPosition, setcurrentPosition] = useState(false);

  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);

  const geoLocation = useSelector((state) => state.geoLocation);
  const {location, error} = geoLocation;
  const geoCoder = useSelector((state) => state.geoCoder);
  const {location: position, loading, error: errorGeocoder} = geoCoder;

  const {keyword, type} = search;

  const onSubmitForm = () => {
    dispatch(setPageNumber(1));

    useJobs(123)
    // if (currentPosition && position) {
    //   dispatch(listJobs(keyword, type, 1, position.country));
    // } else {
    //   dispatch(listJobs(keyword, type, 1));
    // }
  };

  return (
    <Modal {...props}>
      <ModalContainer>
      <ModalBody>
          <TouchableOpacity onPress={props.onPressExit}>
            <Icon
              name="x"
              color="white"
              size={35}
              style={{alignSelf: 'flex-end'}}></Icon>
          </TouchableOpacity>
          <Title>Refine your search</Title>

          <Input
            value={keyword}
            onChangeText={(e) => {
              dispatch(setKeyword(e));
            }}
          />
          <Row>
            <Tag
              color={type === 'Full' && '#516add'}
              onPress={() => dispatch(setType('Full'))}>
              <Description>Full Time</Description>
            </Tag>
            <Tag
              color={type === 'Part' && '#516add'}
              onPress={() => dispatch(setType('Part'))}>
              <Description>Part Time</Description>
            </Tag>
          </Row>

          <Row>
            {error ? (
              <Description>
                Please turn on your GPS for a better and accurate results.
              </Description>
            ) : (
              <>
                <CheckBox
                  disabled={false}
                  value={currentPosition}
                  tintColors={{true: '#516add'}}
                  onValueChange={(newValue) => {
                    setcurrentPosition(newValue);
                    dispatch(getCountryName(location));
                  }}
                />
                <Description>Use my current position</Description>
              </>
            )}
          </Row>
          {currentPosition && (
            <Row>
              {loading ? (
                <Description>Getting your current Position....</Description>
              ) : errorGeocoder ? (
                <Description>{errorGeocoder} </Description>
              ) : (
                <Description>
                  Your current position :{' '}
                  {position.region + ' - ' + position.country}
                </Description>
              )}
            </Row>
          )}

          <Button
            label="Search"
            width="100%"
            onPress={() => {
              onSubmitForm();
              props.onPressExit();
            }}
          />
        </ModalBody>
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalBody = styled.View`
  background-color: #353066;
  width: 85%;
  height: auto;
  padding: 10px;
  border-radius: 15px;
`;

const Title = styled.Text`
  font-size: 23px;
  text-align: center;
  font-weight: bold;
  color: #f0f3f6;
  margin: 5px 0 15px 0;
`;

const Description = styled.Text`
  color: #f0f3f6;
  font-size: 16px;
`;

const Row = styled.View`
  margin: 10px 0;
  flex-direction: row;
  align-items: center;
`;

const Tag = styled.TouchableOpacity`
  background-color: ${(props) => props.color || '#1f1c3d'};
  color: white;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 5px;
  margin-left: 10px;
`;
export default CustomModal;
