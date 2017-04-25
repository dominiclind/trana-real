import { Platform } from 'react-native';
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';
import Reactotron from 'reactotron-react-native'

let configureStore;

let enhancer;
if (__DEV__) {
  enhancer = compose(
    applyMiddleware(thunkMiddleware),
  );
} else {
  enhancer = applyMiddleware(thunkMiddleware);
}

export default function configureStore(initialState) {
  // const store = createStore(rootReducer, initialState, enhancer);
  const store = Reactotron.createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('../reducers/index'));
    });
  }
  return store;
}
