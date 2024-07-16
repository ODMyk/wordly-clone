import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import type { HomeScreenProps } from '@navigation/Router'

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View>
      <Text>Home Screen</Text>
      <TouchableOpacity
      style={{height: 40, backgroundColor: "#c3c3c3", justifyContent: "center", alignItems: "center"}}
      onPress={() => {
        navigation.navigate("Game");
      }}>
        <Text>PLAY</Text>
      </TouchableOpacity>
    </View>
  )
}