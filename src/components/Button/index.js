import React from 'react';
import {TouchableOpacity} from 'react-native'

const Button = ({children, handler, buttonStyle}) => {
  return (
    <TouchableOpacity
      onPress={handler}
      style={buttonStyle}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Button;
