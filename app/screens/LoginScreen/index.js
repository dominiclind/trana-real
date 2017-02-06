import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import SocialAuth from 'react-native-social-auth';
import Button from 'app/components/Button';
import FirebaseStore from 'app/stores/Firebase';
import NavStore from 'app/stores/Nav';

@observer
class Login extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    
  }

  _login() {
    SocialAuth.getFacebookCredentials(["email", "user_friends"], SocialAuth.facebookPermissionsType.read)
    .then((credentials) => {
      const token = credentials.accessToken;
      FirebaseStore.login(token);
      // NavStore.goTo('feed');

    })
    .catch((error) => console.log(error))
  }

  render() {
    return (
      <View style={styles.screen}>
        <Button onPress={() => this._login() }>connect with facebook</Button>
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


export default Login
