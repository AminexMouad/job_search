import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Modal, TouchableOpacity} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import styled from 'styled-components/native';
import Button from './Button';
import Input from './Input';
import Icon from 'react-native-vector-icons/dist/Feather';
import CheckBox from '@react-native-community/checkbox';
import {setKeyword, setType} from '../actions/searchActions';
import {listJobs} from '../actions/jobActions';
import {getCurrentPosition} from '../actions/geoLocationActions';
const CustomModal = (props) => {
  const [currentPosition, setcurrentPosition] = useState(false);

  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);

  const {keyword, type} = search;

  const onSubmitForm = () => {
    dispatch(listJobs(keyword, type));
  };

  console.log(type);
  return (
    <Modal {...props}>
      <ModalContainer>
        <ModalBody>
          <TouchableOpacity onPress={props.onPressExit}>
            <Icon
              name="x"
              color="white"
              size={responsiveFontSize(3.5)}
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
            {props.error ? (
              <Description>
                Please turn on your GPS for a better and accurate results.
              </Description>
            ) : (
              <>
                <CheckBox
                  disabled={false}
                  value={currentPosition}
                  tintColors={{true: '#516add'}}
                  onValueChange={(newValue) => setcurrentPosition(newValue)}
                />
                <Description>Use my current position</Description>
              </>
            )}
          </Row>
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
  font-size: ${responsiveFontSize(2.5)}px;
  text-align: center;
  font-weight: bold;
  color: #f0f3f6;
  margin: 5px 0 15px 0;
`;

const Label = styled.Text`
  color: #f0f3f6;
  font-size: ${responsiveFontSize(1.5)}px;
`;

const Description = styled.Text`
  color: #f0f3f6;
  font-size: ${responsiveFontSize(1.7)}px;
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
  font-size: ${responsiveFontSize(1.6)}px;
`;
export default CustomModal;
