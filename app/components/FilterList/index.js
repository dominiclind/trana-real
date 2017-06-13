import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

import StyledText from 'app/components/StyledText';
import shallowCompare from 'react-addons-shallow-compare'



class FilterList extends Component {

  toggleBodypart(bodypart) {
    this.props.toggleBodypart(bodypart);
  }

  
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
    //return false;
  }
  
  render() {
    const { filters } = this.props;
    return (
      <View style={ styles.component }>
        <StyledText style={[styles.text, styles.center, {marginBottom: 20}]} weight="bold">BODYPART</StyledText>
        <View style={styles.grid}>
          {['legs', 'chest', 'back', 'arms', 'shoulders', 'abs'].map((bodypart, index) => {
          
            return (
              <TouchableOpacity style={styles.col} key={index} onPress={() => this.toggleBodypart(bodypart)}>
                <StyledText 
                  weight="bold"
                  style={[
                    styles.text,
                    styles.center,
                    styles.bodyTag,
                    filters.bodyparts.indexOf(bodypart) > -1 ? styles.active : {}
                  ]}>{bodypart.toUpperCase()}</StyledText>
              </TouchableOpacity>
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
    paddingTop:20,
    backgroundColor:'black',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap'
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
    height:50,
    width: Dimensions.get('window').width / 2,
  },
  bodyTag: {
    fontSize: 16,
    padding: 15
  }
});


export default FilterList
