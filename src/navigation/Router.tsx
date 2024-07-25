import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';

import HomeScreen from '@screens/MainFlow/Home';
import GameScreen from '@screens/MainFlow/Game';
import {useAppStateListener} from 'src/hooks/useAppStateListener';
import {useSelector} from 'react-redux';
import {
  appStateSelector,
  statsSelector,
} from '@store/modules/GameState/selectors';
import {storage} from '@services/mmkv';
import {useDispatch} from 'react-redux';
import {restore} from '@store/modules/GameState/reducer';

export type MainStackParamList = {
  Home: undefined;
  Game: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Home'
>;
export type GameScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Game'
>;

export const EXTERNAL_CACHE_KEY = 'EXTERNAL_CACHE_KEY';

const MainStack = createNativeStackNavigator<MainStackParamList>();

export default function Router() {
  useAppStateListener();
  const appState = useSelector(appStateSelector);
  const gameState = useSelector(statsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (appState === 'background') {
      storage.set(EXTERNAL_CACHE_KEY, JSON.stringify(gameState));
    }
  }, [appState]);

  const makeALive = () => {
    const prevState = storage.getString(EXTERNAL_CACHE_KEY);
    if (prevState) {
      const state = JSON.parse(prevState);
      dispatch(restore(state));
    }
  };

  return (
    <NavigationContainer onReady={makeALive}>
      <MainStack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <MainStack.Screen name="Home" component={HomeScreen} />
        <MainStack.Screen name="Game" component={GameScreen} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
