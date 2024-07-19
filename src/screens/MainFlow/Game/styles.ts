import {StyleSheet} from 'react-native';

export const useStyles = () => {
  return StyleSheet.create({
    container: {
      backgroundColor: '#333945',
      height: '100%',
    },
    giveUpButtonContainer: {
      alignItems: 'flex-end',
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    giveUpButton: {
      height: 45,
      width: 80,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FF3E4D',
      borderRadius: 8,
    },
    giveUpButtonText: {
      color: '#fdfdfd',
      fontWeight: '600',
      fontSize: 16,
    },
    inputContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputWrapper: {
      width: '60%',
      backgroundColor: '#535C68',
      alignItems: 'center',
      borderRadius: 8,
      paddingBottom: 8,
    },
    input: {
      opacity: 0,
      width: 0,
      height: 0,
      padding: 0,
      margin: 0,
    },
    inputText: {
      fontSize: 36,
      textAlign: 'center',
    },
    guessesContainer: {
      rowGap: 8,
      marginBottom: 24,
    },
    exactLetter: {
      backgroundColor: '#2ecc72',
    },
    rightLetter: {
      backgroundColor: '#FAC42F',
    },
    wrongLetter: {
      backgroundColor: '#2C3335',
    },
    backButton: {
      height: 100,
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3498DB',
      borderRadius: 8,
      marginTop: 24,
    },
    backButtonText: {
      color: '#fdfdfd',
      fontWeight: '600',
      fontSize: 40,
    },
    gameOverContainer: {
      alignItems: 'center',
    },
    gameOverText: {
      color: '#fdfdfd',
      fontWeight: '600',
      fontSize: 32,
      textAlign: 'center',
    },
  });
};
