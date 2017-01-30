import React, { Component } from 'react';

import {
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import Paragraph from 'app/components/Paragraph';
import { timeLeft } from 'app/utils/time';

class WorkoutNavbar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      time: {
        seconds: 0,
        minutes: 0
      }
    }
  }

  componentDidMount() {
    const { startDate } = this.props;
    this.tick = setInterval(() => {
      this.setState({ time : timeLeft(startDate, new Date().getTime()) });
    },100);
  }

  componentWillUnmount() {
    clearInterval(this.tick);
  }

  

  render() {
    const { startDate } = this.props;
    const { time } = this.state;

    const cleanMinutes = time.minutes < 9 ? '0' + Math.round(time.minutes) : Math.round(time.minutes);
    const cleanSeconds = time.seconds < 9 ? '0' + Math.round(time.seconds) : Math.round(time.seconds);

    return (
      <View style={ styles.component }>
        <TouchableOpacity onPress={this.props.cancelWorkout}>
          <Paragraph style={styles.btn} weight="bold">CANCEL</Paragraph>
        </TouchableOpacity>
        <View style={styles.elapsedTime}>
          {time ? <Paragraph weight="bold" style={styles.elapsedTimeText}>{cleanMinutes}:{cleanSeconds}</Paragraph> : null}
          <Paragraph weight="bold" style={styles.elapsedTimeLabel}>TIME ELAPSED</Paragraph>
        </View>
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
