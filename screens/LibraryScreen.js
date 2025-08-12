import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity  } from 'react-native';
import { interFontsToUse } from '../assets/fonts/fonts';

const categories = [
  {
    title: 'LIVRES',
    image: require('../assets/images/BibliothequeLivre.png'),
    component: 'BookLibrary',
  },
  {
    title: 'BD',
    image: require('../assets/images/BibliothequeBD.png'),
    component: 'ComicLibrary',
  },
  {
    title: 'MANGAS',
    image: require('../assets/images/BibliothequeManga.png'),
    component: 'MangaLibrary',
  },
];

export default function LibraryScreen({navigation}) {

  return (
    <View style={styles.container}>

    <View style={styles.titleMyLibraryGlobalContent}>
      <View style={styles.titleMyLibraryContent}>
        <Text style={styles.titleMyLibraryText}>MA BIBLIOTHEQUE</Text>
      </View>
    </View> 

    {categories.map((category,i) => (
        <View key={i} style={styles.sectionGlobalContent}>
          <Image source={category.image} style={styles.logo1} resizeMode="contain"/>
          <TouchableOpacity
            style={styles.buttonNavigateToNextScreen}
            onPress={() => navigation.navigate(category.component)}
          >
            <View style={styles.titleSectionContent}>
              <Text style={styles.titleSectionText}>{category.title}</Text>
            </View>
          </TouchableOpacity>
        </View>
    ))}
    
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
    borderColor: "#0E0E66",
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

  // section Content
  sectionGlobalContent: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 0,
    width: "100%",
    height: "25%",
  },
  logo1: {
    marginBottom: 0.015,
    alignItems: "flex-start",
    width: "90%",
    height: "70%",
  },
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
});