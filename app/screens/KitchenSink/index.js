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

@observer
class KitchenSink extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.screen}>
      
      <Header>Deadlift</Header>
      <Paragraph>Lorem Khaled Ipsum is a major key to success. You see that bamboo behind me though, you see that bamboo? Ain’t nothin’ like bamboo. Bless up. Stay focused. Life is what you make it, so let’s make it. Let’s see what Chef Dee got that they don’t want us to eat.</Paragraph>
      <Paragraph>The other day the grass was brown, now it’s green because I ain’t give up. Never surrender</Paragraph>

      <WeightAndRepsInput />

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button color="white" bg="black">perform</Button>
        <Button color="pink" bg="purple">Queen P</Button>
      </View>

      <SetsIndicator />

      <Countdown time={60} onFinish={() => console.log('counter finished!')} />

      {/*   
      <FancyHeader color="#ff6b69">Deadlift</FancyHeader>
      <FancyHeader color="#ff6b69">Thrusters</FancyHeader>
      <FancyHeader color="#ff6b69">Lunges</FancyHeader>
      <FancyHeader color="#ff6b69">Squats</FancyHeader>
      <FancyHeader color="#ff6b69">Burpees</FancyHeader>

      <NumberPlate color="#ff6b69">10</NumberPlate>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button color="#ff6b69">Next</Button>
      </View>
      
      <FancyHeader color="#2c96dd">Chins</FancyHeader>
      <FancyHeader color="#2c96dd">Bench press</FancyHeader>
      <FancyHeader color="#2c96dd">Dips</FancyHeader>
      <FancyHeader color="#2c96dd">Bent over row</FancyHeader>
      <FancyHeader color="#2c96dd">Burpees</FancyHeader>

      <NumberPlate color="#2c96dd">5</NumberPlate>

      <FancyHeader color="#46e2c0">Squat Clean</FancyHeader>
      <FancyHeader color="#46e2c0">Kettlebell Swing</FancyHeader>
      <FancyHeader color="#46e2c0">Military Press</FancyHeader>
      <FancyHeader color="#46e2c0">Russian Twist</FancyHeader>
      <FancyHeader color="#46e2c0">Crunches</FancyHeader>

      <NumberPlate color="#46e2c0">12</NumberPlate>


      <FancyHeader color="#ffe25f">Deadlift</FancyHeader>
      <FancyHeader color="#ffe25f">Benchpress</FancyHeader>
      <FancyHeader color="#ffe25f">Thrusters</FancyHeader>
      <FancyHeader color="#ffe25f">Mountainclimbers</FancyHeader>

      <NumberPlate color="#ffe25f">20</NumberPlate>
      */}

      </ScrollView>
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
