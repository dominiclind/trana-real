import React, { Component } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated
} from 'react-native';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import Workout from 'app/components/Workout';

import CardSlider from 'app/stores/CardSlider';
import CardNavBar from 'app/components/CardNavBar';
import StyledText from 'app/components/StyledText';
import WeightAndRepsInput from 'app/components/WeightAndRepsInput';
import Header from 'app/components/Header';
import Button from 'app/components/Button';
import Exercise from 'app/components/Exercise';

class Card extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fullscreen : new Animated.Value(0)
    }
  }

  onSwipeUp(gestureState) {
    this.setState({myText: 'You swiped up!'});
  }

  onSwipeDown(gestureState) {
    CardSlider.fullscreen = false;
  }

  onSwipeLeft(gestureState) {
    this.setState({myText: 'You swiped left!'});
  }

  onSwipeRight(gestureState) {
    this.setState({myText: 'You swiped right!'});
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if(nextProps.fullscreen !== this.props.fullscreen ||
  //     nextProps.offset !== this.props.offset ||
  //     nextProps.index !== this.props.index
  //     ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    const { fullscreen = false } = this.props;

    if (fullscreen) {
      Animated.spring(this.state.fullscreen, {
        toValue: 1,
        friction: 10,
      }).start();
    } else {
       Animated.spring(this.state.fullscreen, {
        toValue: 0,
        friction: 10,
      }).start();
    }
  }

  _onPress() {
    const { fullscreen, index } = this.props;
    if (!fullscreen) {
      CardSlider.fullscreen = !CardSlider.fullscreen;
    } else {
      return false;
    }
  }
  render() {
    const {
      exercise,
      color = 'black',
      fullscreen,
      offset,
      index
    } = this.props;

    const { sets = [] } = exercise;

    console.log(sets.length)

    const animPos = this.state.fullscreen.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -45]
    });

    const animTitleHeight = this.state.fullscreen.interpolate({
      inputRange: [0, .6 ,1],
      outputRange: [25, 25, 0]
    });
    const animTitleOpac = this.state.fullscreen.interpolate({
      inputRange: [0, .4, 1],
      outputRange: [1, 0 , 0]
    });
    const animTitlePos = this.state.fullscreen.interpolate({
      inputRange: [0, .5],
      outputRange: [0,-50]
    });

    const animNavBar = this.state.fullscreen.interpolate({
      inputRange: [0, 0.7, 1],
      outputRange: [-43, -43, 0]
    });

    const contentWrapScaleAnim = this.state.fullscreen.interpolate({
      inputRange: [0, 1],
      outputRange: [.7,1]
    });

    const offsetAnim = this.state.fullscreen.interpolate({
      inputRange: [0, 1],
      outputRange: [0,1000]
    });    

  
    return (
      <View
        style={[
          styles.card,
          { backgroundColor: color }
        ]}
        >
          <Animated.View style={[
            styles.expandBtnWrap,
            {
              transform: [{translateX: offsetAnim }]
            }]}>
            <TouchableOpacity
              style={styles.expandBtn} 
              onPress={() => this._onPress()}
              activeOpacity={0.3}
            />
          </Animated.View>

          {/* NAV BAR */}
          <Animated.View
            style={[
              styles.navBarWrap,
              {
                transform: [{ translateY: animNavBar }]
              }
            ]}
          >
            <CardNavBar onClose={() => CardSlider.fullscreen = false} />
          </Animated.View>
          {/* NAV BAR */}

          <Animated.View style={[
            styles.textContainer,
            ]}>
            
            {/*<Exercise exercise={exercise} fullscreen={this.state.fullscreen}/>*/}
          </Animated.View>
      </View>
    )
  }
}

const entryBorderRadius = 0;
const shadowOpacity = 0;

// styles
const styles = StyleSheet.create({
    card: {
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: 'black',
      flex: 1,
    },
    expandBtnWrap: {
      backgroundColor: 'transparent',
      position: 'absolute',
      zIndex: 7,
      top:0,
      left:0,
      right:0,
      bottom:0,
    },
    expandBtn: {
      position: 'absolute',
      top:0,
      left:0,
      right:0,
      bottom:0,
      backgroundColor: 'transparent'
    },
    imageContainer: {
      height: 320,
      backgroundColor: 'black',
      borderRadius: 0,
      borderTopLeftRadius: entryBorderRadius,
      borderTopRightRadius: entryBorderRadius,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
      opacity: .8,
      borderTopLeftRadius: entryBorderRadius,
      borderTopRightRadius: entryBorderRadius,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      left: -20,
      right: -20
    },
    textContainer: {
      backgroundColor: 'transparent',
      flex: 1,
    },
    titleWrap: {
      position: 'absolute',
      left: -20,
      right: -20,
      paddingHorizontal: 10,
      top: 90
    },
    contentWrap: {

    },
    imageTitle: {
    },
    imageText: {
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'transparent'
    },
    navBarWrap: {
      position: 'absolute',
      zIndex: 10,
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: 'transparent'
    }
});


export default Card
