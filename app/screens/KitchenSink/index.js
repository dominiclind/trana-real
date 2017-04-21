import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import {
  ScrollView,
  View,
  StyleSheet
} from 'react-native';

import FancyHeader from 'app/components/FancyHeader';
import NumberPlate from 'app/components/NumberPlate';
import WeightAndRepsInput from 'app/components/WeightAndRepsInput';
import Button from 'app/components/Button';
import Countdown from 'app/components/Countdown';
import SetsIndicator from 'app/components/SetsIndicator';
import Header from 'app/components/Header';
import Paragraph from 'app/components/Paragraph';
import ParallaxHeader from 'app/components/ParallaxHeader';
import FeedListItem2 from 'app/components/FeedListItem2';
import ExerciseHistoryItem from 'app/components/ExerciseHistoryItem';

@observer
class KitchenSink extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <ParallaxHeader title="Shoulder Workout" subtitle="Friday 7/3 2017">
        <View style={{backgroundColor: 'silver'}}>
          <ExerciseHistoryItem sets={[1,2]}/>

          <ExerciseHistoryItem sets={[1,2,3,4,5]}/>

          <ExerciseHistoryItem sets={[1,2,4]}/>

          <ExerciseHistoryItem sets={[1,2,1,3]}/>
        </View>
        {/*}
        <FeedListItem2
          name="Dominic Lind"
          bodyPart="Chest"
          date="2 hours ago"
          duration="25 minutes"
          weightLifted="340"
        />
        <FeedListItem2
          name="Alexander Ström"
          bodyPart="Back & Arms"
          date="1 day ago"
          duration="35 minutes"
          weightLifted="821"
        />
      {*/}
      </ParallaxHeader>
    )
  }
}


// styles
const styles = StyleSheet.create({
  screen : {
    paddingTop: 20
  }
});


export default KitchenSink
