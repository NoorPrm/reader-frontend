import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';



export default function HomeScreen({ navigation }) {
  // const handleSubmit = () => {
  //   navigation.navigate("TabNavigator");
  // };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
  fetch('http://10.188.219.101:3000/users/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.result) {
        navigation.navigate("Inscription");
      } 
    })
};

const handleLogin = () => {
  fetch('http://10.188.219.101:3000/users/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        navigation.navigate("TabNavigator");
      } 
    })
};

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

      <ImageBackground
        source={require('../assets/images/logoBlueReader.png')}
        style={styles.logo1Container}
        imageStyle={{ resizeMode: 'contain' }}
      >
        <Image
          source={require('../assets/images/logoBlueReader.png')}
          style={styles.logo1Overlay}
        />
      </ImageBackground>

      <Image
        style={styles.frontLogo2}
        source={require('../assets/images/logoPictureReader.png')}
      />



     
      <View style={styles.inputContainer}>
        <Text style={styles.label1}>Email</Text>
        <TextInput
          style={styles.input1}
          placeholder="Entrez votre Email"
          onChangeText={(value) => setEmail(value)} value={email}
        />
        <Text style={styles.label1}>mot de passe</Text>
        <TextInput
          style={styles.input2}
          placeholder="Entrez votre mot de passe"
          onChangeText={(value) => setPassword(value)} value={password}
        />

      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Parametres')}>
        <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
      </TouchableOpacity>

      <View style={styles.ButtonGlobal}>
        <TouchableOpacity onPress={() => navigation.navigate("Inscription")} style={styles.buttonInscription} activeOpacity={0.8}>
          <Text style={styles.text1}>Créer un compte</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLogin()} style={styles.buttonConnexion} activeOpacity={0.8}>
          <Text style={styles.text2}>Connexion</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF8F1',
    alignItems: 'center',
    paddingTop: 40,
  },
  logo1Container: {
    width: 150,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 0,
  },
  logo1Overlay: {
    width: 400,
    height: 120,
    opacity: 0.5,
    position: 'absolute',
    top: 0,
    left: -125,
  },
  frontLogo2: {
    width: 160,
    height: 80,
    marginBottom: 25,
  },


  // styles input
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },

  label1: {
    fontWeight: 'bold',
    marginBottom: 1,
    fontSize: 7,
    color: 'black',
  },
  label2: {
    fontWeight: 'bold',
    marginBottom: 1,
    fontSize: 7,
    color: 'black',

  },

  input1: {
    borderWidth: 1,
    borderColor: '#E8DCCA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#ffffffff',
  },

  input2: {
    borderWidth: 1,
    borderColor: '#E8DCCA',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#ffffffff',
    marginTop: 0,
  },

  buttonInscription: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    backgroundColor: '#0E0E66',
    borderRadius: 20,
    marginTop: 40,
    marginBottom: 70,
  },
  buttonConnexion: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: 250,
    backgroundColor: '#0E0E66',
    borderRadius: 20,
    marginTop: -10,
    marginBottom: 70,
  },
  text1: {
    color: '#ffffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text2: {
    color: '#ffffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#a1b0bfff',
    fontSize: 14,
    marginTop: -13,
    textAlign: 'center',
  },

});