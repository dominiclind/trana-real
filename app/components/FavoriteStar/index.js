import React, { Component } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import Paragraph from 'app/components/Paragraph';
import FirebaseStore from 'app/stores/Firebase';


class FavoriteStar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      favorite : props.favorite
    }
  }

  componentDidMount() {
  }

  render() {
    const { id } = this.props;
    const { favorite } = this.state;

    return (
      <View style={[styles.component, {opacity: favorite ? 1 : .3}]}>
        <TouchableOpacity onPress={() => {
          this.setState({favorite: !this.state.favorite});
          FirebaseStore.toggleFavorite(id);
        }}>
          <Paragraph style={[styles.star]}>⭐</Paragraph>
        </TouchableOpacity>
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component: {
    height: 30,
    width: 30,
    alignItems: 'center',
    backgroundColor:'transparent',
    // marginHorizontal: 20,
  },
  star: {
    fontSize: 22,
    lineHeight: 30
    //lineHeight: 40
  }
});


export default FavoriteStar
