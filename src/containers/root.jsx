import React from 'react';
import {combineReducers, compose, applyMiddleware, createStore } from 'redux';
import {Provider} from 'react-redux';
import createLogger from 'redux-logger';


import LanguagesContainer from './languages';
import reducers from '../reducers';

const logger = createLogger({
  duration: true,
});

const reducer = combineReducers(reducers);

const store = compose(
  applyMiddleware(logger),
)(createStore)(reducer);


export default () => {
  return (
    <Provider store={store}>
      <LanguagesContainer />
    </Provider>
  );
};
