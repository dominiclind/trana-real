import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import Autocomplete from 'react-native-autocomplete-input';

const { height, width } = Dimensions.get('window');

import Header from 'app/components/Header';
import AddExercise from 'app/components/AddExercise';
import StyledText from 'app/components/StyledText';
import ExerciseSimple from 'app/components/ExerciseSimple';
import Button from 'app/components/Button';
import WorkoutStore from 'app/stores/Workout';

const xOffset = new Animated.Value(0);

const onScroll = Animated.event(
  [{ nativeEvent: { contentOffset: { x: xOffset } } }],
  { useNativeDriver: false }
);
const rotateTransform = () => {
  return {
    transform: [{
      translateX: xOffset.interpolate({
        inputRange: [0, 200, 300],
        outputRange: [-110, 0, 0],
      })
    }]
  };
}

class CardSlider extends Component {

  constructor(props) {
    super(props)

    this.state = {
      index: 0,
      fullscreen: new Animated.Value(0),
      offset: 0,
      query: ''
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if(nextProps.fullscreen !== this.props.fullscreen ||
  //     nextState.offset !== this.state.offset ||
  //     nextState.query !== this.state.query) {
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
        friction: 5,
        tension: 8
      }).start();
    } else {
       Animated.spring(this.state.fullscreen, {
        toValue: 0,
        friction: 10
      }).start();
    }
  }

  componentDidMount() {
    Animated.spring(xOffset, {
      toValue: 0,
      friction: 10
    }).start();
  }

  onScrollEnd(e) {
    const { nativeEvent } = e;
    this.setState({ index: nativeEvent.contentOffset.x / width });
  }

  startWorkout(index) {
    WorkoutStore.startWorkout(index);
  }

  _filterData(data) {
    const { query } = this.state;
    const filtered = data.filter(e => {
      if (e.name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
        return e;
      }
    });
    return filtered;
  }

  render() {
    const { fullscreen = false, content } = this.props;
    const animVertical = this.state.fullscreen.interpolate({
      inputRange: [0, 1],
      outputRange: [150, 0]
    });
    const animHorizontal = this.state.fullscreen.interpolate({
      inputRange: [0, 1],
      outputRange: [30, 0]
    })
    const otherCardTransform = xOffset.interpolate({
      inputRange: [0, 200, 300],
      outputRange: [-110, 0, 0],
    });
    // const introTransform = xOffset.interpolate({
    //   inputRange: [-500, 0, 400],
    //   outputRange: [-250, 0, 250],
    // });
    // const introOpac = xOffset.interpolate({
    //   inputRange: [-220, 0, 300],
    //   outputRange: [1, 1, 0],
    // });

    return (
      <View style={ styles.component }>
        <Animated.ScrollView 
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={true}
          scrollEventThrottle={16}
          onMomentumScrollEnd={(e) => {this.onScrollEnd(e)}}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: xOffset } } }])}
          horizontal
          pagingEnabled
          style={styles.slider}
          scrollEnabled ={!fullscreen}
          showHorizontal
          showsHorizontalScrollIndicator={false}
        >
        {content.map((exercise,index) => {
          return (
            <Animated.View 
              key={index}
              style={[
                styles.card,
                // rotateTransform(),
                {
                  // paddingHorizontal: animHorizontal,
                  // paddingVertical: animVertical
                }
              ]}
            >
              <ExerciseSimple exercise={exercise} />
            </Animated.View>
          )
        })}
        <View style={styles.lastCard}>
          <AddExercise />
        </View>
        </Animated.ScrollView>
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    backgroundColor:'transparent',
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 75,
  },
  regularCards: {
    transform: [
      { translateX: -50 }
    ]
  },
  slider: {
    width: width, // width - 40
    overflow: 'visible',
    backgroundColor: 'transparent'
  },
  card: {
    width,
  },
  listStyle: {
    borderWidth: 0,
    backgroundColor: 'white',
    marginTop: 62,
    height: 300
    // marginTop: 42
  },
  inputStyle: {
    borderWidth: 0,
    height: 60,
    paddingHorizontal: 10,
    fontSize: 18,
    fontFamily: 'Circular-Bold',
    backgroundColor: 'white'
  },
  listItem: {
    backgroundColor: 'blue',
    padding: 10,
    paddingVertical: 20,
    borderBottomWidth: 0
  },
  listItemText: {
    fontSize: 16,
  },
  lastCard: {
    width,
    paddingTop: 20
  },
});


export default CardSlider
