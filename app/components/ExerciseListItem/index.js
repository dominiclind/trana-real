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
      <View style={styles.listItemWrap}>

        <View style={styles.listItemShadow}>
        <View style={styles.listItem}>
          <Image
            style={styles.image}
            source={{uri: exercise.pic_left}}
          >
            <View style={styles.tagRow}>
              <Paragraph weight="bold" style={styles.tag}>{bodyPart.toUpperCase()}</Paragraph>
            </View>
          </Image>
          <View style={styles.textContent}>
            <Paragraph weight="bold" style={styles.exerciseName}>{exercise.name}</Paragraph>
            <Paragraph style={styles.equipment}>Equipment: {exercise.Equipment}</Paragraph>
            <Icon style={styles.icon} name="add" onPress={() => this.props.onAdd()} />
          </View>
        </View>
        </View>

      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  listItemWrap: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  listItemShadow: {
    shadowRadius: 9,
    shadowOffset: {x:0, y:0},
    shadowColor: 'black',
    shadowOpacity: .0,
    overflow:'visible'
  },
  listItem: {
    // justifyContent: 'center',
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowRadius: 4,
    shadowOffset: {x:0, y:10},
    shadowColor: 'black',
    shadowOpacity: 1,
    overflow: 'hidden'
  },
  image: {
    height: 230,
    resizeMode: 'cover',
    alignItems: 'flex-end',
    padding: 10,
  },
  tagRow: {
    flexDirection: 'row'
  },
  tag: {
    fontSize: 12,
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
    height: 100,
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


export default ExerciseListItem
