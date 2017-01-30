import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Animated
} from 'react-native';

class TabBar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      fullscreen : new Animated.Value(0)
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.fullscreen !== this.props.fullscreen) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { fullscreen = false } = this.props;

    if (fullscreen) {
      Animated.spring(this.state.fullscreen, {
        toValue: 1,
        friction: 6,
        tension: 10
      }).start();
    } else {
       Animated.spring(this.state.fullscreen, {
        toValue: 0,
        friction: 6,
        tension: 10
      }).start();
    }
  }

  render() {
    const { fullscreen = false } = this.props;

    const animPos = this.state.fullscreen.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 40]
    });
    const animOpacity = this.state.fullscreen.interpolate({
      inputRange: [0,.6, 1],
      outputRange: [1, 0, 0]
    });

    return (
      <Animated.View
        style={[
          styles.component,
          {
            opacity: animOpacity,
            transform: [
              {
                translateY: animPos
              }
            ]
          },
          !fullscreen ? { zIndex: 10 } : {}
        ]}
      >
        <Text style={styles.icon} onPress={() => console.log('press tabbtn1')}>✊</Text>
        <Text style={styles.icon} onPress={() => console.log('press tabbtn2')}>😵</Text>
        <Text style={styles.icon} onPress={() => console.log('press tabbtn3')}>😎</Text>
        <Text style={styles.icon} onPress={() => console.log('press tabbtn4')}>💅</Text>
      </Animated.View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor:'white',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  icon: {
    fontSize: 40,
    height: 45,
    backgroundColor: 'transparent',
    paddingHorizontal: 10
  }
});


export default TabBar
