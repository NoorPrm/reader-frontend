import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default function HomeScreen({ navigation }) {
  // const handleSubmit = () => {
  //   navigation.navigate("TabNavigator");
  // };
  // const handleSubmit = () => {
  //   navigation.navigate("TabNavigator");
  // };

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignUp = () => {

  let hasError = false;

    if (email === '') {
      setEmailError('Champ obligatoire');
      hasError = true;
    } else if (!EMAIL_REGEX.test(email)) {
      setEmailError('Adresse email invalide');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (password === '') {
      setPasswordError('Champ obligatoire');
      hasError = true;
    } else {
      setPasswordError('');
    }

    // si erreur : pas de fetch
    if (hasError) {
      return;
    }

  fetch('http://192.168.1.17:3000/users/signup', {
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

  let hasError = false;

    if (email === '') {
      setEmailError('Champ obligatoire');
      hasError = true;
    } else if (!EMAIL_REGEX.test(email)) {
      setEmailError('Adresse email invalide');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (password === '') {
      setPasswordError('Champ obligatoire');
      hasError = true;
    } else {
      setPasswordError('');
    }

    // si erreur : pas de fetch
    if (hasError) {
      return;
    }

  fetch('http://192.168.1.17:3000/users/signin', {
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

        <View style={styles.inputWrapper}>
          {emailError !== '' && <Text style={styles.errorText}>{emailError}</Text>}
        
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre Email"
            autoCapitalize="none" 
            keyboardType="email-address"
            textContentType="emailAddress" //autocomplétion IOS
            autoComplete="email" // autocomplétion Android
            onChangeText={(value) => setEmail(value)} 
            value={email}
          />
        
        </View>
        
        <View style={styles.inputWrapper}>
          {passwordError !== '' && <Text style={styles.errorText}>{passwordError}</Text>}
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            placeholder="Entrez votre mot de passe"
            autoCapitalize="none" 
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)} 
            value={password}
          />

        </View>

      </View>


      <TouchableOpacity onPress={() => navigation.navigate('Parametres')}>
        <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
      </TouchableOpacity>

      <View style={styles.ButtonGlobal}>
        <TouchableOpacity onPress={() => handleSignUp()} style={styles.buttonInscription} activeOpacity={0.8}>
          <Text style={styles.text1}>Créer un compte</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLogin()} style={styles.buttonConnexion} activeOpacity={0.8}>
          <Text style={styles.text2}>Se connecter</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />

    </KeyboardAvoidingView>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF8F1",
    alignItems: "center",
    paddingTop: 40,
  },
  logo1Container: {
    width: 250,
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0,
    marginTop: 0,
  },
  logo1Overlay: {
    width: 400,
    height: 80,
    opacity: 0.15,
    position: "absolute",
    top: 25,
    left: -70,
  },
  frontLogo2: {
    width: 220,
    height: 100,
    marginBottom: 30,
  },

  // styles input
  inputContainer: {
    width: "80%",
    marginTop: 25,
    marginBottom: 0,
  },

  inputWrapper: {
    position: "relative",
    marginBottom: 16,
  },

  label: {
    marginBottom: -20,
    paddingLeft: 5,
    fontSize: 13,
    color: "#5c5c5c",
    fontFamily: "Inter_400Regular",
  },

  input: {
    borderWidth: 1,
    borderColor: "#E8DCCA",
    borderRadius: 10,
    marginBottom: 16,
    height: 80,
    fontSize: 15,
    paddingLeft: 12,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
  },

  errorText: {
    position: "absolute",
    top: 0,
    right: 5,
    color: "red",
    fontFamily: "Inter_400Regular",
    fontSize: 13,
  },

  ButtonGlobal: {
    gap: 10,
    alignItems: "center",
    backgroundColor: "#fffff",
    paddingLeft: 150,
    paddingRight: 150,
    marginTop: 50,
  },

  buttonInscription: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: 200,
    backgroundColor: "#0E0E66",
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 30,
  },
  buttonConnexion: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: 200,
    backgroundColor: "#0E0E66",
    borderRadius: 30,
    marginTop: -10,
    marginBottom: 70,
  },
  text1: {
    color: "#ffffffff",
    fontSize: 16,
    fontFamily: "Inter_400Regular",
  },
  text2: {
    color: "#ffffffff",
    fontSize: 16,
    fontFamily: "Inter_400Regular",
  },
  forgotPassword: {
    color: "#888c90ff",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    marginTop: 25,
    textAlign: "center",
  },
});