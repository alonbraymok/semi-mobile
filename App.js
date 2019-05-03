/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Routes from './src/Router';
import { Provider } from 'mobx-react';
import rootStores from './src/stores';




export default class App extends Component{
  render() {
    return (
      <Provider {...rootStores}>
      <Routes />
      </Provider>
    );
  }
}

