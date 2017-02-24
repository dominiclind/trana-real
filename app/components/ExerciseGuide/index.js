import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import Paragraph from 'app/components/Paragraph';

class ExerciseGuide extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const { guide } = this.props;
    return (
      <View style={{flex: 1, paddingBottom: 20}}>
        <Paragraph weight="bold" style={styles.header}>GUIDE</Paragraph>
        {guide.map((item, index) => (
          <View key={index} style={{paddingHorizontal: 15}}>
            <Paragraph style={styles.nr}>{index+1}</Paragraph>
            <Paragraph style={styles.text}>{item}</Paragraph>
          </View>
        ))}
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    backgroundColor:'transparent',
  },
  header: {
    marginTop: 20,
    marginBottom: 0,
    fontSize: 14,
    color: 'rgba(0,0,0,.2)',
    textAlign: 'center',
  },
  nr: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 0,
    lineHeight: 28,
    borderRadius: 15,
    marginTop: 20
  },
  text: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 0,
    fontSize: 16,
    lineHeight: 25
  }
});


export default ExerciseGuide
