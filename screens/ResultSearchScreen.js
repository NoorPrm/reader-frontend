import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, ScrollView } from "react-native";
import { interFontsToUse } from '../assets/fonts/fonts';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedBook } from "../reducers/bookSelected";
//const backendAdress = process.env.EXPO_PUBLIC_URL_BACKEND
const myip = process.env.MY_IP;
const backendAdress = `${myip}`;


export default function ResultSearchScreen({navigation}) {

  const books = useSelector((state) => state.searchResults.books);
  const dispatch = useDispatch();

  const handleBookPress = (book) => {
    dispatch(setSelectedBook(book));
    navigation.navigate('BookInfos');
  };
  // const books = [
  //   {
  //     title: "L’ART DE LA GUERRE",
  //     author: "@SUN TZU",
  //     publishedDate: "600 ans av. J-C",
  //     count: 46,
  //     cover: require("../assets/images/couvlartdelaguerre.jpg"),
  //   },
  //   {
  //     title: "HARRY POTTER ET L’ENFANT MAUDIT",
  //     author: "@J.K. ROWLING",
  //     publishedDate: "14/10/2016",
  //     count: 255,
  //     cover: require("../assets/images/couvharrypotter.jpg"),
  //   },
  //   {
  //     title: "AP CHEMISTRY POUR LES NULS",
  //     author: "@PETER J. MIKULECKY",
  //     publishedDate: "23/01/2015",
  //     count: 5,
  //     cover: require("../assets/images/couvchemistryfordummies.jpg"),
  //   }
  // ];

  return (
    <View style={styles.container}>
      <View style={styles.titleResultGlobalContent}>
        <View style={styles.titleResultContent}>
          <Text style={styles.titleResultText}>Trouvailles de l'apprenti chasseur</Text>
        </View>
      </View>

      <ScrollView
              contentContainerStyle={styles.content}
              showsVerticalScrollIndicator={true}
            >
              {books.length === 0 ? (
                  <View style={styles.resultNotFound}>
                    <Text style={styles.resultNotFoundText}>
                      Oups, la recherche n'a rien donnée... 
                    </Text>
                  </View>
            ) : (
              books.map((book, i) => (
                  <TouchableOpacity 
                  key={i}
                  style={styles.bookContainer}
                  onPress={() => handleBookPress(book)}
                  >
                    <View style={styles.bookInfosContainer}>
                      <Text style={styles.title}>{book.title}</Text>
                      <Text style={styles.author}>{book.author}</Text>
                      <Text style={styles.parutionDate}>{book.publishedDate}</Text>
                      <Text style={styles.counter}>
                        PRÉSENT DANS <Text style={styles.counterBold}>{book.count}1</Text> BIBLIOTHÈQUE SUR READER.
                      </Text>
                    </View>
                    {book.cover ? (
                        <Image source={{uri: book.cover}} style={styles.image} />
                      ) : (
                        <Image source={require('../assets/images/notAvailable.jpg')} style={styles.image} />
                      )}
                  </TouchableOpacity>
              ))
            )}
            </ScrollView>

      <TouchableOpacity
        style={styles.returnBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.txtBtn}>Retour à la Bibliothèque</Text>
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

  // title
  titleResultGlobalContent: {
    marginTop: 65,
    alignItems: "center",
    width: "100%",
  },
  titleResultContent: {
    borderWidth: 3,
    borderColor: "#0E0E66",
    borderRadius: 20,
    height: 50,
    width: 320,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF8F1",
  },
  titleResultText: {
    fontSize: 17,
    fontFamily: interFontsToUse.bold,
    textAlign: "center",
    color: "#0E0E66",
  },

  // button BookInfos
  buttonNavigateToNextScreen: {
    alignItems: "center",
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

  // Result not found
  resultNotFound: {
    alignItems: "center", 
    marginTop: 200,
  },
  resultNotFoundText: {
    fontFamily: interFontsToUse.boldItalic, 
    fontSize: 16, 
    color: "#0E0E66",
  },

  // books list
  content: {
    paddingTop: 30,
    paddingHorizontal: 15,
    marginTop: 5,
    width: "100%",
  },
  bookContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 25,
    width: "100%",
  },
  image: {
    width: 90,
    height: 130,
    resizeMode: "cover",
    borderRadius: 3,
    marginLeft: 10,
    alignSelf: "flex-start",
  },
  bookInfosContainer: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontFamily: interFontsToUse.bold,
    fontSize: 14,
    color: "#0E0E66",
    marginBottom: 2,
  },
  author: {
    fontFamily: interFontsToUse.bold,
    fontSize: 12,
    color: "#0E0E66",
    marginBottom: 5,
  },
  parutionDate: {
    fontFamily: interFontsToUse.regular,
    fontSize: 11,
    color: "#0E0E66",
    marginBottom: 2,
  },
  counter: {
    fontFamily: interFontsToUse.italic,
    fontSize: 11,
    color: "#0E0E66",
  },
  counterBold: {
    fontFamily: interFontsToUse.bold,
    fontSize: 11,
    color: "#0E0E66",
  },

  // return button
  returnBtn: {
    padding: 10,
    margin: 10,
    marginBottom: 60,
    borderRadius: 5,
    backgroundColor: "#0E0E66",
    float: "left",
    width: 180,
  },
  txtBtn: {
    color: "#FFFFFF",
    fontFamily: interFontsToUse.regular,
    fontSize: 14,
  },
});
