import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import shallowCompare from 'react-addons-shallow-compare'


class CardNavBar extends Component {

  constructor(props) {
    super(props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  
  render() {
    return (
      <View style={ styles.component }>
        <Icon
          style={styles.close}
          name="md-close"
          size={40}
          color="white"
          onPress={this.props.onClose}
        />
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  close: {
    backgroundColor: 'transparent'
  }
});


export default CardNavBar
