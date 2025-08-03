import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {

     const handleSubmit = () => {
       navigation.navigate("TabNavigator");
     };

  return (
    <View style={styles.container}>
      <Text>Page pour se connecter/s'inscrire.</Text>

      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
        <Text>Go to GeneralScreen</Text>
      </TouchableOpacity>

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
  button: {
    alignItems: 'center',
    paddingTop: 8,
    width: '40%',
    marginTop: 30,
    backgroundColor: '#E8DCCA',
    borderRadius: 20,
    marginBottom: 80,
  },
});
