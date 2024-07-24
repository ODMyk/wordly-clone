import {View, Text} from 'react-native';
import React from 'react';
import {useStyles} from './styles';

export const EmptyWord = () => {
  const styles = useStyles();
  return (
    <View style={styles.row}>
      {Array.from({length: 6}).map((_, i) => (
        <View style={styles.container} key={i}>
          <Text style={styles.letter} />
        </View>
      ))}
    </View>
  );
};
