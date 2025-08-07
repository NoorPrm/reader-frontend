import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';


export default function UserProfilScreen({navigation}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.navigate("Parametres")}
      >
        <Text style={styles.menuText}>⋯</Text>
      </TouchableOpacity>
      <Text>Profil de l'utilisateur.</Text>
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
    menuButton: {
    position: "absolute",
    top: 20,   
    right: 15,
    padding: 10,
    zIndex: 10,
  },
  menuText: {
    fontSize: 24,
  },
  
});