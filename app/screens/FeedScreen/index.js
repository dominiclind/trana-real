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
      feed: {}
    }
  }

  componentDidMount() {
    console.log('feed mount');
    Firebase.getMyFeed().then(feed => {
      console.log(sort(feed));
      this.setState({feed: sort(feed), loaded: true});
    });
  }

  renderItemByDay() {
    const { feed } = this.state;
    if (feed.byday) {
      return Object.keys(feed.byday).map((key) => {
        console.log(new Date(key));
        console.log('hej');
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
    const { feed } = this.state;

    if (feed.original) {
      return feed.original.map((workout,i) => {
        return <FeedListItem key={i} workout={workout} />
      });
    } else {
      return null;
    }
  }
  render() {
    const { user } = Firebase;
    const { feed, loaded } = this.state;

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
          <Button onPress={() => WorkoutStore.startWorkout()}>START WORKOUT</Button>
        </View>
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  screen : {
    backgroundColor: 'pink',
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
    marginTop: 10,
    marginBottom: 0,
    alignItems: 'center'
  }
});


export default FeedScreen
