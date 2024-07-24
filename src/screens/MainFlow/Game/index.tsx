import {View, Text, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '@navigation/Router';
import {useStyles} from './styles';
import {MAX_ATTEMPTS_COUNT} from 'src/constants/maxAttemptsCount';
import Word, {WordProps} from '@components/Word';
import {proceedGame} from '@store/modules/AppCommon/reducer';
import {useDispatch} from 'react-redux';
import {trigger} from 'react-native-haptic-feedback';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {EmptyWord} from '@components/EmptyWord';

const SHAKE_OFFSET = '5deg';
const SHAKE_DURATION = 30;

export default function GameScreen() {
  const {navigate} = useNavigation<NavigationProp<MainStackParamList>>();
  const styles = useStyles();
  const [input, setInput] = useState('');
  const [isGameOver, setGameOver] = useState(false);
  const [guesses, setGuesses] = useState<WordProps[]>([]);
  const [word, setWord] = useState('');
  const [attemptsCount, setAttemptsCount] = useState(0);
  const inputRef = useRef<TextInput>(null);
  const dispatch = useDispatch();

  const inputRotation = useSharedValue('0deg');
  const animatedInputStyle = useAnimatedStyle(() => ({
    transform: [{rotateZ: inputRotation.value.toString()}],
  }));

  const shakeInput = () => {
    inputRotation.value = withRepeat(
      withSequence(
        withTiming('-' + SHAKE_OFFSET, {duration: SHAKE_DURATION}),
        withTiming('0deg', {duration: SHAKE_DURATION}),
        withTiming(SHAKE_OFFSET, {duration: SHAKE_DURATION}),
        withTiming('0deg', {duration: SHAKE_DURATION}),
      ),
      2,
    );
  };

  const handleIncorrectSubmit = () => {
    setInput('');
    shakeInput();
    trigger('notificationError');
  };

  const handleBack = () => {
    navigate('Home');
  };

  const handleGiveUp = () => {
    setGameOver(true);
    saveGame();
  };

  const handleInputPress = () => {
    if (Keyboard.isVisible()) {
      return;
    }
    inputRef.current?.blur();
    inputRef.current?.focus();
  };

  useEffect(() => {
    (async () => {
      try {
        // TODO found an API that allows both generate random word and check a word for existence
        while (true) {
          const wordResponse = await fetch(
            'https://random-word-api.herokuapp.com/word?number=1&length=6',
          );
          if (!wordResponse.ok) {
            return;
          }
          const fetchedWord = (await wordResponse.json())[0];
          const checkResponse = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${fetchedWord}`,
          );
          if (checkResponse.ok) {
            setWord(fetchedWord);
            console.log(fetchedWord);
            break;
          }
        }
      } catch {
        return;
      }
    })();
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        handleInputPress();
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const saveGame = () => {
    dispatch(proceedGame({attempts: attemptsCount + 1, isWin: word === input}));
  };

  const handleSubmit = async () => {
    if (input.length !== 6) {
      handleIncorrectSubmit();
      return;
    }

    if (input === word) {
      const letterColors = Array.from({length: word.length}).map(
        _ => styles.exactLetter,
      );

      setGuesses([
        ...guesses,
        {word: input.toLocaleUpperCase(), letterStyles: letterColors},
      ]);
      saveGame();
      setAttemptsCount(attemptsCount + 1);
      setGameOver(true);
      return;
    }

    try {
      const checkResponse = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`,
      );
      if (!checkResponse.ok) {
        handleIncorrectSubmit();
        return;
      }
    } catch (err) {
      return;
    }

    if (attemptsCount + 1 === MAX_ATTEMPTS_COUNT) {
      setGameOver(true);
      saveGame();
    }

    const guess = Array.from(input);
    const wordCopy = Array.from(word);
    const letterColors = Array.from({length: word.length}).map(
      _ => styles.wrongLetter,
    );
    for (let i = 0; i < word.length; ++i) {
      if (wordCopy[i] === guess[i]) {
        wordCopy[i] = '+';
        guess[i] = '-';
        letterColors[i] = styles.exactLetter;
      }
    }

    for (let i = 0; i < word.length; ++i) {
      if (guess[i] === '-') {
        continue;
      }
      if (wordCopy.includes(input[i])) {
        wordCopy[wordCopy.indexOf(input[i])] = '+';
        guess[i] = '-';
        letterColors[i] = styles.rightLetter;
      }
    }

    setGuesses([
      ...guesses,
      {word: input.toLocaleUpperCase(), letterStyles: letterColors},
    ]);
    setInput('');
    setAttemptsCount(attemptsCount + 1);
  };

  const handleInput = ({nativeEvent}: {nativeEvent: {key: string}}) => {
    if (nativeEvent.key === 'Backspace') {
      setInput(input.substring(0, input.length - 1));
      return;
    }
    const symbolCode = nativeEvent.key.toLocaleLowerCase().charCodeAt(0);
    if (input.length < 6 && symbolCode >= 97 && symbolCode <= 122) {
      setInput(input => input + String.fromCharCode(symbolCode));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.giveUpButtonContainer}>
        <TouchableOpacity
          style={[styles.giveUpButton, {opacity: isGameOver ? 0 : 1}]}
          onPress={handleGiveUp}>
          <Text style={styles.giveUpButtonText}>Give Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.guessesContainer}>
        {guesses.map((g, i) => (
          <Word word={g.word} letterStyles={g.letterStyles} key={i} />
        ))}
        {Array.from({length: 6 - attemptsCount}).map((_, i) => (
          <EmptyWord key={i} />
        ))}
      </View>

      {word && (
        <View>
          {isGameOver ? (
            <View style={styles.gameOverContainer}>
              <View>
                <Text style={styles.gameOverText}>
                  {word === input
                    ? 'Congratulations!!!'
                    : `You almost did it!\nThe word was "${word}"`}
                </Text>
              </View>
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Text style={styles.backButtonText}>Go Back</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Animated.View style={[styles.inputContainer, animatedInputStyle]}>
              <TouchableOpacity
                onPress={handleInputPress}
                style={styles.inputWrapper}
                activeOpacity={1}>
                <View>
                  <TextInput
                    style={styles.input}
                    autoFocus
                    value={input}
                    onKeyPress={handleInput}
                    onSubmitEditing={handleSubmit}
                    ref={inputRef}
                    blurOnSubmit={false}
                  />
                  <Text style={styles.inputText}>{input}</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      )}
    </View>
  );
}
