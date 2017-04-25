import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import { login } from 'app/actions/auth';

import SocialAuth from 'react-native-social-auth';
import Button from 'app/components/Button';

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading : false
    }
  }

  componentDidMount() {
    
  }

  _login() {
    const { dispatch } = this.props;
    this.setState({loading: true});
    
    SocialAuth.getFacebookCredentials(["email", "user_friends"], SocialAuth.facebookPermissionsType.read)
    .then((credentials) => {
      const token = credentials.accessToken;
      dispatch(login(token));
    })
    .catch((error) => console.log(error))
  }

  render() {
    return (
      <View style={styles.screen}>
        <Button onPress={() => this._login() }>Login with Facebook</Button>
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

// get relevant props from state
function mapStateToProps(state) {
  const { auth } = state;

  return {
    auth
  };
}

export default connect(mapStateToProps)(Login);
