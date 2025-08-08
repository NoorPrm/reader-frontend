import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, ScrollView } from "react-native";
import { interFontsToUse } from '../assets/fonts/fonts';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedBook } from "../reducers/bookSelected";
//const backendAdress = process.env.EXPO_PUBLIC_URL_BACKEND
const myip = process.env.MY_IP;
const backendAdress = `${myip}`;
console.log("Backend URL:", backendAdress);

export default function ComicLibraryScreen({navigation}) {
  const dispatch = useDispatch();
  const [books, setBooks] = useState([]);
  const token = useSelector((state) => state.user.value.token);

  useEffect(() => {
    fetch(`${backendAdress}/userLibrary/${token}/BD`)
      .then((response) => response.json())
      .then((data) => {
        console.log('data reçue:', data);
        const booksFromBackend = data.map(item => item.book);

        const countMap = {};

        booksFromBackend.forEach((book) => {
          if (countMap[book.title] === undefined) {
            countMap[book.title] = 0;
          }
          countMap[book.title] += 1;
        });

        const booksWithCount = booksFromBackend.map((book) => {
          return {
            ...book,
            count: countMap[book.title] 
          };
        });

        setBooks(booksWithCount);
      })
  }, []);

  const handleBookPress = (book) => {
    dispatch(setSelectedBook(book));
    navigation.navigate('BookInfos');
  };

  

  // const books = [
  //   {
  //     title: "L’ART DE LA GUERRE",
  //     author: "@SUN TZU",
  //     date: "600 ans av. J-C",
  //     counter: 46,
  //     image: require("../assets/images/couvlartdelaguerre.jpg"),
  //   },
  //   {
  //     title: "HARRY POTTER ET L’ENFANT MAUDIT",
  //     author: "@J.K. ROWLING",
  //     date: "14/10/2016",
  //     counter: 255,
  //     image: require("../assets/images/couvharrypotter.jpg"),
  //   },
  //   {
  //     title: "AP CHEMISTRY POUR LES NULS",
  //     author: "@PETER J. MIKULECKY",
  //     date: "23/01/2015",
  //     counter: 5,
  //     image: require("../assets/images/couvchemistryfordummies.jpg"),
  //   }
  // ];

  return (
    <View style={styles.container}>

      <View style={styles.titleMyLibraryGlobalContent}>
        <View style={styles.titleMyLibraryContent}>
          <Text style={styles.titleMyLibraryText}>BD</Text>
        </View>
      </View>

      {/* <TouchableOpacity
        style={styles.buttonNavigateToNextScreen}
        onPress={() => navigation.navigate("BookInfos")}
      >
        <View style={styles.titleSectionContent}>
          <Text style={styles.titleSectionText}>BookInfos</Text>
        </View>
      </TouchableOpacity> */}

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
      >
        {books.map((book) => (
          <TouchableOpacity 
          style={styles.bookContainer}
          onPress={() => handleBookPress(book)}
          >
            <View style={styles.bookInfosContainer}>
              <Text style={styles.title}>{book.title}</Text>
              <Text style={styles.author}>{book.author}</Text>
              <Text style={styles.parutionDate}>{book.date}</Text>
              <Text style={styles.counter}>
                PRÉSENT DANS <Text style={styles.counterBold}>{book.count}</Text> BIBLIOTHÈQUES SUR READER.
              </Text>
            </View>
            {book.cover ? (
                <Image source={{uri: book.cover}} style={styles.image} />
              ) : (
                <Image source={require('../assets/images/notAvailable.jpg')} style={styles.image} />
              )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.returnBtn}
        onPress={() => navigation.navigate("Library")}
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
  titleMyLibraryGlobalContent: {
    marginTop: 65,
    alignItems: "center",
    width: "100%",
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
    fontSize: 20,
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
