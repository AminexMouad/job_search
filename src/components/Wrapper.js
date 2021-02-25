import React from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components/native';

const Wrapper = ({children}) => {
  return (
    <StyleSafeAreaView>
      <StatusBar animated={true} backgroundColor="#06022f" />
      <Container>{children}</Container>
    </StyleSafeAreaView>
  );
};
const Container = styled.View`
  flex: 1;
  background-color: #06022f;
  padding: 5px 15px 15px 15px;
`;

const StyleSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: #06022f;
`;

export default Wrapper;
