import React, { Component } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import Paragraph from 'app/components/Paragraph';
import {getNormalizedBodyPart} from 'app/utils/workout';

class ExerciseListItem extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const { exercise } = this.props;

    const bodyPart = getNormalizedBodyPart(exercise['Main Muscle Worked'].trim());

    return (
      <TouchableOpacity key={exercise.name} onPress={this.props.onAdd}>
        <View style={styles.listItem} >
          <Paragraph weight="bold" style={styles.exerciseName}>{exercise.name.toUpperCase()}</Paragraph>
          <View style={{flexDirection: 'row'}}>
            <Paragraph weight="bold" style={styles.tag}>{bodyPart.toUpperCase()}</Paragraph>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}


// styles
const styles = StyleSheet.create({
  listItem: {
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    borderBottomWidth: 1
  },
  exerciseName: {
    marginBottom: 5
  },
  tag: {
    fontSize: 12,
    color: 'white',
    backgroundColor: 'black',
    marginBottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 5
  }
});


export default ExerciseListItem
