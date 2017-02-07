import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Animated
} from 'react-native';


class StyledText extends Component {
  render() {
    const { weight = false } = this.props;

    //
    // Circular
    // Circular-Book
    // Circular-BookItalic
    // Circular-Medium
    // Circular-MediumItalic
    // Circular-Bold
    // Circular-BoldItalic
    // Circular-Black
    // Circular-BlackItalic
    //
    //
    let fontFamily = 'Circular';
    switch(weight) {
      case 'book':
        fontFamily = 'Circular-Book';
        break;
      case 'medium':
        fontFamily = 'Circular-Medium';
        break;
      case 'bold':
        fontFamily = 'Circular-Bold';
        break;
      case 'black':
        fontFamily = 'Circular-Black';
        break;
      default:
        fontFamily = 'Circular';
        break;
    }

    return (
      <Text
        style={[
          styles.text,
          { fontFamily },
          this.props.style || {}
        ]}>
          {this.props.children}
        </Text>  
    )
  }
}


// styles
const styles = StyleSheet.create({
  text : {
    fontFamily: 'Circular',
    color: '#343a40'
  }
});


export default Animated.createAnimatedComponent(StyledText);
