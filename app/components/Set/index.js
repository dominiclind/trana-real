import React, { Component } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

import Paragraph from 'app/components/Paragraph';

class Set extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const { index, set = {} } = this.props;

    return (
      <View 
        key={index}
        style={[
          styles.setItem,
          { zIndex: 100-index }
        ]}
      >
        <Paragraph style={styles.setIndicator}>{index+1}</Paragraph>
        <TextInput
          value={set.reps || ''}
          onChangeText={(text) => {
            // set.reps = text;
            this.props.onRepsChange(text);
          }}
          onEndEditing={() => {
            // WorkoutStore.saveSet(exercise, index, {reps: this.state.sets[index].reps});
          }}
          autoCapitalize="characters"
          maxLength={2} 
          keyboardType="phone-pad"
          returnKeyType="done"
          autoCorrect={false}
          placeholder="12"
          placeholderTextColor="rgba(0,0,0,.15)"
          style={[styles.input, {width: 50}]}
        />
        <Paragraph style={styles.asterix}>*</Paragraph>
        <TextInput
          value={set.weight || ''}
          onChangeText={(text) => {
            // set.weight = text;
            this.props.onWeightChange(text);
          }}
          onEndEditing={() => {
          }}
          maxLength={3}
          autoCapitalize="characters"
          keyboardType="phone-pad"
          returnKeyType="done"
          autoCorrect={false}
          placeholder="80"
          placeholderTextColor="rgba(0,0,0,.15)"
          style={styles.input}
        />
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    backgroundColor:'blue'
  },
  setItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 5,
    borderBottomWidth : 1,
    borderBottomColor: '#4d4d4d',
    paddingLeft: 50
  },
  setIndicator: {
    position: 'absolute',
    left: 10,
    top: 24,
    fontSize: 22,
    lineHeight: 29,
    width: 30,
    height: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 15, 
  },
  asterix: {
    width: 20,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    lineHeight: 60,
    color: 'rgba(0,0,0,.1)',
    backgroundColor: 'transparent'
  },
  input: {
    height: 40,
    width: 75,
    color: '#4d4d4d',
    marginTop: 4,
    marginRight: 10,
    textAlign:'center',
    fontSize: 30,
    fontFamily: 'Circular',
    backgroundColor: 'rgba(0,0,0,.1)'
  },
  addNewSetWrap: {
    //marginTop: 20
  }
});


export default Set
