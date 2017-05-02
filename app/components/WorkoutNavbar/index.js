import React, { Component } from 'react';

import {
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import Paragraph from 'app/components/Paragraph';

class WorkoutNavbar extends Component {

  render() {
    return (
      <View style={ styles.component }>
        <TouchableOpacity onPress={this.props.cancelWorkout}>
          <Paragraph style={styles.btn} weight="bold">CANCEL</Paragraph>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.endWorkout}>
          <Paragraph style={styles.btn} weight="bold">FINISH</Paragraph>
        </TouchableOpacity>
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    backgroundColor:'transparent',
    borderTopWidth: 2,
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  btn: {
    fontSize: 16,
    marginBottom: 0,
    backgroundColor: 'transparent'
  },
  elapsedTimeText: {
    marginBottom: 0,
    fontSize: 26,
    textAlign: 'center'
  },
  elapsedTimeLabel: {
    marginBottom: 0,
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'center'

  }
});


export default WorkoutNavbar
