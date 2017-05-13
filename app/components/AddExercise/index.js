import React, { Component } from 'react';
import ImmutableListView from 'react-native-immutable-list-view';
import Immutable from 'immutable';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';


import {warn, log} from 'app/utils/log';

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

import {byNonChosen, byName, byBodypart} from 'app/utils/filter';

import { getExercises, getBodybuildingExercises } from 'app/utils/api';

import Paragraph from 'app/components/Paragraph';
import Button from 'app/components/Button';
import ExerciseListItem from 'app/components/ExerciseListItem';
import ExerciseListItemSmall from 'app/components/ExerciseListItemSmall';
import FilterList from 'app/components/FilterList';
import StyledText from 'app/components/StyledText';

import Firebase from 'app/stores/Firebase';


const SEARCH_LENGTH = 2;

class AddExercise extends Component {

  constructor(props) {
    super(props)

    this.state = {
      search : '',
      filter: false
    };
  }

  componentDidMount() {
    getBodybuildingExercises().then(exercises => {
      this.setState({exercises});
    });
  }

  addExercise(exercise) {
    this.props.addExercise(exercise);
    this.setState({search: ''});
  }
  _filter(exercises, chosenExercises, immutable, featured = []){
    const { search } = this.state;
    
    const chosen = chosenExercises.map(e => e.name.toLowerCase());
    const featuredE = featured.map(e => e.name.toLowerCase());
   
    let found = [];
    if (search.length > SEARCH_LENGTH) {
      found = byNonChosen(exercises, chosen);
      found = byNonChosen(found, featuredE);
      found = byName(found, search);
    }

    const all = {};
    found.forEach(exercise => {
      all[exercise.id] = exercise;
    });

    if(immutable){ 
      return Immutable.fromJS({
        'All Exercises': all,
      });
    } else {
      return all
    }
  }

  renderExerciseListItem(rowData) {
    const exercise = rowData.toJS();
    return (
      <ExerciseListItem
        exercise={exercise}
        onAdd={() => this.addExercise(exercise)}
      />
    )
  }

  renderSectionHeader(sectionHeader, data) {
    return (
      <Paragraph
        weight="bold"
        style={styles.sectionHeader}
      >
      {data.toUpperCase()}
      </Paragraph>
    )
  }

  render() {
    const {
      exercises = false,
      all = false,
      featured = [],
      filters,
    } = this.props;

    console.log('hey');

    return (
      <ScrollView style={ styles.component }>
        <Paragraph style={{paddingLeft: 20, marginTop:80}} weight="bold">Top Exercises</Paragraph>
        {Object.keys(this._filter(featured, exercises, false)).map((key, index) => {
          const $e = this._filter(featured, exercises, false)[key];
          return (
            <ExerciseListItemSmall
              key={index}
              exercise={$e}
              onAdd={() => this.addExercise($e)}
            />
          )
        })} 
        
        <View style={styles.inputWrap}>
          <View style={styles.searchInput}>
            <Icon name="md-search" style={styles.searchIcon}/>
            <TextInput
              value={this.state.search}
              onChangeText={(text) => this.setState({search: text})}
              autoCapitalize="characters"
              autoCorrect={false}
              placeholderTextColor="rgba(255,255,255,.4)"
              placeholder={`Type at least ${SEARCH_LENGTH+1} characters`}
              style={styles.input}
            />
            <TouchableWithoutFeedback
              onPress={() => this.setState({showFilter: !this.state.showFilter})
            }>
              <View>
                <Icon style={[styles.searchIcon, styles.filterBtn]} name="md-more"/>
                {filters.bodyparts.length ? (
                  <StyledText weight="bold" style={[styles.filterCount]}>{filters.bodyparts.length}</StyledText>
                ) : null}
              </View>
            </TouchableWithoutFeedback>
          </View>
          {this.state.showFilter ? (
            <FilterList filters={filters} toggleBodypart={(bodypart) => this.props.toggleBodypart(bodypart)}/>
          ): null}
        </View>

        <Paragraph style={{paddingLeft: 20, marginTop:20}} weight="bold">All the others...</Paragraph>
        {Object.keys(this._filter(all, exercises, false, featured)).map((key, index) => {
          const $e = this._filter(all, exercises, false, featured)[key];
          return (
            <ExerciseListItemSmall
              key={index}
              exercise={$e}
              onAdd={() => this.addExercise($e)}
            />
          )
        })}

      </ScrollView>
    )
  }
}


// styles
const styles = StyleSheet.create({
  component : {
    backgroundColor:'rgba(0,0,0,.07)',
    flex: 1,
  },
  inputWrap: {
    position: 'absolute',
    top:0,
    left:0,
    right:0
  },
  searchInput: {
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'center',
    //paddingLeft: 10
  },
  searchIcon: {
    fontSize: 32,
    backgroundColor: 'transparent',
    color: 'white',
    marginHorizontal: 20
  },
  filterBtn: {
    color:'white',
    width: 40,
    marginHorizontal:10,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  input: {
    fontSize: 18,
    fontFamily: 'Circular-bold',
    height: 60,
    color: 'white',
    flex: 1,
    paddingHorizontal: 0,
  },
  filterCount: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    color: 'black',
    borderColor: 'black',
    borderWidth: 2,
    fontSize: 13,
    textAlign: 'center',
    justifyContent: 'center',
    lineHeight: 20,
    position:'absolute',
    top:-2,
    right:9
  },
  sectionHeader: {
    marginBottom: 0,
    padding: 15,
    backgroundColor: 'black',
    color:'white'
  }
});


export default AddExercise
