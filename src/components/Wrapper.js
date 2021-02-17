import React from 'react';
import styled from 'styled-components/native';

const Wrapper = ({children}) => {
  return <Container>{children}</Container>;
};
const Container = styled.View`
  flex: 1;
  background-color: #06022f;
  padding: 15px;
`;

export default Wrapper;
