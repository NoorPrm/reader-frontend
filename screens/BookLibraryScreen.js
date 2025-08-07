import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image} from "react-native";
import { interFontsToUse } from '../assets/fonts/fonts';

export default function BookLibraryScreen({navigation}) {

  return (
    <View style={styles.container}>
      <View style={styles.titleMyLibraryGlobalContent}>
        <View style={styles.titleMyLibraryContent}>
          <Text style={styles.titleMyLibraryText}>MES LIVRES</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.buttonNavigateToNextScreen}
        onPress={() => navigation.navigate("BookInfos")}
      >
        <View style={styles.titleSectionContent}>
          <Text style={styles.titleSectionText}>BookInfos</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.bookContainer}>
              <Image
                source={require("../assets/images/couvlartdelaguerre.jpg")}
                style={styles.image}
              ></Image>
              <View style={styles.bookInfosContainer}>
                <Text style={styles.title}>TITRE API</Text>
                <Text style={styles.author}>@auteur API</Text>
                <Text style={styles.parutionDate}>Date de parution API</Text>
                <Text style={styles.counter}>PRESENT DANS XX BIBLIOTHEQUES SUR READER</Text>
              </View>
      </View>


      <TouchableOpacity
        style={styles.returnBtn}
        onPress={() => navigation.navigate("Library")}
      >
        <Text style={styles.txtBtn}>Retour à la bibliothèque</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
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

  // title Content
  titleMyLibraryGlobalContent: {
    marginTop: 65,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  titleMyLibraryContent: {
    borderWidth: 3,
    color: "#0E0E66",
    borderRadius: 20,
    height: 50,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF8F1",
  },
  titleMyLibraryText: {
    fontSize: 18,
    fontFamily: interFontsToUse.bold,
    textAlign: "center",
    color: "#0E0E66",
  },

  // books infos
  bookContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  bookInfosContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
  image: {
    height: 220,
    width: 140,
    margin: 10,
  },
  title: {
    fontFamily: interFontsToUse.bold,
    fontSize: 25,

    textAlign: "center",
  },
  author: {
    textAlign: "center",
    fontFamily: interFontsToUse.regular,
  },
  parutionDate: {
    textAlign: "center",
    fontFamily: interFontsToUse.regular,
  },
  counter: {
    fontSize: 15,
    fontFamily: interFontsToUse.bold,
    textAlign: "center",
  },

  // button bookinfos
  buttonNavigateToNextScreen: {
    alignItems: "center",
    width: "70%",
    height: "30%",
  },
  titleSectionContent: {
    borderWidth: 2.5,
    borderColor: "#E8DCCA",
    borderRadius: 20,
    height: 50,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF8F1",
    marginTop: 10,
  },
  titleSectionText: {
    fontSize: 17,
    fontFamily: interFontsToUse.italic,
    textAlign: "center",
    color: "#0E0E66",
  },

  // Button return
  returnBtn: {
    padding: 10,
    margin: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "#0E0E66",
    float: "left",
    width: 180,
  },
  txtBtn: {
    color: "#ffffffff",
    fontFamily: interFontsToUse.regular,
  },
});