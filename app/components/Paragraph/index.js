import React, { Component } from 'react';

import {
  View,
  StyleSheet
} from 'react-native';

import StyledText from 'app/components/StyledText';

const Paragraph = (props) => (
  <StyledText
    weight={props.weight || "book"}
    style={[styles.text, props.style || {}]}>
      {props.children}
    </StyledText>
)

// styles
const styles = StyleSheet.create({
  text : {
    backgroundColor:'transparent',
    fontSize: 18,
   // lineHeight: 25,
    marginBottom: 20
  }
});


export default Paragraph
