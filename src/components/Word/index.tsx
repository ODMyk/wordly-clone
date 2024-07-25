import {View, ViewStyle} from 'react-native';
import React, {useEffect} from 'react';
import {useStyles} from './styles';
import Animated, {
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export interface WordProps {
  word: string;
  letterStyles: ViewStyle[];
}

const DELAY = 80;
const JUMP_HEIGHT = 10;
const JUMP_DURATION = 180;

const Word = ({word, letterStyles}: WordProps) => {
  const styles = useStyles();
  const letterOffsets = Array.from({length: word.length}).map(() =>
    useSharedValue(0),
  );
  const letterScales = Array.from({length: word.length}).map(() =>
    useSharedValue(0),
  );

  useEffect(() => {
    for (let i = 0; i < word.length; ++i) {
      letterOffsets[i].value = withDelay(
        DELAY * i,
        withSequence(
          withTiming(-JUMP_HEIGHT, {duration: JUMP_DURATION}),
          withTiming(0, {duration: JUMP_DURATION}),
        ),
      );

      letterScales[i].value = withDelay(
        DELAY * i,
        withTiming(1, {duration: JUMP_DURATION * 2}),
      );
    }
  }, []);

  return (
    <View style={styles.wordContainer}>
      {Array.from(word).map((l, i) => (
        <Animated.View
          style={[
            styles.letterContainer,
            letterStyles[i],
            {transform: [{translateY: letterOffsets[i]}]},
          ]}
          key={i}>
          <Animated.Text
            style={[
              styles.letterText,
              {transform: [{scale: letterScales[i]}]},
            ]}>
            {l}
          </Animated.Text>
        </Animated.View>
      ))}
    </View>
  );
};

export default Word;
