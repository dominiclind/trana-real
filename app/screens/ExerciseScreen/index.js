import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar
} from 'react-native';

import Header from 'app/components/Header';
import Paragraph from 'app/components/Paragraph';
import ExerciseGuide from 'app/components/ExerciseGuide';

import {getNormalizedBodyPart} from 'app/utils/workout';


class ExerciseScreen extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const { exercise } = this.props;
    console.log(exercise); 

    return (
      <ScrollView style={[styles.screen]}>
        <Image source={{uri: exercise.pic_right}}>
        <View style={{
          backgroundColor: 'rgba(0,0,0,.4)',
          justifyContent: 'center',
          alignItems: 'center',
          height: 300,
        }}>
          <Paragraph weight="bold" style={[styles.text, {fontSize: 25, color: 'white', paddingHorizontal: 20}]}>{exercise.name}</Paragraph>

          <Paragraph weight="black" style={styles.label}>BODYPART</Paragraph>
          <Paragraph style={styles.text}>{getNormalizedBodyPart(exercise['Main Muscle Worked'].trim())}</Paragraph>
          
           <Paragraph weight="black" style={styles.label}>EQUIPMENT</Paragraph>
          <Paragraph style={styles.text}>{exercise['Equipment'].trim()}</Paragraph>
        </View>
        </Image>
      
        <ExerciseGuide guide={exercise.guide}/>
        
      </ScrollView>
    )
  }
}


// styles
const styles = StyleSheet.create({
  screen : {
    backgroundColor: 'white',
    flex: 1,
  },
  label: {
    color: 'white',
    opacity: 0.65,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 0
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  },
  screenHeader: {
    fontSize: 50,
    fontWeight: '500',
    position: 'absolute',
    top: 50,
    left: 30
  }
});


export default ExerciseScreen
