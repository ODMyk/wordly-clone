import {WordProps} from '@components/Word';
import {MainStackParamList} from '@navigation/Router';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {proceedGame} from '@store/modules/AppCommon/reducer';
import {useState, useRef, useEffect} from 'react';
import {TextInput, Keyboard} from 'react-native';
import {trigger} from 'react-native-haptic-feedback';
import {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import {MAX_ATTEMPTS_COUNT} from 'src/constants/maxAttemptsCount';
import {useStyles} from './styles';

const SHAKE_OFFSET = '5deg';
const SHAKE_DURATION = 30;

export const useGame = () => {
  const {navigate} = useNavigation<NavigationProp<MainStackParamList>>();
  const styles = useStyles();
  const [input, setInput] = useState('');
  const [isGameOver, setGameOver] = useState(false);
  const [guesses, setGuesses] = useState<WordProps[]>([]);
  const [word, setWord] = useState('');
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
        // TODO find an API that allows both generate random word and check a word for existence
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
    dispatch(
      proceedGame({attempts: guesses.length + 1, isWin: word === input}),
    );
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

    if (guesses.length + 1 === MAX_ATTEMPTS_COUNT) {
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

  return {
    isGameOver,
    word,
    input,
    handleBack,
    handleInput,
    handleGiveUp,
    handleInputPress,
    inputRef,
    animatedInputStyle,
    guesses,
    handleSubmit,
    styles,
  };
};
