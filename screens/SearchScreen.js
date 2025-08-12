import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, TextInput, Image } from "react-native";
import { useState } from "react";
import { useSelector} from 'react-redux';
import { interFontsToUse } from '../assets/fonts/fonts';

const myip = process.env.MY_IP;
const backendAdress = `${myip}`;

export default function SearchScreen({ navigation }) {

  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const token = useSelector((state) => state.user.value.token);

  const handleSearch = () => {
    // Recherche par catégorie → route userlibrary
    if (category) {
    fetch(`${backendAdress}/userlibrary/${token}/${category}`)
      .then(res => res.json())
      .then(data => {
        const books = data.map(item => item.book);
        navigation.navigate("ResultSearch", { books: books || [] });
      });
    return;
  }

    // Sinon recherche par auteur/titre → route books
    const params = new URLSearchParams();
    if (author) params.append("author", author);
    if (title) params.append("title", title);

    fetch(`${backendAdress}/books?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        navigation.navigate("ResultSearch", { books: data.books || [] });
      })
  };

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
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={styles.input}
                    placeholder="Nom de l'auteur"
                    autoCapitalize="none"
                    value={author} 
                    onChangeText={setAuthor}
                  />
                  <TouchableOpacity onPress={handleSearch}>
                    <Image source={require('../assets/images/blueLoupe.png')} style={styles.pictureLoupe}/>
                  </TouchableOpacity>
                </View>
          </View>

          <View style={styles.inputWrapper}>
              <Text style={styles.label}>Recherche par Titre</Text>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={styles.input}
                    placeholder="Titre du livre"
                    autoCapitalize="none"
                    value={title} 
                    onChangeText={setTitle}
                  />
                  <TouchableOpacity onPress={handleSearch}>
                    <Image source={require('../assets/images/blueLoupe.png')} style={styles.pictureLoupe} />
                  </TouchableOpacity>
                </View>
          </View>

          <View style={styles.inputWrapper}>
              <Text style={styles.label}>Recherche par Catégorie</Text>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={styles.input}
                    placeholder="Livres, BD ou Mangas"
                    autoCapitalize="none"
                    value={category} 
                    onChangeText={setCategory}
                  />
                  <TouchableOpacity onPress={handleSearch}>
                    <Image source={require('../assets/images/blueLoupe.png')} style={styles.pictureLoupe} />
                  </TouchableOpacity>
                </View>
          </View>

      </View>

      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => navigation.navigate("Bookedex")}
      >
        <Text style={styles.textButton}>Scanne ton livre !</Text>
        <Image source={require('../assets/images/codeBarre.png')} style={styles.pictureISBN} />
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
    width: "100%",
    alignItems: "center",
    marginTop: 70,
    marginBottom: 0,
  },

  inputWrapper: {
    position: "relative",
    marginBottom: 8,
    width: 300,
  },

  inputWithIcon: {
    flexDirection: "row",
    borderWidth: 0,
    borderColor: "#FCF8F1",
    width: 320,
    height: 80,
    paddingHorizontal: 12,
    paddingRight: 25,
    justifyContent: 'center',
  },

  label: {
    marginBottom: -9,
    paddingLeft: 18,
    fontSize: 15,
    color: "#0a0a0aff",
    fontFamily: interFontsToUse.regular,
  },

  input: {
    flex: 1,
    height: "100%",
    width: 300,
    textAlign: "left",
    paddingVertical: 0,
    borderWidth: 1,
    borderColor: "#E8DCCA",
    opacity: 0.4,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 15,
    paddingLeft: 12,
    fontFamily: interFontsToUse.regular,
  },

  pictureLoupe: {
    width: 50,
    height: 50,
    marginLeft: -60,
    marginTop: 15,
  },

  // scan button
  scanButton: {
    borderWidth: 3,
    borderColor: "#0E0E66",
    borderRadius: 10,
    height: 80,
    width: 250,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF8F1",
    fontFamily: interFontsToUse.regular,
    marginTop: 50,
  },

  textButton: {
    fontSize: 15,
    fontFamily: interFontsToUse.regular,
    textAlign: "center",
    color: "black",
  },

  pictureISBN: {
    width: 70,
    height: 70,
    marginLeft: 10,
  },
});
