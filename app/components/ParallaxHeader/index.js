import React, { Component } from 'react';

import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import shallowCompare from 'react-addons-shallow-compare'


import StyledText from 'app/components/StyledText';

const HEADER_MAX_HEIGHT = 90;
const HEADER_MIN_HEIGHT = 65;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class ParallaxHeader extends Component {

  constructor(props) {
    super(props)

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  componentDidMount() {
  }


  render() {
    const {
      title = 'Placeholder title',
      subtitle = ' ',
      margin = false
    } = this.props;

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const headerBgColor = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
      extrapolate: 'clamp',
    });

    const backButtonTop = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [45, 25],
      extrapolate: 'clamp',
    });

    const scale = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [1.2, 1],
      extrapolate: 'clamp',
    });

    const subtitleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, 30],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    const barHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [40, 35],
      extrapolate: 'clamp',
    });
    const shadowOpacity = this.state.scrollY.interpolate({
      inputRange: [0, 200],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

  

    return (
      <View style={styles.fill}>
        
        <ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
            )}
        >
          <View style={[ styles.scrollViewContent, margin ? {marginTop: 0} : null]}>
            {this.props.children}
          </View>
        </ScrollView>
        
         <Animated.View style={[styles.header, {height: headerHeight, backgroundColor: headerBgColor}]}>
          
          <Animated.View style={[styles.headerShadow, {opacity:shadowOpacity}]}></Animated.View>
          
          <Animated.View style={[styles.bar, {height: barHeight}]}>
            <Animated.View style={[styles.titleGroup, {transform: [{scale}]}]}>
              <StyledText style={styles.title}>{title}</StyledText>
              {subtitle ? (<Animated.Text style={[styles.subtitle, {opacity: subtitleOpacity}]}>{subtitle}</Animated.Text>): null}
            </Animated.View>
          </Animated.View>
        
          <Animated.View style={[styles.backIconButton, {top: backButtonTop}]}>
            <TouchableOpacity style={{padding: 10}} onPress={this.props.onBack}>
              <Image source={require('./backbtn.png')} style={styles.backImage}/>
            </TouchableOpacity>
          </Animated.View>
        
        </Animated.View>

      </View>
    )
  }
}


// styles
const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  chart: {
    height: 200,
    backgroundColor: 'white'
  },
  fakeChart: {
    width: 375,
    resizeMode:'contain',
    position: 'absolute',
    top: -415
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    justifyContent: 'flex-end',
    overflow:'visible'
  },
  headerShadow: {
    backgroundColor: 'white',
    height: HEADER_MIN_HEIGHT,
    shadowColor: 'black',
    shadowOffset: {x: 0, y: 10},
    shadowOpacity: .3,
    shadowRadius: 15,
    left:0,
    right:0,
    top:0,
    position:'absolute'
  },
  bar: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  titleGroup: {
    alignItems: 'center',
    flex: 1
  },
  title: {
    backgroundColor: 'transparent',
    color: 'black',
    fontSize: 18,
    marginBottom: 2,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 10,
    lineHeight: 18,
    position:'relative',
    top:-3,
    backgroundColor: 'transparent'
  },
  backIconButton: {
    position: 'absolute',
    left: 5,
  },
  backImage: {
    backgroundColor: 'transparent',
    width: 24,
    height: 14,
    resizeMode: 'contain'
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT + 20,
  },
});


export default ParallaxHeader
