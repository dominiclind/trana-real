import React, { Component } from 'react';

import {
  View,
  StyleSheet
} from 'react-native';

const defaultObject = {};

import StyledText from 'app/components/StyledText';

const Paragraph = (props) => (
  <StyledText
    weight={props.weight || "book"}
    style={[styles.text, props.style || defaultObject]}>
      {props.children}
    </StyledText>
)

// styles
const styles = StyleSheet.create({
  text : {
    backgroundColor: 'transparent',
    color: '#343a40',
    fontSize: 18,
   // lineHeight: 25,
    marginBottom: 20
  }
});


export default Paragraph
