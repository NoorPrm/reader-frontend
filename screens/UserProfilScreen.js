import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSelector } from "react-redux";
import { interFontsToUse } from '../assets/fonts/fonts';

export default function UserProfilScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);

  console.log("Profil picture :", user.profilPicture);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.navigate("Parametres")}
      >
        <Text style={styles.menuText}>⋯</Text>
      </TouchableOpacity>

      <View style={styles.profileSection}>
        <Text style={styles.username}>
          {user.username}
        </Text>
        <Image
          source={
            user.profilPicture
              ? { uri: user.profilPicture }
              : require('../assets/images/whiteUser.png')
          }
          style={styles.avatar}
        />
      </View>

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

  },
  menuText: {
    fontSize: 24,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 50,
    marginBottom: 400,
    backgroundColor: "#E8DCCA",
    borderBlockColor: "#FCF8F1"
  },
  profileSection: {
  alignItems: 'center', 
},

username: {
  fontSize: 18,
  fontFamily: interFontsToUse.regular,
  marginBottom: 10,
},
});
