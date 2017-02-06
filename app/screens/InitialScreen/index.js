import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';

import Firebase from 'app/stores/Firebase';


@observer
class InitialScreen extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.screen}>
        <ActivityIndicator color="black" size="large" />
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  screen : {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  screenHeader: {
    fontSize: 50,
    fontWeight: '500',
    position: 'absolute',
    top: 50,
    left: 30
  }
});


export default InitialScreen
