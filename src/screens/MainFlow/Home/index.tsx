import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import type { MainStackParamList } from '@navigation/Router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useStyles } from './styles'
import { NavigationProp, useNavigation } from '@react-navigation/native'

export default function HomeScreen() {
  const {navigate} = useNavigation<NavigationProp<MainStackParamList>>();
  const styles = useStyles();
  
  const handlePress = () => {
    navigate("Game");
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#333945" />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={[styles.buttonText, styles.title]}>Wordly Clone</Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Games Played: 0</Text>
          <Text style={styles.statsText}>Words Guessed: 0</Text>
          <Text style={styles.statsText}>Least attempts: N/A</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>PLAY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}