import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import clamp from 'clamp';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Easing,
  Dimensions
} from 'react-native';


import WorkoutStore from 'app/stores/Workout';
import NumberPlate from 'app/components/NumberPlate';
import FancyHeader from 'app/components/FancyHeader';
import StyledText from 'app/components/StyledText';

var SWIPE_THRESHOLD = 220;

const { width, height } = Dimensions.get('window');

@observer
class Workout extends Component {

  constructor(props) {
    super(props)

    this.state = {
      pan: new Animated.ValueXY(),
      indicatorAnim: new Animated.Value(0)
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset();
        var velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        if (this.state.pan.x._value < 1 && Math.abs(this.state.pan.x._value ) > SWIPE_THRESHOLD) {
          // Animated.timing(this.state.pan, {
          //   toValue: -1200,
          //   duration: 200,
          //   easing: Easing.out(Easing.quad)
          // }).start();
          
          Animated.decay(this.state.pan, {
            velocity: { x: velocity, y: vy },
            deceleration: 0.98
          }).start();

          Animated.sequence([
            Animated.spring(this.state.indicatorAnim, {
              toValue: 1,
              spring: 5
            }),
            Animated.delay(50),
            Animated.spring(this.state.indicatorAnim, {
              toValue: 2,
              spring: 5
            })
          ]).start();

          setTimeout(() => {
            this.state.indicatorAnim.setValue(0);
            this.nextExercise();
          }, 200);
        
        } else {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 10
          }).start()
        }
      }
    })
  }

  nextExercise() {
    this.state.pan.setValue({x: 0, y: 0});
    WorkoutStore.nextExercise();
  }

  componentDidMount() {
  }

  render() {
    let { pan, enter, } = this.state;
    const { workouts, exerciseIndex } = WorkoutStore;
    const { exercises, color } = WorkoutStore.currentWorkout;
    // const current = exercises[index];
    // const { name, reps } = current;


    let [translateX, translateY] = [pan.x, pan.y];

    const currentOpacityAnim = pan.x.interpolate({
      inputRange: [-SWIPE_THRESHOLD, -(SWIPE_THRESHOLD-80), 0, 150],
      outputRange: [0,1,1,1]
    });
    const currentTranslateX = pan.x.interpolate({
      inputRange: [-SWIPE_THRESHOLD*2, 0, SWIPE_THRESHOLD*2],
      outputRange: [-100, 0, 0]
    });
    const currentHeaderTranslateX = pan.x.interpolate({
      inputRange: [-SWIPE_THRESHOLD*2, 0, SWIPE_THRESHOLD*2],
      outputRange: [-80, 0, 0]
    });
    const currentNumberPlateTranslateX = pan.x.interpolate({
      inputRange: [-SWIPE_THRESHOLD*2, 0, SWIPE_THRESHOLD*2],
      outputRange: [-140, 0, 0]
    });

    const indicatorXAnim = pan.x.interpolate({
      inputRange: [-SWIPE_THRESHOLD*2, -SWIPE_THRESHOLD, 0, 300],
      outputRange: [0 ,0, 160, 200]
    });
    
    const indicatorOpacity = pan.x.interpolate({
      inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
      outputRange: [1, 0, 0]
    });

    
    return (
      <View style={styles.component} {...this._panResponder.panHandlers}>

        {exercises.map((exercise, i) => {
          if (i == exerciseIndex) {
            return (
              <Animated.View
                key={i}
                style={[
                  styles.exerciseCard,
                  {
                    // transform: [{translateX: currentTranslateX}],
                    opacity: currentOpacityAnim
                  }
                ]}
              >
                <Animated.View
                  style={[
                    {
                      transform: [{translateX: currentHeaderTranslateX}],
                    }
                  ]}
                >
                  <FancyHeader color={color}>{exercise.name}</FancyHeader>
                </Animated.View>

                <Animated.View
                  style={[
                    {
                      transform: [{translateX: currentNumberPlateTranslateX}],
                    }
                  ]}
                >
                  <NumberPlate delay={200} color={color}>{exercise.reps}</NumberPlate>
                </Animated.View>
              </Animated.View>
            )
          } else {
            return null;
          }
        })}

        { /* }
        <Animated.View
          style={[
            styles.nextIndicator,
            {
              transform: [
               { translateX: indicatorXAnim }
              ],
              opacity: indicatorOpacity
            }
          ]}
        >
          <StyledText
            weight="bold"
            style={[
              styles.nextIndicatorText,
              { color }
            ]}
          >
            {WorkoutStore.nextExerciseName}
          </StyledText>
        </Animated.View>
        {*/ }
        
      </View>
    )
  }
}



// styles
const styles = StyleSheet.create({
  component : {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  exerciseCard: {
    backgroundColor: 'transparent'
  },
  indicatorWrap: {
    backgroundColor: 'transparent',
    zIndex: -1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nextIndicatorText: {
    backgroundColor: 'white',
    textAlign: 'center'
  }
});


export default Workout
