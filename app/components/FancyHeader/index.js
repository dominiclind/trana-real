import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Animated
} from 'react-native';

import StyledText from 'app/components/StyledText';

class FancyHeader extends Component {

  constructor(props) {
    super(props)

    this.state = {
      animation : new Animated.Value(0)
    };
  }

  componentDidMount() {
    const { delay = 0 } = this.props;

    setTimeout(() => {
      Animated.spring(this.state.animation, {
        toValue: 1,
        tension: 10,
        friction: 10
      }).start();
    }, delay);

  }

  render() {
    const { color = 'blue' } = this.props;


    const rectHeight = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 30]
    });

    const textHeight = this.state.animation.interpolate({
      inputRange: [0, .6, 1],
      outputRange: [1, 0, 35]
    });

    const textTranslate = this.state.animation.interpolate({
      inputRange: [0, .2, 1],
      outputRange: [35, 35, 0]
    });
    const opacAnim = this.state.animation.interpolate({
      inputRange: [0, .9, 1],
      outputRange: [0, 1, 1]
    });

    return (
      <Animated.View
        style={[
          styles.component,
          { opacity: opacAnim }
        ]}>
        <View style={ styles.innerWrap }>
          <Animated.View 
            style={[
              styles.textMask,
              {
                height: textHeight,
                transform: [
                  {
                    translateY: textTranslate
                  }
                ]
              }
            ]}
          >
            <StyledText weight="black" style={styles.text}>{this.props.children.toUpperCase()}</StyledText>
          </Animated.View>
          <Animated.View 
            style={[
              styles.rectangle,
              { backgroundColor: color },
              {
                height: rectHeight
              }
            ]}
          />
        </View>
      </Animated.View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    backgroundColor: 'transparent',
    position: 'relative',
    alignItems: 'center',
    marginBottom: 10,
    height: 38,
    backgroundColor: 'transparent'
  },
  innerWrap: {

  },
  text: {
    fontSize: 30,
  },
  textMask: {
    // height: 30,
    overflow: 'hidden'
  },
  rectangle: {
    position: 'absolute',
    height: 30,
    top: 18,
    left:-20,
    right: -20,
    zIndex: -1
  }
});


export default FancyHeader
