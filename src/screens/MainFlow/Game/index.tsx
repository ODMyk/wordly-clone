import {View, Text, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MainStackParamList} from '@navigation/Router';
import {useStyles} from './styles';
import {MAX_ATTEMPTS_COUNT} from 'src/constants/maxAttemptsCount';
import Word from '@components/Word';

export default function GameScreen() {
  const {navigate} = useNavigation<NavigationProp<MainStackParamList>>();
  const styles = useStyles();
  const [input, setInput] = useState('');
  const [isGameOver, setGameOver] = useState(false);
  const [guesses, setGuesses] = useState(
    Array.from({length: MAX_ATTEMPTS_COUNT}).map(_ => ({
      word: '      ',
      styles: Array.from({length: 6}).map(_ => styles.wrongLetter),
    })),
  );
  const [word, setWord] = useState('');
  const [attemptsCount, setAttemptsCount] = useState(0);
  const inputRef = useRef<TextInput>(null);

  const handleBack = () => {
    navigate('Home');
  };

  const handleGiveUp = () => {
    setGameOver(true);
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
        const wordResponse = await fetch(
          'https://random-word-api.herokuapp.com/word?number=1&length=6',
        );
        if (!wordResponse.ok) {
          return;
        }
        const word = (await wordResponse.json())[0];
        setWord(word);
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

  const handleSubmit = async () => {
    if (input.length !== 6) {
      return;
    }

    if (input === word) {
      const letterColors = Array.from({length: word.length}).map(
        _ => styles.exactLetter,
      );

      setGuesses(
        guesses.map((g, i) =>
          i === attemptsCount
            ? {word: input.toUpperCase(), styles: letterColors}
            : g,
        ),
      );
      setAttemptsCount(attemptsCount + 1);
      setGameOver(true);
      return;
    }

    try {
      const checkResponse = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`,
      );
      if (!checkResponse.ok) {
        return;
      }
    } catch (err) {
      return;
    }

    if (attemptsCount + 1 === MAX_ATTEMPTS_COUNT) {
      setGameOver(true);
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
      if (wordCopy[i] === '+') {
        continue;
      }
      if (wordCopy.includes(input[i])) {
        wordCopy[wordCopy.indexOf(input[i])] = '+';
        guess[i] = '-';
        letterColors[i] = styles.rightLetter;
      }
    }

    setGuesses(
      guesses.map((g, i) =>
        i === attemptsCount
          ? {word: input.toUpperCase(), styles: letterColors}
          : g,
      ),
    );
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
          <Word word={g.word} letterStyles={g.styles} key={i} />
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
            <View style={styles.inputContainer}>
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
            </View>
          )}
        </View>
      )}
    </View>
  );
}
