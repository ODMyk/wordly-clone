import {StyleSheet} from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      columnGap: 7,
    },
    container: {
      width: '13%',
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
      backgroundColor: '#2C3335',
    },
    letter: {
      fontSize: 32,
      color: '#ffffff',
      fontWeight: '600',
    },
  });
};
