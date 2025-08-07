import { StatusBar  } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from "react";

export default function GeneralScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Bienvenue sur votre feed général pour suivre les actualités et tendances du moment !</Text>
      <TouchableOpacity
              style={styles.input}
              onPress={() => navigation.navigate("StoryScreen")}
            ></TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});