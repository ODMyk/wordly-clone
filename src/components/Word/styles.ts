import {StyleSheet} from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    wordContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      columnGap: 7,
    },
    letterContainer: {
      width: '13%',
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
    },
    letterText: {
      fontSize: 32,
      color: '#ffffff',
      fontWeight: '600',
    },
  });
};
