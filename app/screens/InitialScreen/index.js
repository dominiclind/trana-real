import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import {warn, log} from 'app/utils/log';

import { checkLogin } from 'app/modules/auth/AuthActions';


class InitialScreen extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(checkLogin());
    // Firebase.checkLogin();
  }

  render() {
    const { auth } = this.props;

    log(auth);

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



// get relevant props from state
function mapStateToProps(state) {
  const { auth } = state;

  return {
    auth
  };
}

export default connect(mapStateToProps)(InitialScreen);
