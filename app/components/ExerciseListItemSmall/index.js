import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';



import Paragraph from 'app/components/Paragraph';
import {getNormalizedBodyPart} from 'app/utils/workout';
import Icon from 'react-native-vector-icons/MaterialIcons';

class ExerciseListItemSmall extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const { exercise } = this.props;

    const bodyPart = getNormalizedBodyPart(exercise['Main Muscle Worked'].trim());

    return (
      <View style={styles.listItem}>
        <Image
          style={styles.image}
          source={{uri: exercise.pic_left}}
        />
        
        <View style={styles.textContent}>
          <Paragraph weight="bold" style={styles.exerciseName}>{exercise.name}</Paragraph>
          <Paragraph style={styles.equipment}>Equipment: {exercise.Equipment}</Paragraph>
          <View style={styles.tagRow}>
            <Paragraph weight="bold" style={styles.tag}>{bodyPart.toUpperCase()}</Paragraph>
          </View>
          <Icon style={styles.icon} name="add" onPress={() => this.props.onAdd()} />
        </View>
      
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    flex: 1,

  },
  image: {
    width: 80,
    resizeMode: 'cover',
  },
  tagRow: {
    flexDirection: 'row'
  },
  tag: {
    fontSize: 11,
    color: 'white',
    backgroundColor: 'black',
    marginBottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    overflow: 'hidden'
  },
  textContent: {
    backgroundColor: 'white',
    flex:1,
    padding: 15,
    justifyContent:'center'
  },
  exerciseName: {
    fontSize: 15,
    marginBottom: 4
  },
  equipment: {
    fontSize: 14,
    marginBottom: 15
  },
  icon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontSize: 30,
    backgroundColor: 'transparent'
  }
});


export default ExerciseListItemSmall
