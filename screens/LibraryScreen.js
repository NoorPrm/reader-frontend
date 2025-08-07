import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import { useState } from "react";
<<<<<<< HEAD
import { Image } from 'react-native';
import { TouchableOpacity } from "react-native";
=======
>>>>>>> cc6c4ec5fb75d2804538d0578038835001f67cf0

export default function LibraryScreen({ navigation }) {
  const [mangas, setMangas] = useState("mangas");
  const [bd, setBd] = useState("bd");
  const [livre, setLivre] = useState("livre");

  return (
    <View style={styles.container}>
      <Text>Ma Bibliothèque</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() =>
          navigation.navigate("BookLibraryScreen", { category: "mangas" })
        }
      >
        <Text style={styles.text}>{mangas}</Text>
        <Image
          source={require("../assets/images/BibliothequeManga.png")}
          style={styles.logo1}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.input}
        onPress={() =>
          navigation.navigate("BookLibraryScreen", { category: "bd" })
        }
      >
        <Text style={styles.text}>{bd}</Text>
        <Image
          source={require("../assets/images/BibliothequeBD.png")}
          style={styles.logo2}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.input}
        onPress={() =>
          navigation.navigate("BookLibraryScreen", { category: "livre" })
        }
      >
        <Text style={styles.text}>{livre}</Text>
        <Image
          source={require("../assets/images/BibliothequeLivre.png")}
          style={styles.logo3}
        />
      </TouchableOpacity>
<<<<<<< HEAD

=======
>>>>>>> cc6c4ec5fb75d2804538d0578038835001f67cf0
      <TouchableOpacity
        style={styles.input}
        onPress={() => navigation.navigate("BookInfos")}
      >
<<<<<<< HEAD
          <Text style={styles.text}>BookInfos</Text>
          {/*Image source={require('')} style={styles.logo3} />*/}
      </TouchableOpacity>;

=======
        <Text style={styles.text}>BookInfos</Text>
        {/*Image source={require('')} style={styles.logo3} />*/}
      </TouchableOpacity>
      ;
>>>>>>> cc6c4ec5fb75d2804538d0578038835001f67cf0
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: "#0E0E66",
    textAlign: "center",
  },
  input: {
    borderColor: "#E8DCCA",
    backgroundColor: "#FCF8F1",
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 10,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
});
