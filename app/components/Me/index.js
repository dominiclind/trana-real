import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';


import Paragraph from 'app/components/Paragraph';

class Me extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <View style={ styles.component }>
        <Image style={styles.avatar} source={{uri: user.photoURL }}/>
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
