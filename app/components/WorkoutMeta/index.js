import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

import StyledText from 'app/components/StyledText';

class WorkoutMeta extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const { minutes } = this.props;

    return (
      <View style={styles.component}>
        <View style={styles.metaItem}>
          <Image style={styles.metaIcon} source={require('./clock_icon.png')}/>
          <StyledText weight="bold" style={styles.metaText}>{minutes} minute{minutes > 1 ? 's' : ''}</StyledText>
        </View>
        <View style={styles.metaItem}>
          <Image style={styles.metaIcon} source={require('./weight_icon.png')}/>
          <StyledText weight="bold" style={styles.metaText}>100 kg lifted</StyledText>
        </View>
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    flexDirection: 'row',
  },
  metaItem: {
    marginRight: 10,
    flexDirection: 'row'
  },
  metaLeft: {
    flexDirection: 'row'
  },
  metaIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
    resizeMode: 'contain'
  },
  metaText: {
    fontSize: 12
  },
});


export default WorkoutMeta
