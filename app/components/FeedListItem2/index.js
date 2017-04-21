import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';

import StyledText from 'app/components/StyledText';

class FeedListItem2 extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {
      name = 'Test Testsson',
      date = 123412345,
      bodyPart = 'Back & Arms',
      duration = 4343,
      weightLifted = 750
    } = this.props;

    return (
      <View style={ styles.component }>
        <View style={styles.imageContainer}>
          <Image
            source={require('./avatar.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <StyledText style={styles.name} weight="bold">{name}</StyledText>
          <StyledText style={styles.desc}>Just finished a <StyledText weight="bold">{bodyPart}</StyledText> workout</StyledText>
          <StyledText style={styles.date}>{date}</StyledText>

          <View style={styles.meta}>
            <StyledText weight="bold" style={styles.metaItem}>{duration}</StyledText>
            <StyledText weight="bold"  style={styles.metaItem}>{weightLifted} kg</StyledText>
          </View>

        </View>
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    backgroundColor:'transparent',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#E9ECEF',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  imageContainer: {
    justifyContent: 'center'
  },
  name: {
    fontSize: 12,
    lineHeight: 14,
    marginBottom: 2
  },
  desc: {
    color: '#868E96',
    fontSize: 15,
    marginBottom: 8
  },
  date: {
    fontSize: 12
  },
  image: {
    width: 42,
    height: 42,
    borderRadius: 21,
    resizeMode: 'cover',
    marginRight: 15
  },
  meta: {
    flexDirection: 'row',
    marginTop:10
  },
  metaItem: {
    marginRight: 10,
    fontSize: 12
  }
});


export default FeedListItem2
