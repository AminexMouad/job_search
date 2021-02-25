import React from 'react';
import styled from 'styled-components/native';

const Input = (props) => {
  return <StyledInput placeholder="Find your dream job" {...props} />;
};

const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: '#bbbac4',
})`
  background-color: #5c5a6c;
  font-size: 17px;
  color: #c3c2cb;
  border-radius: 15px;
  padding: 10px 15px;
`;

export default Input;
