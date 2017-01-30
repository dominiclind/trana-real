import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';


import WeightAndRepsInput from 'app/components/WeightAndRepsInput';
import Header from 'app/components/Header';
import Paragraph from 'app/components/Paragraph';
import Button from 'app/components/Button';
import SetsIndicator from 'app/components/SetsIndicator';
import WorkoutStore from 'app/stores/Workout';




const { width } = Dimensions.get('window');

class Exercise extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentSet: 0
    }
  }

  componentDidMount() {
  }

  addSet() {
    const { exercise } = this.props;
    WorkoutStore.addSet(exercise);
  }
  performSet() {
    const { exercise } = this.props;
    // add wieight and rep to currnet set in current exercise
    WorkoutStore.performSet(exercise, this.state.currentSet, this.state.weight, this.state.reps);
    // add set 
    // navigate to new set
    //this.addSet();
    this.setState({ currentSet: this.state.currentSet+1 });
  }
  prevSet() {
    console.log('prev');
    console.log(this.state.currentSet);
    if(this.state.currentSet > 0){
      this.setState({ currentSet: this.state.currentSet-1 });
    }
  }
  nextSet() {
    const { sets = [] } = this.props.exercise;

    console.log('next');
    console.log(this.state.currentSet);

    if(this.state.currentSet < sets.length){
      this.setState({ currentSet: this.state.currentSet+1 });
    }
  }

  render() {
    const { fullscreen, exercise } = this.props;
    const { name, sets = [] } = exercise;
    const anim = new Animated.Value(fullscreen);

    const titleWrapScaleAnim = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [.75,1]
    });
    const titleWrapPosAnim = anim.interpolate({
      inputRange: [0,1],
      outputRange: [50,70]
    });
    const contentWrapScaleAnim = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [.7,1]
    });
     const contentWrapTranslateY = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0,-40]
    });
    const titlePosAnim = anim.interpolate({
      inputRange: [0, .7,1],
      outputRange: [-20, -20, 10]
    });
    const buttonWrapAnimPos = anim.interpolate({
      inputRange: [0, 1],
      outputRange: [100,0],
    })
    const buttonWrapAnimOpac = anim.interpolate({
      inputRange: [0, .4, 1],
      outputRange: [0, 0, 1],
    })

    const setWrapWidth = anim.interpolate({
      inputRange: [0,1],
      outputRange: [width - 60, width],
    })
    const previewSetAnim = anim.interpolate({
      inputRange: [0, .4, 1],
      outputRange: [0, 100, 100],
    })

    
    return (
      <View style={ styles.component }>
        <Animated.View style={[
          styles.titleWrap,
          {
            left: titlePosAnim,
            right: titlePosAnim,
            transform: [
              { scale: titleWrapScaleAnim },
              { translateY: titleWrapPosAnim }
            ]
          }
        ]}>
          <Header style={{color: 'white'}}>
            { name.toUpperCase() }
          </Header>
        </Animated.View>

        <Animated.View style={[
          styles.contentWrap,
          {
            transform: [
              { scale: contentWrapScaleAnim },
              { translateY: contentWrapTranslateY }
            ]
          }
        ]}>
          {sets.map((set, index) => {
            if (this.state.currentSet == index) {
              return (
                <Animated.View 
                  key={index}
                  style={[
                    styles.setWrap,
                    {
                      width: setWrapWidth
                    }
                  ]}
                >
                  <WeightAndRepsInput weight={set.weight} reps={set.reps} onChange={(weight, reps) => this.setState({ weight, reps})}/>
                </Animated.View>
              )
            } else {
              return null;
            }
          })}

          <Animated.View
            style={[
              styles.setWrap,
                {
                  justifyContent: 'center',
                  width: setWrapWidth
                }
            ]}
          >
            <TouchableOpacity
              onPress={() => this.addSet()}
            >
              <Paragraph weight="bold" style={styles.emptySetTxt}>ADD SET</Paragraph>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        <Animated.View
          style={[
            styles.setsIndicatorWrap,
            {
              opacity: buttonWrapAnimOpac
            }
          ]}
        >
          <SetsIndicator sets={sets.map((set) => set.done )} current={this.state.currentSet}/>
        </Animated.View>
        <Animated.View
          style={[
            styles.bottomButtonWrap,
            fullscreen ? { zIndex: 3 } : false,
            {
              opacity: buttonWrapAnimOpac,           
            }
          ]}
        >
          <Button
            style={{paddingHorizontal: 0}}
            bg="black"
            color="white"
            onPress={() => this.prevSet()}
          >
            prev
          </Button>
          <Button
            style={{ opacity: sets[this.state.currentSet] ? 1 : 0 }}
            bg="white"
            color="black"
            onPress={() => this.performSet()}
          >
            Save set
          </Button>
          <Button
            style={{paddingHorizontal: 0}}
            bg="black"
            color="white"
            onPress={() => this.nextSet()}
          >
            next
          </Button>
        </Animated.View>
        <Animated.View
          style={[
            styles.previewSetCount,
            {
              transform: [{translateY: previewSetAnim}]
            }
          ]}
        >
          <Paragraph weight="bold" style={styles.previewSetCountText}>{sets.length} SET{sets.length > 0 ? 'S' : ''}</Paragraph>
        </Animated.View>
      </View>
    )
  }
}

// styles
const styles = StyleSheet.create({
  component : {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'transparent'
  },
  titleWrap: {
    position: 'absolute',
    left: -20,
    right: -20,
    paddingHorizontal: 10,
    top: 0
  },
  emptySetTxt: {
    fontSize: 26,
    textAlign: 'center',
    color: 'rgba(255,255,255,.3)'
  },
  contentWrap: {
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  setWrap:{
    backgroundColor: 'transparent',
  },
  bottomButtonWrap: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'transparent'
  },
  setsIndicatorWrap: {
    position: 'absolute',
    bottom:120,
    left: 0,
    right: 0,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  previewSetCount: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  previewSetCountText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    lineHeight: 16
  }
});


export default Animated.createAnimatedComponent(Exercise);
