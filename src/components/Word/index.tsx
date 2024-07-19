import {View, Text, ViewStyle} from 'react-native';
import React from 'react';
import {useStyles} from './styles';

export interface WordProps {
  word: string;
  letterStyles: ViewStyle[];
}

const Word = ({word, letterStyles}: WordProps) => {
  const styles = useStyles();

  return (
    <View style={styles.wordContainer}>
      {Array.from(word).map((l, i) => (
        <View style={[styles.letterContainer, letterStyles[i]]} key={i}>
          <Text style={styles.letterText}>{l}</Text>
        </View>
      ))}
    </View>
  );
};

export default Word;
