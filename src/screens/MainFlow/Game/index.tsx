import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {MAX_ATTEMPTS_COUNT} from 'src/constants/maxAttemptsCount';
import Word from '@components/Word';
import Animated from 'react-native-reanimated';
import {EmptyWord} from '@components/EmptyWord';
import {useGame} from './useGame';

export default function GameScreen() {
  const {
    animatedInputStyle,
    guesses,
    handleBack,
    styles,
    handleInput,
    handleSubmit,
    isGameOver,
    handleGiveUp,
    handleInputPress,
    input,
    word,
    inputRef,
  } = useGame();

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
        {Array.from({length: MAX_ATTEMPTS_COUNT - guesses.length}).map(
          (_, i) => (
            <EmptyWord key={i} />
          ),
        )}
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
