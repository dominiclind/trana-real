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
        
        <FancyHeader>Edins trjaffs</FancyHeader>
        <FancyHeader>Edins trjaffs</FancyHeader>
        <FancyHeader>Edins trjaffs</FancyHeader>
        <FancyHeader>Edins trjaffs</FancyHeader>

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
