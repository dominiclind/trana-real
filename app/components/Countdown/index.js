import React, { Component } from 'react';

import {
  View,
  StyleSheet
} from 'react-native';

import StyledText from 'app/components/StyledText';


class Countdown extends Component {

  constructor(props) {
    super(props)

    this.state = {
      time : props.time
    }
  }

  componentDidMount() {
    this.startTimer();
  }

  resetTimer() {
    clearInterval(this.tick);
    this.setState({ time: this.props.time });
    this.startTimer();
  }

  startTimer(){
    this.tick = setInterval(() => {
      if (this.state.time <= this.props.time && this.state.time > 0) {
        this.setState({ time : this.state.time - 1 });
      } else {
        clearInterval(this.tick);
        this.props.onFinish();
      }
    }, 1000);
  }

  addLeadingZero(number) {
    if (number < 10) {
      return '0'+ number
    } else {
      return number
    }
  }

  render() { 
    const { time } = this.state;
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;

    return (
      <View style={ styles.component }>
        <StyledText weight="bold" style={styles.label}>REST</StyledText>
        <StyledText onPress={() => this.resetTimer() } style={styles.text}>{this.addLeadingZero(minutes)}:{this.addLeadingZero(seconds)}</StyledText>
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    backgroundColor:'blue',
    alignItems: 'center'
  },
  text: {
    fontSize: 100,
    lineHeight: 100,
    height: 80,
    backgroundColor: 'transparent',
    color: 'white',
    margin: 5
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white'
  }
});


export default Countdown
