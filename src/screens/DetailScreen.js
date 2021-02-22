import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import HTML from 'react-native-render-html';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {jobDetails} from '../actions/jobActions';
import Wrapper from '../components/Wrapper';
import {JOB_DETAILS_RESET} from '../constants/jobConstants';

const DetailScreen = ({route, navigation}) => {
  const regExp = /(href=")(.*?)(?=\")/;
  const [loadingImage, setLoadingImage] = useState(true);
  const {id} = route.params;
  const contentWidth = useWindowDimensions().width;

  const dispatch = useDispatch();

  const jobDetail = useSelector((state) => state.jobDetail);
  const {loading, job} = jobDetail;

  useEffect(() => {
    dispatch(jobDetails(id));
    return () => {
      console.log('Component did umount');
      dispatch({type: JOB_DETAILS_RESET});
    };
  }, []);

  return (
    <>
      <Wrapper>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color="#f3f3f5" />
          </View>
        ) : (
          <ScrollView>
            <Container>
              {loadingImage && (
                <ActivityIndicator
                  size="large"
                  color="#f3f3f5"
                  style={{alignSelf: 'center', justifySelf: 'center'}}
                />
              )}

              <Image
                onLoadStart={(e) => setLoadingImage(true)}
                onLoadEnd={() => setLoadingImage(false)}
                defaultSource={require('../assets/company.png')}
                source={
                  job.company_logo
                    ? {uri: job.company_logo}
                    : require('../assets/company.png')
                }
              />
            </Container>

            <Container>
              <Title>{job.title}</Title>
              <Location>{job.location}</Location>
            </Container>
            <TypeContainer>
              <Label>Company Name : </Label>
              <Description>{job.company}</Description>
            </TypeContainer>
            <TypeContainer>
              <Label>Type :</Label>
              <Tag>{job.type}</Tag>
            </TypeContainer>
            <Container>
              <Label>Description :</Label>
              <HTML
                tagsStyles={{
                  h2: {color: '#516add', fontSize: responsiveFontSize(2)},
                  h3: {color: '#516add', fontSize: responsiveFontSize(1.9)},
                  p: {
                    color: '#f7f7f9',
                    fontSize: responsiveFontSize(1.78),
                    lineHeight: 35,
                  },
                  li: {color: '#f7f7f9', fontSize: responsiveFontSize(1.78)},
                  strong: {color: '#516add'},
                }}
                alterNode={(node) => {
                  const {name, parent} = node;
                  if (name === 'li') {
                    node.tagName = 'p';
                    return node;
                  }
                }}
                source={{html: `${job.description}`}}
                contentWidth={contentWidth}
              />
            </Container>
            <Container>
              <ButtonContainer
                onPress={async () =>
                  await Linking.openURL(regExp.exec(job.how_to_apply)[2])
                }>
                <ButtonText>Apply Now</ButtonText>
              </ButtonContainer>
            </Container>
          </ScrollView>
        )}
      </Wrapper>
    </>
  );
};

const Image = styled.Image`
  height: 100px;
  width: 100px;
  align-self: center;
`;

const TypeContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;

const Container = styled.View`
  justify-content: center;
`;

const Title = styled.Text`
  font-size: ${responsiveFontSize(2)}px;
  margin: 10px 0;
  color: #fff;
  font-weight: bold;
  text-align: center;
  margin: 10px 0;
`;

const Location = styled.Text`
  color: #a1abb5;
  font-weight: 600;
  font-size: ${responsiveFontSize(2)}px;
  text-align: center;
`;

const Label = styled.Text`
  font-size: ${responsiveFontSize(1.9)}px;
  margin: 10px 0;
  color: #516add;
  font-weight: bold;
`;

const Tag = styled.Text`
  background-color: #1f1c3d;
  color: white;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 5px;
  margin-left: 10px;
  font-size: ${responsiveFontSize(1.6)}px;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: #4155b1;
  border-radius: 50px;
  padding: 10px;
  width: 50%;
  align-self: center;
  margin: 15px 0;
`;

const ButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-weight: bold;
  font-size: ${responsiveFontSize(1.5)}px;
`;

const Description = styled.Text`
  font-size: ${responsiveFontSize(1.6)}px;
  color: #fff;
`;

export default DetailScreen;
