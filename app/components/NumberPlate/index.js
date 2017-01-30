import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Animated
} from 'react-native';

import onecolor from 'onecolor';
import * as Animatable from 'react-native-animatable';

import StyledText from 'app/components/StyledText';

class NumberPlate extends Component {

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


    const bigBoxTranslate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0]
    });
    const smallBoxTranslate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [50, 0]
    });
    const opacAnim = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    const darkerColor = onecolor(color).black(.15).cssa();

    return (
      <Animated.View
        style={[
          styles.component,
          {
            opacity: opacAnim
          }
        ]}>
        <Animated.View 
          animation="slideInRight"
          style={[
            styles.smallBox,
            {
              backgroundColor: darkerColor,
            },
            { 
              transform: [
                {
                  translateX: smallBoxTranslate
                }
              ]
            }
          ]}
        />
        <Animated.View
          style={[
            styles.bigBox,
            { backgroundColor: color },
            { 
              transform: [
                {
                  translateX: bigBoxTranslate
                }
              ]
            }
          ]}
        >
          <StyledText weight="bold" style={styles.number}>{this.props.children}</StyledText>
        </Animated.View>
      </Animated.View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    backgroundColor:'transparent',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20
  },
  number: {
    fontSize: 150,
    lineHeight: 180,
    color: 'rgba(0,0,0,.3)'
  },
  smallBox: {
    width: 230,
    height: 100,
    position: 'absolute',
    top: -20,
    left: -20,
  },
  bigBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 230,
    height: 230
  }
});


export default NumberPlate
