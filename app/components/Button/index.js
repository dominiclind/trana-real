import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated
} from 'react-native';
import onecolor from 'onecolor';

import StyledText from 'app/components/StyledText';

class Button extends Component {

  constructor(props) {
    super(props)
    this.state = {
      down: false,
      downAnim: new Animated.Value(0)
    }
  }

  componentDidMount() {
  }

  _onPressIn() {
    const { bg = '#343A40', color = 'white' } = this.props;
    Animated.timing(this.state.downAnim, {
      toValue: 1,
      duration: 60
    }).start();
    this.setState({ down: true });
  }
  _onPressOut() {
    Animated.timing(this.state.downAnim, {
      toValue: 0,
      duration: 150
    }).start();
    this.setState({ down: false });
  }
  render() {
    const { pill = true, small = true, bg = '#212529', color = 'white', style} = this.props;
    const { down } = this.state;
    const darkerBG = onecolor(bg).black(.3);
    const colorAnim = this.state.downAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [
        onecolor(bg).cssa(),
        darkerBG.cssa()
      ]
    });
    const colorStyle = {
      backgroundColor: colorAnim
    };
    const shadowOpacity = this.state.downAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [ 0.5, .7]
    });
    const shadowHeight = this.state.downAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [10, 5]
    });
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}
        onPressIn={() => this._onPressIn()}
        onPressOut={() => this._onPressOut()}
      >
        <Animated.View style={[
            styles.component,
            this.props.pill ? styles.pill : {},
            this.props.small ? styles.small : {},
            // color
            colorStyle,
            style || {},
          ]}
        >
          <StyledText weight="bold" style={[
              styles.text,
              { color: onecolor(color).black(.05).css() },
              this.props.small ? styles.smallText : {}
            ]}
          >
            {this.props.children.toUpperCase()}
          </StyledText>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}


// styles
const FONT_SIZE = 16;
const HEIGHT = FONT_SIZE * 3.5;
const PADDING = HEIGHT * 0.8;
const SMALL_MODIFIER = 0.7;
const styles = StyleSheet.create({
  component : {
    paddingHorizontal: PADDING,
    height: HEIGHT,
    // borderRadius: HEIGHT / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: PADDING * .2,
    // shadowOffset: {
    //   width: 0,
    //   height: 10
    // },
    // shadowRadius: 10,
    // shadowOpacity: .55
  },
  pill : {
    borderRadius: HEIGHT / 2
  },
  small: {
    height: HEIGHT * SMALL_MODIFIER,
    paddingHorizontal: PADDING * SMALL_MODIFIER
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: FONT_SIZE,
  },
  smallText: {
    fontSize: FONT_SIZE * SMALL_MODIFIER,
    fontWeight: '700',
    letterSpacing: 1
  }
});


export default Button;
