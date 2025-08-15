import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearSelectedBook } from "../reducers/bookSelected";
import {
  StyleSheet,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import BookReviews from "../screens/BookReviews";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { interFontsToUse } from "../assets/fonts/fonts";
//import defaultCover from "../assets/images/defaultCover.jpg";
//const backendAdress = process.env.EXPO_PUBLIC_URL_BACKEND;
const myip = process.env.MY_IP;
const backendAdress = `${myip}`;
//console.log("Backend URL:", backendAdress);

export default function BookScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [totalReviews, setTotalReviews] = useState("");
  const [allReviews, setAllReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [bookId, setBookId] = useState(null);
  const [bookData, setBookData] = useState(null);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [libMsg, setLibMsg] = useState("");
  const [libMsgColor, setLibMsgColor] = useState("");
  const userToken = useSelector((state) => state.user.value.token);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const selectedBook = useSelector((state) => state.bookSelected.selectedBook);

  useEffect(() => {
    const reduxBookId = selectedBook._id;
    setBookId(reduxBookId);
  }, []);

  useEffect(() => {
    if (!bookId) return;

    fetch(`${backendAdress}/books/${bookId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log("Erreur: ", data.error);
        } else {
          setBookData(data);
        }
      })
      .catch((err) => {
        console.log("Erreur lors du fetch :", err);
      });

    fetch(`${backendAdress}/reviews/${bookId}`)
      .then((res) => res.json())
      .then((data) => {
        setAllReviews(data.reviews || []);
        setAverageRating(data.averageRating);
        setTotalReviews(data.reviews.length);
      })
      .catch((err) => {
        console.log("Erreur lors du fetch des avis :", err);
      });
  }, [bookId]);

  const handleSaveToUserLibrary = () => {
    if (!selectedCategory || !bookId) return;

    fetch(`${backendAdress}/userLibrary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: userToken,
        bookId: bookId,
        category: selectedCategory,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setLibMsg(data.error);
          setLibMsgColor("#ff0000ff");
          return;
        }
        console.log(userToken, bookId, selectedCategory);
        console.log("Ajout dans userLibrary :", data);
        setLibMsg("Livre ajouté à ta bibliothèque !");
        setLibMsgColor("#2e7d32");
        setTimeout(() => {
          setSecondModalVisible(false);
          setSelectedCategory(null);
          setBookId(null);
          setLibMsg("");
        }, 900);
      })
      .catch((err) => {
        console.log("Erreur userLibrary :", err.message);
      });
  };

  //Validation de la note + avis
  const postReview = () => {
    fetch(`${backendAdress}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: userToken,
        bookId,
        rating,
        review,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log("Erreur :", data.error);
          return;
        }
        setModalVisible(false);
        setRating(0);
        setReview("");
        fetch(`${backendAdress}/reviews/${bookId}`)
          .then((res) => res.json())
          .then((data) => {
            setAllReviews(data.reviews || []);
            setAverageRating(data.averageRating);
            setTotalReviews(data.reviews.length);
          });
      })
      .catch((err) => {
        console.log("Erreur lors de l'envoi de l'avis :", err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.returnBtn}
        onPress={() => {
          dispatch(clearSelectedBook());
          navigation.goBack();
        }}
      >
        <Text style={styles.txtBtn}>Retour</Text>
      </TouchableOpacity>

      <View style={styles.bookContainer}>
        {selectedBook.cover ? (
          <Image source={{ uri: selectedBook.cover }} style={styles.image} />
        ) : (
          <Image
            source={require("../assets/images/notAvailable.jpg")}
            style={styles.image}
          />
        )}
        <View style={styles.bookInfosContainer}>
          {bookData && <Text style={styles.title}>{bookData.title}</Text>}
          {bookData && <Text style={styles.author}>{bookData.author}</Text>}
          {bookData && (
            <Text style={styles.parutionDate}>
              Publié le {bookData.publishedDate}
            </Text>
          )}
          <Text style={styles.synopsisTitle}>RESUME</Text>
          <View style={styles.synopsisScrollContainer}>
            <ScrollView>
              {bookData && (
                <Text style={styles.synopsisTxt}>{bookData.synopsis}</Text>
              )}
            </ScrollView>
          </View>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setSecondModalVisible(true)}
        >
          <Text style={styles.txtBtn}>Ajouter à ma bibliothèque</Text>
        </TouchableOpacity>
        <Modal
          transparent
          animationType="fade"
          visible={secondModalVisible}
          onRequestClose={() => setSecondModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>Excellent choix !</Text>
              <Text style={styles.modalText}>
                Dans quelle catégorie le ranger ?
              </Text>

              {libMsg ? (
                <Text
                  style={{
                    marginBottom: 6,
                    color: libMsgColor,
                    textAlign: "center",
                  }}
                >
                  {libMsg}
                </Text>
              ) : null}

              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity
                  style={
                    selectedCategory === "Livres"
                      ? styles.selectedBtn
                      : styles.normalBtn
                  }
                  onPress={() => setSelectedCategory("Livres")}
                >
                  <Text
                    style={
                      selectedCategory === "Livres"
                        ? styles.selectedTxt
                        : styles.normalTxt
                    }
                  >
                    Livres
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    selectedCategory === "BD"
                      ? styles.selectedBtn
                      : styles.normalBtn
                  }
                  onPress={() => setSelectedCategory("BD")}
                >
                  <Text
                    style={
                      selectedCategory === "BD"
                        ? styles.selectedTxt
                        : styles.normalTxt
                    }
                  >
                    BD
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    selectedCategory === "Mangas"
                      ? styles.selectedBtn
                      : styles.normalBtn
                  }
                  onPress={() => setSelectedCategory("Mangas")}
                >
                  <Text
                    style={
                      selectedCategory === "Mangas"
                        ? styles.selectedTxt
                        : styles.normalTxt
                    }
                  >
                    Mangas
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[styles.addBtn, { marginTop: 15 }]}
                onPress={handleSaveToUserLibrary}
              >
                <Text style={styles.btnTxt}>Valider la catégorie</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setSecondModalVisible(false)}
              >
                <Text style={styles.cancelText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.addBtnContainer}>
        <TouchableOpacity
          style={styles.addAvisBtn}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.txtAddBtn}>Partager mon avis</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
      >
        <BookReviews
          reviews={allReviews}
          averageRating={averageRating}
          totalReviews={totalReviews}
          backendAdress={backendAdress}
          bookId={bookId}
          userToken={user.token}
          currentUsername={user.username}
          onRefresh={() => {
            fetch(`${backendAdress}/reviews/${bookId}`)
              .then((res) => res.json())
              .then((data) => {
                setAllReviews(data.reviews || []);
                setAverageRating(data.averageRating);
                setTotalReviews(data.reviews.length);
              });
          }}
        />
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalClose}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <FontAwesome name="close" size={15} color="#E2D7C4" />
              </TouchableOpacity>
            </View>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((i) => (
                <TouchableOpacity key={i} onPress={() => setRating(i)}>
                  <FontAwesome
                    name="star"
                    size={30}
                    color={i <= rating ? "#0E0E66" : "#E2D7C4"}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.inputAvis}
              multiline
              placeholder="Écrivez votre avis ici..."
              placeholderTextColor="#bfbfceff"
              value={review}
              onChangeText={setReview}
            />

            <TouchableOpacity
              style={styles.sendBtn}
              onPress={() => {
                postReview();
                setModalVisible(false);
                console.log("Avis :", rating, review);
              }}
            >
              <Text style={styles.txtBtn}>Envoyer mon avis</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF8F1",
  },
  returnBtn: {
    padding: 10,
    margin: 10,
    marginBottom: 40,
    borderRadius: 5,
    backgroundColor: "#0E0E66",
    float: "left",
    width: 65,
  },
  txtBtn: {
    color: "#ffffffff",
    fontFamily: interFontsToUse.regular,
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addBtn: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#0E0E66",
  },
  txtAddBtn: {
    color: "#ffffffff",
    fontSize: 20,
    fontFamily: interFontsToUse.regular,
    marginTop: -3,
  },
  totalAvis: {
    margin: 5,
    justifyContent: "center",
  },
  bookContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
    paddingLeft: 80,
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
    color: "#0E0E66",
    textAlign: "center",
  },
  author: {
    textAlign: "center",
    color: "#0E0E66",
    fontSize: 15,
    fontFamily: interFontsToUse.bold,
    marginTop: 5,
  },
  parutionDate: {
    textAlign: "center",
    color: "#0E0E66",
    fontFamily: interFontsToUse.regular,
    marginTop: 10,
    marginBottom: 10,
  },
  synopsisTitle: {
    fontSize: 15,
    fontFamily: interFontsToUse.bold,
    color: "#0E0E66",
    textAlign: "center",
  },
  synopsisScrollContainer: {
    width: 200,
    height: 120,
    margin: 5,
    marginBottom: 10,
  },
  synopsisTxt: {
    textAlign: "center",
    fontFamily: interFontsToUse.regular,
    color: "#0E0E66",
  },

  totalStars: {
    margin: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnContainer: {
    alignItems: "center",
    marginBottom: 0,
  },
  addAvisBtn: {
    padding: 10,
    margin: 10,
    marginTop: 20,
    marginBottom: 5,

    borderRadius: 15,

    alignItems: "center",
    backgroundColor: "#0E0E66",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  txtAddBtn: {
    color: "#ffffffff",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    marginTop: -3,
  },
  addBtn: {
    padding: 10,
    margin: 10,
    marginTop: 0,
    borderRadius: 5,
    backgroundColor: "#0E0E66",
  },
  avisCard: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  avisHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatarImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  avisContainer: {
    marginLeft: 10,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: interFontsToUse.bold,
    color: "#0E0E66",
  },
  userStars: {
    flexDirection: "row",
  },
  dateAvis: {
    justifyContent: "center",
    margin: 5,
  },
  avisTxt: {
    marginTop: 10,
    fontFamily: interFontsToUse.regular,
  },
  modalTitle: {
    textAlign: "center",
    fontWeight: "bold",
  },
  modalText: {
    paddingBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    backgroundColor: "#FCF8F1",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
    marginBottom: 100,
  },
  modalClose: {
    left: 270,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffffff",
    width: 35,
    height: 35,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  starsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  inputAvis: {
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
    textAlignVertical: "top",
  },
  sendBtn: {
    backgroundColor: "#0E0E66",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  txtBtn: {
    color: "#fff",
    fontFamily: interFontsToUse.regular,
  },
  deleteContainer: {
    left: 250,
    bottom: 30,
  },
  dots: {
    fontSize: 24,
    color: "#0E0E66",
    fontWeight: "bold",
    textAlign: "center",
    width: 30,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },

  deleteBtn: {
    backgroundColor: "#E63946",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  normalTxt: {
    color: "#0E0E66",
    fontWeight: "bold",
  },

  cancelText: {
    color: "#888",
  },
  normalBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffffff",
    width: 55,
    height: 35,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedBtn: {
    backgroundColor: "#0E0E66",
    alignItems: "center",
    justifyContent: "center",

    width: 55,
    height: 35,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  normalTxt: {
    color: "#0E0E66",
    fontWeight: "bold",
  },
  selectedTxt: {
    color: "#ffffffff",
    fontWeight: "bold",
  },
  btnTxt: {
    color: "#ffffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
