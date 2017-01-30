import React, { Component } from 'react';

import {
  View,
  TextInput,
  StyleSheet
} from 'react-native';

import StyledText from 'app/components/StyledText';


class WeightAndRepsInput extends Component {

  constructor(props) {
    super(props)

    this.state = {
      weight: props.weight || '',
      reps: props.reps || ''
    }
  }

  componentDidMount() {
  }

  render() {
    const { weight = 120, reps = 8} = this.props;

    return (
      <View style={ styles.component }>
        {/*<StyledText weight="book" style={styles.text}>
          {weight}
        </StyledText>*/}
        <TextInput
          value={this.state.weight}
          onChangeText={(text) => {
            this.setState({weight: text});
          }}
          onBlur={() => {
            this.props.onChange(this.state.weight, this.state.reps);
          }}
          onEndEditing={() => {
            this.props.onChange(this.state.weight, this.state.reps);  
          }}
          autoCapitalize="characters"
          autoCorrect={false}
          keyboardType="phone-pad"
          placeholder="ADD WEIGHT"
          placeholderTextColor="rgba(255,255,255,.2)"
          style={[styles.input, {fontSize: this.state.weight.length > 0 ? 120 : 30}]}
        />
        <StyledText style={[styles.text, styles.asterix]}>
          *
        </StyledText>
        <TextInput
          value={this.state.reps}
          onChangeText={(text) => {
            this.setState({reps: text});
          }}
          onBlur={() => {
            this.props.onChange(this.state.weight, this.state.reps);
          }}
          onEndEditing={() => {
            this.props.onChange(this.state.weight, this.state.reps);  
          }}
          autoCapitalize="characters"
          autoCorrect={false}
          keyboardType="phone-pad"
          placeholder="ADD REPS"
          placeholderTextColor="rgba(255,255,255,.2)"
          style={[styles.input, {fontSize: this.state.reps.length > 0 ? 120 : 30}]}
        />
        {/*<StyledText style={styles.text}>
          {reps}
        </StyledText>*/}
      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  text: {
    fontSize: 120,
    lineHeight: 120,
    height: 90,
    backgroundColor: 'transparent',
    color: 'white',
    margin: 5
  },
  input: {
    fontFamily: 'Circular-Medium',
    fontSize: 30,
    lineHeight: 120,
    height: 120,
    color: 'white',
    textAlign: 'center'
  },
  asterix: {
    fontSize: 40,
    lineHeight: 40,
    height: 20,
    marginTop: 15,
    backgroundColor: 'transparent',
  }
});


export default WeightAndRepsInput
