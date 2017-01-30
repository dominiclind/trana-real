import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import Modal from 'react-native-modalbox';

import Workout from 'app/components/Workout';
import Button from 'app/components/Button';
import WorkoutStore from 'app/stores/Workout';
import CardSlider from 'app/components/CardSlider';
import WorkoutNavbar from 'app/components/WorkoutNavbar';
import Paragraph from 'app/components/Paragraph';
import CardSliderStore from 'app/stores/CardSlider';

@observer
class WorkoutScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      modal: false,
      selectedEmoji : 1,
      emojis: [
      {
        icon : '💩',
        selected: false
      },
      {
       icon:'🤷‍♂',
        selected: false
      },
      {
       icon: '🦄',
        selected: true
      }]
    };
  }

  componentDidMount() {
  }

  onSwipeRight(gestureState) {
    this.setState({myText: 'You swiped right!'});
  }
  showModal() {
  }
  saveWorkout() {
    const { emojis, selectedEmoji } = this.state;
    const mood = emojis[selectedEmoji].icon;

    WorkoutStore.endWorkout(mood);
    this.setState({modal: false});
  }

  render() {
    const { fullscreen } = CardSliderStore;
    const { 
      exercises,
      amountOfExercises,
      numberOfSets,
      totalSets
    } = WorkoutStore;  
    return (
      <View
        style={styles.screen}
      > 
        <CardSlider
          totalSets={totalSets}
          fullscreen={fullscreen}
          content={exercises}
        />
        <WorkoutNavbar
          startDate={WorkoutStore.startDate}
          endWorkout={() => this.setState({modal: true}) }
          cancelWorkout={() => WorkoutStore.cancelWorkout() }
        />
        { /* <View style={{alignItems: 'center', padding: 20}}>
          <Button onPress={() => WorkoutStore.endWorkout()}>
            End
          </Button>
        </View> */ }
        <Modal
          position="bottom"
          style={styles.modal}
          isOpen={this.state.modal}
          onClosed={() => this.setState({modal: false})}
          >
            <View style={{alignItems: 'center'}}>
              <Paragraph weight="bold" style={styles.text}>WORKOUT RATING</Paragraph>
              <View style={styles.emojis}>
                {this.state.emojis.map((moji,i) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      onPress={() => this.setState({selectedEmoji: i})}
                    >
                      <Paragraph style={[styles.icon, i == this.state.selectedEmoji ? styles.iconSelected : {}]}>{moji.icon}</Paragraph>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </View>
            <Button bg="pink" color="black" onPress={() => this.saveWorkout() }>
              SAVE 💾
            </Button>
        </Modal>
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  screen : {
    flex: 1,
    flexDirection: 'column-reverse'
  },
  modal: {
    //:'transparent',
    position: 'relative',
    top: 20,
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: 'white',
    height: 250,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  emojis: {
    flexDirection: 'row'
  },
  text: {
    marginBottom: 10,
  },
  icon: {
    fontSize: 46,
    marginBottom: 0,
    marginHorizontal: 10,
    width: 60,
    height: 60,
    textAlign: 'center'
  },
  iconSelected: {
    backgroundColor: 'purple'
  }
});


export default WorkoutScreen
