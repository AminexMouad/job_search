import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  Text,
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
  const [url, setUrl] = useState('');
  const {id} = route.params;
  const description = `<p>#loveyourjob #münchen</p> <h2>You will</h2> <ul> <li>Develop software solutions by studying the requirements, system and data flows, processes and investigate the problem areas by following the software development lifecycle</li> <li>Document the developed solutions by providing documentation, diagrams, flow charts, code comment and clear code</li> <li>Ensure compliance with the system architecture of all Java systems and applications</li> <li>Analyze operational risks in the Linux based software infrastructure (resource bottlenecks, vulnerabilities, errors) and develop appropriate countermeasures</li> <li>Provide support to software engineers to deliver the software solutions that fulfill the functional requirements and as well the non-functional requirements</li> <li>Work independent on the tasks allocated</li> </ul> <h2>You have</h2> <ul> <li>University degree in computer science, mathematics, natural sciences or engineering</li> <li>Several years (4+) of software development experience in the Linux environment and in the JEE environment</li> <li>In-depth knowledge of EJB3, JPA, REST, Hibernate, Spring, JSF, Vaadin is beneficial and application server knowledge (Tomcat, JBoss, Weblogic or Glassfish)</li> <li>Very good knowledge of SQL, Linux and script language as well as experience in database design</li> <li>Very good knowledge of IT security (especially web applications)</li> <li>Experience with the Unix based systems and desirable good knowledge of the banking industry</li> </ul> <h2>We offer</h2> <ul> <li>An attractive compensation package</li> <li>Company pension</li> <li>Opportunity to work from Home Office</li> <li>A versatile Development programme</li> <li>Water and Coffee for free</li> <li>(Inter-)national career oportunities at the BNP Paribas Group</li> <li>Subsidy to ÖPNV, Car- &amp; Bike- LeasingZuschuss zu ÖPNV, Car- &amp; Bike- Leasing</li> </ul> <h2>Wer wir sind</h2> <p>Consors Finanz ist Teil der BNP Paribas S.A. in Deutschland und hat ca. 1500 Mitarbeitende an fünf Standorten. BNP Paribas S.A. ist eine führende internationale Bank und in 73 Ländern mit 200.000 Mitarbeitenden vertreten. Consors Finanz BNP Paribas steht für finanzielle Selbstbestimmung in jeder Lebenssituation.</p> <p>Wir sind einer der führenden Anbieter für Konsumentenkredite in Deutschland und bieten Finanzierungs- und Versicherungslösungen, die sich an die Bedürfnisse unserer Kundinnen und Kunden anpassen. Ob dynamische Kreditrahmen, individuelle Finanzierungen oder flexible Kartenprodukte – mit dem digitalen Banking von Consors Finanz BNP Paribas nehmen Kundinnen und Kunden ihre Liquidität selbst in die Hand. Wir setzen dabei auf innovative Technologien, höchste Sicherheitsstandards und eine verantwortungsvolle Kreditvergabe.</p> <h2>Join us!</h2> <p>We are looking forward to your application via the <strong>"Application"</strong> form</p> <p>Your contact: Ralph Ullmann</p> <p>Telefon: 089/ 5511 333783</p> <p><a href="https://www.consorsfinanz.de/karrier">https://www.consorsfinanz.de/karrier</a></p> <p><a href="https://vonq.io/2Nu2YPC">Click here for the application form!</a></p> `;
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
  const regExp = /(href=")(.*?)(?=\")/;
  console.log(jobDetail);
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
            <Image
              resizeMode="contain"
              source={{
                uri: job.company_logo
                  ? job.company_logo
                  : 'https://www.stampaprint.fr/blog/wp-content/uploads/2016/06/google-logo-lettera-2016.jpg',
              }}
            />
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
                  p: {
                    color: '#f7f7f9',
                    fontSize: responsiveFontSize(1.78),
                    lineHeight: 35,
                  },
                  li: {color: '#f7f7f9', fontSize: responsiveFontSize(1.78)},
                  strong: {color: '#516add'},
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
