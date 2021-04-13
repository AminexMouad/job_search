import React, {useState} from 'react';
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import HTML from 'react-native-render-html';
import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {client} from '../api/client';
import Wrapper from '../components/Wrapper';

const DetailScreen = ({route, navigation}) => {
  const regExp = /(href=")(.*?)(?=\")/;
  const [loadingImage, setLoadingImage] = useState(true);
  const {id} = route.params;
  const contentWidth = useWindowDimensions().width;

  const dispatch = useDispatch();

  // const jobDetail = useSelector((state) => state.jobDetail);
  // const {loading, job} = jobDetail;

  // useEffect(() => {
  //   dispatch(jobDetails(id));
  //   return () => {
  //     console.log('Component did umount');
  //     dispatch({type: JOB_DETAILS_RESET});
  //   };
  // }, []);

  const queryInfo = useQuery(`job-${id}`, async () => {
    return await client.get(`/positions/${id}.json`);
  });

  const {isLoading, data} = queryInfo;

  return (
    <Wrapper>
      {isLoading ? (
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
              resizeMode="contain"
              source={
                data.data.company_logo
                  ? {uri: data.data.company_logo}
                  : require('../assets/company.png')
              }
            />
          </Container>

          <Container>
            <Title>{data.data.title}</Title>
            <Location>{data.data.location}</Location>
          </Container>
          <TypeContainer>
            <Label>Company Name : </Label>
            <Description>{data.data.company}</Description>
          </TypeContainer>
          <TypeContainer>
            <Label>Type :</Label>
            <Tag>{data.data.type}</Tag>
          </TypeContainer>
          <Container>
            <Label>Description :</Label>
            <HTML
              tagsStyles={{
                h2: {color: '#516add', fontSize: 20},
                h3: {color: '#516add', fontSize: 18},
                p: {
                  color: '#f7f7f9',
                  fontSize: 16,
                  lineHeight: 35,
                },
                li: {color: '#f7f7f9', fontSize: 16},
                strong: {color: '#516add'},
              }}
              alterNode={(node) => {
                const {name, parent} = node;
                if (name === 'li') {
                  node.tagName = 'p';
                  return node;
                }
              }}
              source={{html: `${data.data.description}`}}
              contentWidth={contentWidth}
            />
          </Container>
          <Container>
            <ButtonContainer
              onPress={async () =>
                await Linking.openURL(regExp.exec(data.data.how_to_apply)[2])
              }>
              <ButtonText>Apply Now</ButtonText>
            </ButtonContainer>
          </Container>
        </ScrollView>
      )}
    </Wrapper>
  );
};

const Image = styled.Image`
  height: 100px;
  width: 50%;
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
  font-size: 25px;
  margin: 10px 0;
  color: #fff;
  font-weight: bold;
  text-align: center;
  margin: 10px 0;
`;

const Location = styled.Text`
  color: #a1abb5;
  font-weight: 600;
  font-size: 20px;
  text-align: center;
`;

const Label = styled.Text`
  font-size: 20px;
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
  font-size: 18px;
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
  font-size: 16px;
`;

const Description = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export default DetailScreen;
