import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet
} from 'react-native';

import StyledText from 'app/components/StyledText';

class ExerciseHistoryItem extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {
      sets = [1,2]
    } = this.props;

    return (
      <View style={ styles.component }>
        <View style={styles.contentContainer}>
          <StyledText weight="bold" style={styles.name}>Barbel Bench Press  - Medium Grip</StyledText>
          <StyledText style={styles.bodyparts}>Chest * Shoulders & Triceps</StyledText>

          <View style={styles.sets}>
            <ScrollView 
              horizontal={true} 
              style={{flex: 1}} 
              showsHorizontalScrollIndicator={false}
            >
              {sets.map((set, i) => (
                <View style={styles.set} key={i}>
                  <StyledText weight="bold" style={styles.setText}>10 * 150kg</StyledText>
                </View>
              ))}
            </ScrollView>
          </View>

        </View>
      </View>
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
    paddingTop: 15,
  },
  name: {
    fontSize: 15,
    paddingHorizontal: 15,
  },
  bodyparts: {
    fontSize: 12,
    paddingHorizontal: 15,
    paddingBottom: 15
  },
  contentContainer: {
    backgroundColor: 'transparent',
    flex: 1
  },
  sets: {
    backgroundColor: '#E9ECEF',
    flex: 1,
  },
  set: {
    backgroundColor: '#343A40',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius:15,
    marginLeft: 15,
    marginVertical: 10,
  },
  setText: {
    color: 'white',
    textAlign:'center'
  }
  
});


export default ExerciseHistoryItem
