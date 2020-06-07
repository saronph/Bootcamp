import 'react-native-gesture-handler';
import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import './config/ReactotronConfig';

import {store, persistor} from './store';
import App from './App';

// import { Container } from './styles';

export default function Index() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

          <App />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}