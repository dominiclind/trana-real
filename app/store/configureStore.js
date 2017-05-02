import { Platform, AsyncStorage } from 'react-native';
import {createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducer/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import Reactotron from 'reactotron-react-native'
import {persistStore, autoRehydrate} from 'redux-persist'

let configureStore;

let enhancer;
if (__DEV__) {
  enhancer = composeWithDevTools(
    {
      // Options: https://github.com/jhen0409/react-native-debugger#options
    },
  )(
    applyMiddleware(thunkMiddleware),
    autoRehydrate()
  );
} else {
  enhancer = compose(applyMiddleware(thunkMiddleware), autoRehydrate());
}

export default function configureStore(initialState) {
  // const store = createStore(rootReducer, initialState, enhancer);
  const store = Reactotron.createStore(rootReducer, initialState, enhancer)

  // persist store
  persistStore(store, {
    storage: AsyncStorage,
    whitelist: ['workout']
  })

  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('../reducer/index'));
    });
  }
  return store;
}
