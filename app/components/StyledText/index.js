import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Animated
} from 'react-native';

const defaultObject = {};

const getFontName = (weight = false) => {
  let fontFamily = 'Circular';
  switch(weight) {
    case 'book':
      return 'Circular-Book';
    case 'medium':
      return 'Circular-Medium';
    case 'bold':
      return 'Circular-Bold';
    case 'black':
      return 'Circular-Black'
    default:
      return fontFamily;
  }
}

const StyledText = (props) => (
  <Text
    style={[
      styles.text,
      { fontFamily: getFontName(props.weight) },
      props.style || defaultObject
    ]}
  >
    {props.children}
  </Text> 
)


// styles
const styles = StyleSheet.create({
  text : {
    fontFamily: 'Circular',
    color: '#343a40'
  }
});

export default StyledText;
