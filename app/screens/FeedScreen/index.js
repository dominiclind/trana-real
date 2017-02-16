import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView
} from 'react-native';

import Firebase from 'app/stores/Firebase';
import WorkoutStore from 'app/stores/Workout';
import Paragraph from 'app/components/Paragraph';
import Me from 'app/components/Me';
import Button from 'app/components/Button';
import FeedListItem from 'app/components/FeedListItem';
import sort from 'app/utils/sort';
import {getExercisesForWorkout} from 'app/utils/workout';

const weekday = [];
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

@observer
class FeedScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loaded : false,
      feed: []
    }
  }

  componentDidMount() {
    Promise.all([Firebase.getMyFeed(), Firebase.getExercises()]).then(response => {
      this.setState({
        feed: response[0],
        exercises: response[1],
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
            <Paragraph>{weekday[new Date(key).getDay()]}</Paragraph>
          </View>
        )
      });
    } else {
      return null;
    }
  }
  renderItem() {
    const { feed, exercises } = this.state;
    if (feed) {
      return feed.reverse().map((item,i) => {
        return (
          <FeedListItem
            key={i} 
            id={item.id}
            workout={item.value}
            exercises={getExercisesForWorkout(item.value.exercises, exercises)}
          />
        )
      });
    } else {
      return null;
    }
  }
  render() {
    const { user } = Firebase;
    const { feed, loaded } = this.state;
    const { startDate, rehydrated } = WorkoutStore;

    return (
      <View style={styles.screen}>
        <Me user={user} />
        <View style={styles.feed}>
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
      </View>
    )
  }
}


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
  }
});


export default FeedScreen
