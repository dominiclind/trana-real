import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import codePush from "react-native-code-push";

import Paragraph from 'app/components/Paragraph';

class Me extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }
  onButtonPress() {
    codePush.sync({
        updateDialog: true,
        installMode: codePush.InstallMode.IMMEDIATE
    });
  }

  render() {
    const { user } = this.props;
    return (
      <View style={ styles.component }>
        <TouchableOpacity onPress={this.onButtonPress}>
          <Image style={styles.avatar} source={{uri: user.photoURL }}/>
        </TouchableOpacity >
        <Paragraph style={{color:'black'}}>{user.displayName}</Paragraph>
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    backgroundColor:'transparent',
    alignItems: 'center'
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginBottom: 10
  }
});


export default Me
