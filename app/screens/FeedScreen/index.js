import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { logout } from 'app/modules/auth/AuthActions';
import { getFeed } from 'app/modules/feed/FeedActions';
import { startWorkout } from 'app/modules/workout/WorkoutActions';

import {warn, log} from 'app/utils/log';

import Paragraph from 'app/components/Paragraph';
import Me from 'app/components/Me';
import Button from 'app/components/Button';
import FeedListItem from 'app/components/FeedListItem';

import {getExercisesForWorkout} from 'app/utils/workout';

class FeedScreen extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getFeed());
  }

  _renderItem() {
    const { feed:feedReducer, auth } = this.props;
    const { feed } = feedReducer;

    if (feed) {
      return feed.map((item,i) => {
        const workout = item.value;
        if(workout.exercises){
          return (
            <FeedListItem
              key={i}
              {...workout}
              onPress={() => Actions.singleWorkoutHistory({workout})}
            />
          )
        } else {
          return null
        }
      });
    } else {
      return null;
    }
  }

  _logout() {
    const { dispatch } = this.props;
    dispatch(logout());
  }

  _startWorkout() {
    const { dispatch } = this.props;
    dispatch(startWorkout());
  }

  render() {
    const { feed:feedReducer, auth } = this.props;
    const { user } = auth;
    const { loading, feed } = feedReducer;

    log(feed);

    return (
      <View style={styles.screen}>
        <Me user={user} onLogout={() => this._logout()}/>

        <View style={styles.feed}>
          <Paragraph weight="bold"
            style={{
            textAlign:'center',
            fontSize: 12,
            color:'rgba(0,0,0,.3)'
          }}>
            Feed
          </Paragraph>
          <ScrollView>
            {loading ? <ActivityIndicator /> : null}
            {this._renderItem()}
          </ScrollView>
        </View>
        
        <View style={styles.bottomButtonWrap}>
          <Button onPress={() => this._startWorkout()}>Start Workout</Button>
        </View>
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
    marginTop: 15,
    marginBottom: 0,
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


// get relevant props from state
function mapStateToProps(state) {
  const { auth, feed } = state;

  return {
    auth,
    feed
  };
}

export default connect(mapStateToProps)(FeedScreen);
