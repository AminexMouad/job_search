import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';

const Card = ({job}) => {
  return (
    <StyledView>
      <Container>
        <Title>{job.title}</Title>
        <Date>4d</Date>
      </Container>
      <CompanyName>
        {job.company} - {job.location}
      </CompanyName>
      <Tags>
        <Tag>{job.type}</Tag>
        <Button>More Infos</Button>
      </Tags>
    </StyledView>
  );
};

const StyledView = styled.TouchableOpacity`
  background-color: #1f1c3d;
  border-radius: 15px;
  padding: 15px;
  margin: 5px 0;
`;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Tags = styled.View`
  display: flex;
  flex-direction: row;
  margin: 5px 0;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.Text`
  color: #f3f3f5;
  font-weight: bold;
  font-size: 17px;
`;
const CompanyName = styled.Text`
  color: #87a1bb;
  font-weight: 600;
  font-size: 15px;
`;
const Tag = styled.Text`
  background-color: #5069da;
  color: white;
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
`;

const Date = styled.Text`
  color: #87a1bb;
  font-weight: 700;
  font-size: 13px;
`;

const Button = styled.Text`
  color: #87a1bb;
  text-decoration: underline;
`;

export default Card;
