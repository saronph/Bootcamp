import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

export default createStackNavigator(
  createBottomTabNavigator({
    SignIn,
    SignUp,
  })
);
