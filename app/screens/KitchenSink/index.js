import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import {
  ScrollView,
  View,
  StyleSheet
} from 'react-native';

import Button from 'app/components/Button';
import Header from 'app/components/Header';
import Paragraph from 'app/components/Paragraph';
import ParallaxHeader from 'app/components/ParallaxHeader';
import FeedListItem from 'app/components/FeedListItem';
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
      <ParallaxHeader title="Kitchen Sink" subtitle="Här finns massa komponenter!">
        <View style={{backgroundColor: 'silver'}}>
          <ExerciseHistoryItem sets={[1,2]}/>
          <FeedListItem />


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
