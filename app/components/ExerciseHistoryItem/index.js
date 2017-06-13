import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { getNormalizedBodyPart } from 'app/utils/workout';

import StyledText from 'app/components/StyledText';



// class ExerciseHistoryItem extends Component {

//   constructor(props) {
//     super(props)
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     //return shallowCompare(this, nextProps, nextState);
//     return false;
//   }

//   render() {
//     const { exercise , sets = [{reps: 10},{ reps: 9}]} = this.props;
//     const {
//       name = 'exercise name',
//     } = exercise;

//     const mainMuscles = exercise['Main Muscle Worked'].trim();
//     const secondary = exercise['Other Muscles'] || false;

//     return (
//       <View style={ styles.component }>
        
//         <TouchableOpacity
//           onPress={() => this.props.onPress()}
//         >
//           <View style={styles.contentContainer}>
//             <View>
//               <StyledText weight="bold" style={styles.name}>{name}</StyledText>
//               <StyledText style={styles.bodyparts}>{getNormalizedBodyPart(mainMuscles)} | {mainMuscles}</StyledText>
//             </View>

//             <Image style={styles.arrowIcon} source={require('./arrow_icon.png')}/>
//           </View>
//         </TouchableOpacity>

//         <View style={styles.sets}>
//           <ScrollView 
//             horizontal={true} 
//             style={{flex: 1}} 
//             showsHorizontalScrollIndicator={false}
//           >
//             {sets.map((set, i) => {
//               let string = '';
//               const reps = Number(set.reps);
//               const weight = Number(set.weight);
//               return (
//                 <View style={styles.set} key={i}>
//                   <StyledText weight="bold" style={styles.setText}>{reps} {weight > 0 ? `* ${weight} kg` : 'reps'}</StyledText>
//                 </View>
//               )
//             })}
//           </ScrollView>
//         </View>
//       </View>
//     )
//   }
// }


// styles
const styles = StyleSheet.create({
  component : {
    backgroundColor:'white',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#E9ECEF',
    flexDirection: 'column',
  },
  name: {
    fontSize: 15,
    paddingHorizontal: 15,
  },
  bodyparts: {
    fontSize: 12,
    marginTop:5,
    paddingHorizontal: 15,
  },
  contentContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    paddingVertical: 15
  },
  arrowIcon: {
    width: 24,
    height: 40,
    marginRight: 15,
    resizeMode: 'contain',
    backgroundColor: 'transparent'
  },
  sets: {
    backgroundColor: '#E9ECEF',
    flex: 1,
  },
  set: {
    backgroundColor: '#343A40',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius:15,
    marginLeft: 15,
    marginVertical: 10,
  },
  setText: {
    color: 'white',
    textAlign:'center'
  }
  
});


// export default ExerciseHistoryItem
export default ({ exercise,onPress, sets = [{reps: 10},{ reps: 9}]}) => (
  <View style={ styles.component }>
    
    <TouchableOpacity
      onPress={onPress}
    >
      <View style={styles.contentContainer}>
        <View>
          <StyledText weight="bold" style={styles.name}>{exercise.name}</StyledText>
          <StyledText style={styles.bodyparts}>{getNormalizedBodyPart(exercise['Main Muscle Worked'].trim())} | {exercise['Main Muscle Worked'].trim()}</StyledText>
        </View>

        <Image style={styles.arrowIcon} source={require('./arrow_icon.png')}/>
      </View>
    </TouchableOpacity>

    <View style={styles.sets}>
      <ScrollView 
        horizontal={true} 
        style={{flex: 1}} 
        showsHorizontalScrollIndicator={false}
      >
        {sets.map((set, i) => {
          let string = '';
          const reps = Number(set.reps);
          const weight = Number(set.weight);
          return (
            <View style={styles.set} key={i}>
              <StyledText weight="bold" style={styles.setText}>{reps} {weight > 0 ? `* ${weight} kg` : 'reps'}</StyledText>
            </View>
          )
        })}
      </ScrollView>
    </View>
  </View>
)