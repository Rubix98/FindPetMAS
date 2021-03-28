import {AppRegistry} from 'react-native';
import React, {useEffect, useState, useContext, createContext} from 'react';
import App from './App';
import {AppInfoProvider} from './context/AppInfo';
console.disableYellowBox = true;
const Root = () => (
  <AppInfoProvider>
    <App />
  </AppInfoProvider>
);

AppRegistry.registerComponent('FindPetMobile', () => Root);
