import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import React from 'react';
import type {MainStackParamList} from '@navigation/Router';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStyles} from './styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {statsSelector} from '@store/modules/GameState/selectors';
import Animated, {
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {transform} from '@babel/core';

export default function HomeScreen() {
  const {navigate} = useNavigation<NavigationProp<MainStackParamList>>();
  const styles = useStyles();
  const stats = useSelector(statsSelector);
  const scale = useSharedValue(1);

  const handlePress = () => {
    scale.value = withSequence(withTiming(0.92, {duration: 50}), withTiming(1));
    navigate('Game');
  };

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#333945" />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={[styles.buttonText, styles.title]}>Wordly Clone</Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Games Played: {stats.games}</Text>
          <Text style={styles.statsText}>Words Guessed: {stats.wins}</Text>
          <Text style={styles.statsText}>
            Least attempts:{' '}
            {stats.leastAttempts > 0 ? stats.leastAttempts : 'N/A'}
          </Text>
        </View>
        <Animated.View style={[styles.buttonContainer, {transform: [{scale}]}]}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>PLAY</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
