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
        <Image style={styles.avatar} source={{uri: user.photoURL }}/>
        <Paragraph style={{color:'black'}}>{user.displayName}</Paragraph>
        <TouchableOpacity style={styles.logoutBtn} onPress={this.props.onLogout}>
          <Paragraph style={styles.logout}>LOGOUT</Paragraph>
        </TouchableOpacity>
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    backgroundColor:'transparent',
    alignItems: 'center',
    paddingTop: 40,
    position: 'relative'
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginBottom: 10
  },
  logoutBtn: {
    position: 'absolute',
    top: 30,
    right: 20
  },
  logout: {
    textDecorationLine: 'underline',
    textDecorationColor: 'black',
    fontWeight: '800',
    fontSize: 12,
  }
});


export default Me
