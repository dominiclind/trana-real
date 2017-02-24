import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';



import Paragraph from 'app/components/Paragraph';
import {getNormalizedBodyPart} from 'app/utils/workout';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
      <TouchableOpacity key={exercise.name}>
        <View style={styles.listItem}>
          <Icon style={styles.icon} name="add" onPress={() => this.props.onAdd()} />
          <View style={{flex: 1, paddingHorizontal: 10}}>
            <Paragraph weight="bold" style={styles.exerciseName}>{exercise.name.toUpperCase()}</Paragraph>
            <View style={{flexDirection: 'row'}}>
              <Paragraph weight="bold" style={styles.tag}>{bodyPart.toUpperCase()}</Paragraph>
            </View>
          </View>
          <Icon style={styles.icon} name="info-outline" onPress={() => Actions.exercise({exercise})} />
        </View>
      </TouchableOpacity>
    )
  }
}


// styles
const styles = StyleSheet.create({
  listItem: {
    // justifyContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    flexDirection: 'row'
  },
  exerciseName: {
    fontSize: 16,
    marginBottom: 5
  },
  tag: {
    fontSize: 12,
    color: 'white',
    backgroundColor: 'black',
    marginBottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  icon: {
    fontSize: 30,
    backgroundColor: 'transparent'
  }
});


export default ExerciseListItem
