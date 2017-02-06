import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Paragraph from 'app/components/Paragraph';


class FavoriteStar extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.component}>
        <Paragraph style={[styles.star]}>⭐</Paragraph>
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component: {
    height: 30,
    width: 30,
    alignItems: 'center',
    backgroundColor:'transparent',
    // marginHorizontal: 20,
  },
  star: {
    fontSize: 22,
    lineHeight: 30
    //lineHeight: 40
  }
});


export default FavoriteStar
