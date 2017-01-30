import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import { AnimatedCircularProgress } from 'react-native-circular-progress';


class CircularProgress extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const { rounds = 4, total = 6 } = this.props;
    const progress = Math.round(rounds / total * 100);
    return (
      <View style={styles.component}>
        <AnimatedCircularProgress
          size={60}
          width={5}
          fill={progress}
          tintColor="white"
          backgroundColor="rgba(255,255,255,0.15)"
          rotation={360}
          >
          {
            (fill) => (
              <Text style={styles.points}>
                { rounds }
              </Text>
            )
          }
        </AnimatedCircularProgress>
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    backgroundColor:'transparent',
    width: 60,
    height: 60
  },
  points: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 15,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'white',
    fontSize:22,
    color:'white',
    fontWeight:'500'
  },
});


export default CircularProgress
