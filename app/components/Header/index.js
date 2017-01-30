import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Animated
} from 'react-native';

import StyledText from 'app/components/StyledText';

const Header = (props) => (
  <StyledText weight="black" style={[styles.text, props.style || {}]}>{props.children.toUpperCase()}</StyledText>
)

// styles
const styles = StyleSheet.create({
  text : {
    backgroundColor:'transparent',
    textAlign: 'center',
    fontSize: 32,
    marginBottom: 10
  }
});


export default Header
