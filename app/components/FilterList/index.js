import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';

import StyledText from 'app/components/StyledText';


class FilterList extends Component {

  toggleBodypart(bodypart) {
    this.props.toggleBodypart(bodypart);
  }

  render() {
    const { filters } = this.props;
    return (
      <View style={ styles.component }>
        <StyledText style={[styles.text, styles.center, {marginBottom: 20}]} weight="bold">BODYPART</StyledText>
        <View style={styles.grid}>
          {['legs', 'chest', 'back', 'arms', 'shoulders', 'abs'].map((bodypart, index) => {
          
            return (
              <TouchableWithoutFeedback  key={index} onPress={() => this.toggleBodypart(bodypart)}>
                <View style={styles.col}>
                  <StyledText 
                    weight="bold"
                    style={[
                      styles.text,
                      styles.center,
                      styles.bodyTag,
                      filters.bodyparts.indexOf(bodypart) > -1 ? styles.active : {}
                    ]}>{bodypart.toUpperCase()}</StyledText>
                </View>
              </TouchableWithoutFeedback>
            )
          })}
        </View>

      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    paddingVertical: 20,
    backgroundColor:'#171717',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  center: {
    textAlign:'center'
  },
  text:{
    color: 'white',
  },
  active: {
    backgroundColor: 'white',
    color: 'black'
  },
  col: {
    width: Dimensions.get('window').width / 2,
    height: 50
  },
  bodyTag: {
    fontSize: 16,
    padding: 15
  }
});


export default FilterList
