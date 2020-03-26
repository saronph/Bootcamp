import 'react-native-gesture-handler';

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import Routes from './routes';

// import { Container } from './styles';

export default function Index() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
