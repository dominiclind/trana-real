import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {warn, log} from 'app/utils/log';
import {getBodypartsWorked} from 'app/utils/workout';
import { distanceInWordsToNow, differenceInMinutes } from 'date-fns';

import StyledText from 'app/components/StyledText';
import WorkoutMeta from 'app/components/WorkoutMeta';

import { getTotalWeight } from 'app/utils/workout';


class FeedListItem extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {
      sets,
      exercises = {},
      user,
      startDate,
      endDate
    } = this.props;

    return (
      <TouchableOpacity style={ styles.component } onPress={this.props.onPress}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri : user.photoURL}}
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>

          <StyledText style={styles.name} weight="bold">{user.displayName}</StyledText>
          <StyledText style={styles.desc}>Just finished a <StyledText weight="bold">{getBodypartsWorked(exercises)}</StyledText> workout</StyledText>
          <StyledText style={styles.date}>{distanceInWordsToNow(endDate)} ago</StyledText>

          <View style={styles.meta}>
            <WorkoutMeta
              weight={getTotalWeight(sets)}
              minutes={differenceInMinutes(endDate,startDate)}
            />
            <Image style={styles.arrowIcon} source={require('./arrow_icon.png')}/>
          </View>

          

        </View>
      </TouchableOpacity>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    backgroundColor:'white',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#E9ECEF',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  contentContainer: {
    flex: 1
  },
  imageContainer: {
    justifyContent: 'center'
  },
  name: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 2
  },
  desc: {
    color: '#868E96',
    fontSize: 14,
    marginBottom: 5
  },
  date: {
    fontSize: 12
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 21,
    resizeMode: 'cover',
    marginRight: 15
  },
  meta: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:15
  },
  arrowIcon: {
    width: 24,
    height: 16,
    resizeMode: 'contain'
  }
});


export default FeedListItem
