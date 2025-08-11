import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { interFontsToUse } from '../assets/fonts/fonts';

export default function SearchScreen({ navigation }) {
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"} >

      <View style={styles.titleSearchGlobalContent}>
        <View style={styles.titleSearchContent}>
          <Text style={styles.titleSearchText}>CHASSE AUX LIVRES</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>

          <View style={styles.inputWrapper}>
              <Text style={styles.label}>Recherche par Auteur</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Nom de l'auteur"
                    autoCapitalize="none"
                    // value={password}
                    // onChangeText={setPassword}
                  />
          </View>

          <View style={styles.inputWrapper}>
              <Text style={styles.label}>Recherche par Titre</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Titre du livre"
                    autoCapitalize="none"
                    // value={password}
                    // onChangeText={setPassword}
                  />
          </View>

          <View style={styles.inputWrapper}>
              <Text style={styles.label}>Recherche par Catégorie</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Catégorie : Livres, BD ou Mangas"
                    autoCapitalize="none"
                    // value={password}
                    // onChangeText={setPassword}
                  />
          </View>

      </View>

      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => navigation.navigate("Bookedex")}
      >
        <Text style={styles.textButton}>Scanne ton livre !</Text>
        {/*Image source={require('')} style={styles.logo3} />*/}
      </TouchableOpacity>

      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#FCF8F1",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  // title
  titleSearchGlobalContent: {
    marginTop: 65,
    alignItems: "center",
    width: "100%",
  },
  titleSearchContent: {
    borderWidth: 3,
    borderColor: "#0E0E66",
    borderRadius: 20,
    height: 50,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF8F1",
  },
  titleSearchText: {
    fontSize: 20,
    fontFamily: interFontsToUse.bold,
    textAlign: "center",
    color: "#0E0E66",
  },

  // styles input
  inputContainer: {
    width: "70%",
    marginTop: 80,
    marginBottom: 0,
  },

  inputWrapper: {
    position: "relative",
    marginBottom: 8,
  },

  label: {
    marginBottom: -9,
    paddingLeft: 5,
    fontSize: 15,
    color: "#0a0a0aff",
    fontFamily: interFontsToUse.regular,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E8DCCA",
    opacity: 0.4,
    borderRadius: 10,
    marginBottom: 16,
    width: 300,
    height: 80,
    fontSize: 15,
    paddingLeft: 12,
    fontFamily: interFontsToUse.regular,
    textAlign: "center",
  },

  // scan button
  scanButton: {
    borderWidth: 3,
    borderColor: "#0E0E66",
    borderRadius: 10,
    height: 80,
    width: 250,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF8F1",
    fontFamily: interFontsToUse.regular,
    marginTop: 20,
  },

  textButton: {
    fontSize: 15,
    fontFamily: interFontsToUse.regular,
    textAlign: "center",
    color: "black",
  },


});
