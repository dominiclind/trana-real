import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  InteractionManager,
  ActivityIndicator
} from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import { getMe } from 'app/modules/auth/AuthActions';

import Header from 'app/components/Header';
import Paragraph from 'app/components/Paragraph';
import ParallaxHeader from 'app/components/ParallaxHeader';
import ExerciseGuide from 'app/components/ExerciseGuide';
import Chart from 'app/components/Chart';

import {getNormalizedBodyPart, getExercisesForUser } from 'app/utils/workout';


class ExerciseScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      index: 0,
      ready: true,
      routes: [
        { key: '1', title: 'History' },
        { key: '2', title: 'Guide' },
      ],
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;

    // InteractionManager.runAfterInteractions(() => {
    //   this.setState({ready: true});
    //   // dispatch(getMe());
    // })
  }

  _handleChangeTab(index) {
    this.setState({ index });
  }

  _renderHeader(props) {
    return <TabBar {...props} />;
  }


  _renderScene({ route }) {
    switch (route.key) {
      case '1':
        return (
          <View style={[ styles.screen, { backgroundColor: '#ff4081' } ]} />
        )
      case '2':
        return (
          <View style={[ styles.screen, { backgroundColor: '#ff4081' } ]} />
        )
      default:
        return null;
    }
  }

  render() {
    const { exercise, auth } = this.props;
    const { loading, me = false } = auth;

    let eWithData;
    if(me){
      eWithData = getExercisesForUser(me, exercise.id);    
    }
    
    return (
      <ParallaxHeader
        onBack={() => Actions.pop()}
        title={exercise.name}
        subtitle={getNormalizedBodyPart(exercise['Main Muscle Worked'].trim())}
      >
        
        <View>
          
          {!this.state.ready || loading ? (
            <ActivityIndicator color="black"/>
          ) : (
            <Chart data={eWithData.all}/>
          )}
        </View>
          <Paragraph weight="bold">Equipment: {exercise['Equipment']}</Paragraph>
          <Paragraph weight="bold">times performed</Paragraph>
          <Paragraph weight="bold">frequency (times a week)</Paragraph>

        {/*}
        {exercise.guide ? (
          <ExerciseGuide guide={exercise.guide}/>
        ) : null}
        {*/}
      </ParallaxHeader>
    )
  }
}


// styles
const styles = StyleSheet.create({
  screen : {
    backgroundColor: 'red',
    flex: 1,
    height:300
  },
  label: {
    color: 'white',
    opacity: 0.65,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 0
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
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

export default connect(mapStateToProps)(ExerciseScreen);
