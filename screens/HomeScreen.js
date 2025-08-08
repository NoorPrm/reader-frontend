import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { interFontsToUse } from "../assets/fonts/fonts";
import { useState } from "react";
// import { LOCAL_IP } from "@env";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//const backendAdress = process.env.EXPO_PUBLIC_URL_BACKEND;
const myip = process.env.MY_IP;
const backendAdress = `${myip}`;
console.log("Backend URL:", backendAdress);

export default function HomeScreen({ navigation }) {
  // const handleSubmit = () => {
  //   navigation.navigate("TabNavigator");
  // };

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignUp = () => {
    //console.log("handleSignUp appelée")

    let hasError = false;

    if (email === "") {
      setEmailError("Champ obligatoire");
      hasError = true;
    } else if (!EMAIL_REGEX.test(email)) {
      setEmailError("Adresse email invalide");

      console.log(EMAIL_REGEX.test(email));
      hasError = true;
    } else {
      setEmailError("");
    }

    if (password === "") {
      setPasswordError("Champ obligatoire");
      hasError = true;
    } else {
      setPasswordError("");
    }

    // si erreur : pas de fetch
    // console.log("hasError:", hasError);
    if (hasError) {
      return;
    }

    console.log("URL fetch :", `${backendAdress}/users/signup`);
    fetch(`${backendAdress}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data reçue:", data);
        if (data.result) {
          dispatch(
            login({
              token: data.token,
              email: email,
            })
          );
          navigation.navigate("Inscription");
        }
      });
  };

  const handleLogin = () => {
    let hasError = false;
    console.log(email, password, backendAdress);
    if (email === "") {
      setEmailError("Champ obligatoire");
      hasError = true;
    } else if (!EMAIL_REGEX.test(email)) {
      setEmailError("Adresse email invalide");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (password === "") {
      setPasswordError("Champ obligatoire");
      hasError = true;
    } else {
      setPasswordError("");
    }

    // si erreur : pas de fetch
    if (hasError) {
      return;
    }
    fetch(`${backendAdress}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          navigation.navigate("TabNavigator");
          dispatch(
            login({
              token: data.token,
              username: data.username,
              email: data.email,
              statut: data.statut,
              profilPicture: data.profilPicture,
            })
          );
        }
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={require("../assets/images/logoBlueReader.png")}
        style={styles.logo1Container}
        imageStyle={{ resizeMode: "contain" }}
      >
        <Image
          source={require("../assets/images/logoBlueReader.png")}
          style={styles.logo1Overlay}
        />
      </ImageBackground>

      <Image
        style={styles.frontLogo2}
        source={require("../assets/images/logoPictureReader.png")}
      />

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          {emailError !== "" && (
            <Text style={styles.errorText}>{emailError}</Text>
          )}

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
          {passwordError !== "" && (
            <Text style={styles.errorText}>{passwordError}</Text>
          )}
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

      <TouchableOpacity
        onPress={() => navigation.navigate("Parametres")}
        style={styles.forgotPasswordContainer}
      >
        <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
      </TouchableOpacity>

      <View style={styles.ButtonGlobal}>
        <TouchableOpacity
          onPress={() => handleSignUp()}
          style={styles.buttonInscription}
          activeOpacity={0.8}
        >
          <Text style={styles.text1}>Créer un compte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleLogin()}
          style={styles.buttonConnexion}
          activeOpacity={0.8}
        >
          <Text style={styles.text2}>Se connecter</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
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
    marginTop: 10,
    marginTop: 10,
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
    fontFamily: interFontsToUse.regular,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E8DCCA",
    borderRadius: 10,
    marginBottom: 0,
    height: 80,
    fontSize: 15,
    paddingLeft: 12,
    fontFamily: interFontsToUse.regular,
    textAlign: "center",
  },

  errorText: {
    position: "absolute",
    top: 0,
    right: 5,
    color: "red",
    fontFamily: interFontsToUse.regular,
    fontSize: 13,
  },

  ButtonGlobal: {
    gap: 10,
    alignItems: "center",
    backgroundColor: "#fffff",
    paddingLeft: 150,
    paddingRight: 150,
    marginTop: 30,
    marginTop: 30,
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
    marginTop: -15,
    marginTop: -15,
    marginBottom: 70,
  },
  text1: {
    color: "#ffffffff",
    fontSize: 16,
    fontFamily: interFontsToUse.regular,
  },
  text2: {
    color: "#ffffffff",
    fontSize: 16,
    fontFamily: interFontsToUse.regular,
  },
  forgotPassword: {
    color: "#888c90ff",
    fontSize: 14,
    fontFamily: interFontsToUse.regular,
    marginTop: 5,
    marginTop: 5,
    textAlign: "center",
  },
  forgotPasswordContainer: {
    margin: -15,
  },
});
