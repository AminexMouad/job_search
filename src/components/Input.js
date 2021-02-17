import React from 'react';
import styled from 'styled-components/native';

import {View, Text, TextInput} from 'react-native';

const Input = () => {
  return (
    <View>
      <StyledInput placeholder="Find your dream job" />
    </View>
  );
};

const StyledInput = styled.TextInput.attrs({
  placeholderTextColor: '#bbbac4',
})`
  background-color: #5c5a6c;
  color: #c3c2cb;
  border-radius: 15px;
  padding: 10px 15px;
`;

export default Input;
