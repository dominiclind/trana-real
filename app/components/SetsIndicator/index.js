import React, { Component } from 'react';

import {
  View,
  StyleSheet,
} from 'react-native';

import StyledText from 'app/components/StyledText';

class SetsIndicator extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const { sets = [], current = 0 } = this.props;
    return (
      <View style={ styles.component }>
        <StyledText weight="bold" style={styles.label}>SETS</StyledText>

        <View style={styles.indicators}>
          {sets.map((set, i) => <View key={i} style={[styles.indicator, set ? styles.done : null, current == i ? styles.current : null]}/>)}  
        </View>
      
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    alignItems: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white'
  },
  indicators: {
    marginBottom: 0,
    flexDirection: 'row'
  },
  indicator: {
    width: 15,
    height: 15,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 7.5,
    marginBottom: 10,
    marginHorizontal: 5,
    transform: [{
      scale: .8
    }]
  },
  done: {
    backgroundColor: 'white'
  },
  current: {
    transform: [{
      scale: 1.1
    }]
  }
});


export default SetsIndicator
