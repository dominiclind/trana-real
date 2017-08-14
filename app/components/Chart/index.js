import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native';

const CHART_HEIGHT = 200;

const { width, height } = Dimensions.get('window');

class Chart extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={ styles.component }>
        <ScrollView 
          horizontal
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight)=>{
            console.log(contentWidth)
            this.scrollView.scrollTo({x: (contentWidth - width),y:0, animated: true});
          }}
          style={styles.scroller}
          contentContainerStyle={[
            styles.containerStyle, 
            {
              paddingRight: (width / 2) - (50 / 2),
              paddingLeft: (width / 2) - (50 / 2)
            }
          ]}
        >
          {this.props.data.map((entry, index) => {
            const max = Math.max(...this.props.data.map(entry => entry.repmax));
            const min = Math.min(...this.props.data.map(entry => entry.repmax));
            const spann = max - (min * 0.9);
            let height = 200;

            if(entry.repmax !== max){
              let diff = entry.repmax - (min * .9);
              height = (diff / spann) * CHART_HEIGHT;
            }
          
            return (
              <View key={index} style={[styles.data, {height}]}/>
            )
          })}
        </ScrollView>

        <View style={styles.valuesRightSticky}>
          {this.props.data.map((entry, index) => {
              const max = Math.max(...this.props.data.map(entry => entry.repmax));
              const min = Math.min(...this.props.data.map(entry => entry.repmax));
              const spann = max - (min * 0.9);
              let height = CHART_HEIGHT;

              if(entry.repmax !== max){
                let diff = entry.repmax - (min * .9);
                height = (diff / spann) * CHART_HEIGHT;
              }
              

              return (
                <View key={index} style={[styles.valueItem,{top: (CHART_HEIGHT - 40) - height}]}><Text>{Math.round(entry.repmax)}</Text></View>
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
    backgroundColor:'red',
    position: 'relative'
  },
  scroller: {
    backgroundColor:'rgba(55,33,21,0.4)',
  },
  containerStyle: {
    alignItems: 'flex-end',
    paddingTop: 40
  },
  data: {
    width: 50,
    position:'relative',
    backgroundColor: 'blue'
  },
  valuesRightSticky: {
    flexDirection: 'column',
    position:'absolute',
    top:0,
    left:0,
    bottom:0,
    backgroundColor: 'rgba(255,255,255,.3)'
  },
  valueItem: {
    backgroundColor: 'green'
  }
});


export default Chart
