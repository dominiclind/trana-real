import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native';

import Modal from 'react-native-modalbox';

import Firebase from 'app/stores/Firebase';
import WorkoutStore from 'app/stores/Workout';
import Paragraph from 'app/components/Paragraph';
import Me from 'app/components/Me';
import Button from 'app/components/Button';
import FeedListItem from 'app/components/FeedListItem';
import WorkoutInfoModalContent from 'app/components/WorkoutInfoModalContent';
import sort from 'app/utils/sort';
import {getExercisesForWorkout} from 'app/utils/workout';
import {getBodybuildingExercises} from 'app/utils/api';
import {getDay} from 'app/utils/time';

@observer
class FeedScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loaded : false,
      feed: [],
      workoutPreviewModal: false
    }
  }

  componentDidMount() {
    Promise.all([
      Firebase.getMyFeed(),
      getBodybuildingExercises(),
      Firebase.getFavoriteWorkouts()
    ]).then(response => {
      this.setState({
        feed: response[0].reverse(),
        exercises: response[1],
        favorites: response[2],
        loaded: true
      });
    });
  }

  renderItemByDay() {
    const { feed } = this.state;
    if (feed.byday) {
      return Object.keys(feed.byday).map((key) => {
        return (
          <View key={key}>
            <Paragraph>{getDay(new Date(key).getDay())}</Paragraph>
          </View>
        )
      });
    } else {
      return null;
    }
  }
  renderItem() {
    const { feed, exercises, favorites } = this.state;
    if (feed) {
      return feed.map((item,i) => {
        return (
          <FeedListItem
            onPress={() => this.setState({workoutPreviewModal: true, workout: item })}
            key={i} 
            id={item.id}
            favorite={favorites.indexOf(item.id) > -1}
            workout={item.value}
            exercises={getExercisesForWorkout(item.value.exercises, exercises)}
          />
        )
      });
    } else {
      return null;
    }
  }
  renderWorkoutInfoModal() {
    const { workout = false, exercises } = this.state;
    return (
      <Modal
        position="bottom"
        style={styles.modal}
        isOpen={this.state.workoutPreviewModal}
        onClosed={() => this.setState({workoutPreviewModal: false})}
        >
          <View style={styles.modalContent}>
            {workout ? 
              <WorkoutInfoModalContent
                workout={workout}
                exercises={getExercisesForWorkout(workout.value.exercises, exercises)}
              />
            : null}
            <Button bg="pink" color="black" onPress={() => this.setState({ workoutPreviewModal: false }) }>
              close
            </Button>
          </View>
      </Modal>
    )
  }
  render() {
    const { user } = Firebase;
    const { feed, loaded } = this.state;
    const { startDate, rehydrated } = WorkoutStore;

    return (
      <View style={styles.screen}>
        <Me user={user} />
        <View style={styles.feed}>
          <Paragraph weight="bold" style={{textAlign:'center', fontSize: 12, color:'rgba(0,0,0,.3)'}}>MY WORKOUTS</Paragraph>
          <ScrollView>
            {!loaded ? <ActivityIndicator /> : null}
            {this.renderItem()}
          </ScrollView>
        </View>
        <View style={styles.bottomButtonWrap}>
          {rehydrated ? (
          <Button onPress={() => WorkoutStore.startWorkout()}>
            {
              startDate ? 'resume workout' : 'start workout'
            }
          </Button>
          ) : null}
        </View>
        {this.renderWorkoutInfoModal()}
      </View>
    )
  }
}

const { height:vh } = Dimensions.get('window');

// styles
const styles = StyleSheet.create({
  screen : {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 50
  },
  screenHeader: {
    fontSize: 50,
    fontWeight: '500',
    position: 'absolute',
    top: 50,
    left: 30
  },
  feed: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  bottomButtonWrap: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'center'
  },
  modal: {
    //:'transparent',
    position: 'relative',
    //top: 20,
    backgroundColor: 'transparent',
  },
  modalContent: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
  }
});


export default FeedScreen
