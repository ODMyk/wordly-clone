import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'

import HomeScreen from '@screens/MainFlow/Home';
import GameScreen from '@screens/MainFlow/Game';

export type MainStackParamList = {
  Home: undefined;
  Game: undefined;
}

export type HomeScreenProps = NativeStackScreenProps<
  MainStackParamList,
  "Home"
>;
export type GameScreenProps = NativeStackScreenProps<
  MainStackParamList,
  "Game"
>;

const MainStack = createNativeStackNavigator<MainStackParamList>();

export default function Router() {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
        <MainStack.Screen name="Home" component={HomeScreen} />
        <MainStack.Screen name="Game" component={GameScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  )
}