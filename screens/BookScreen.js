import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
import BookReviews from "../components/BookReviews";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import defaultCover from "../assets/images/defaultCover.jpg";
//const backendAdress = process.env.EXPO_PUBLIC_URL_BACKEND;
const myip = process.env.MY_IP;
const backendAdress = `${myip}`;
console.log("Backend URL:", backendAdress);

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
  const [userLibraryError, setUserLibraryError] = useState("");
  const userToken = useSelector((state) => state.user.value.token);

  useEffect(() => {
    const reduxBookId = "689609443fe9741d937e5973";
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
        setAllReviews(data.reviews);
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
        console.log(userToken, bookId, selectedCategory);
        console.log("Ajout dans userLibrary :", data);
        if (data.error) {
          setUserLibraryError(data.error);
          return;
        }
        setSecondModalVisible(false);
        setSelectedCategory(null);
        setBookId(null);
        setUserLibraryError("");
      })
      .catch((err) => {
        console.log("Erreur userLibrary :", err.message);
      });
  };

  const postReview = () => {
    fetch(`${backendAdress}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: userToken,
        bookId,
        rating,
        review: review,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log("Erreur :", data.error);
        } else {
          // Refresh auto
          setAllReviews((prev) => [data.review, ...prev]);
          setTotalReviews((prev) => prev + 1);
          setAverageRating(
            (
              (parseFloat(averageRating) * totalReviews + rating) /
              (totalReviews + 1)
            ).toFixed(1)
          );
        }
        setModalVisible(false);
        setRating(0);
        setReview("");
      })
      .catch((err) => {
        console.log("Erreur lors de l'envoi de l'avis :", err);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.returnBtn}
        onPress={() => navigation.navigate("BookLibrary")}
      >
        <Text style={styles.txtBtn}>Retour à la bibliothèque</Text>
      </TouchableOpacity>

      <View style={styles.bookContainer}>
        {bookData && (
          <Image
            source={bookData.cover ? { uri: bookData.cover } : defaultCover}
            style={styles.image}
          ></Image>
        )}
        <View style={styles.bookInfosContainer}>
          {bookData && <Text style={styles.title}>{bookData.title}</Text>}
          {bookData && <Text style={styles.author}>{bookData.author}</Text>}
          {bookData && (
            <Text style={styles.parutionDate}>Date de parution API</Text>
          )}

          <Text style={styles.synopsisTitle}>RESUME</Text>
          {bookData && (
            <Text style={styles.synopsisTxt}>{bookData.synopsis}</Text>
          )}
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

              {userLibraryError !== "" && (
                <Text
                  style={{
                    color: "red",
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  {userLibraryError}
                </Text>
              )}

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

      <View style={styles.totalStars}>
        <FontAwesome name="star" size={25} color="#0E0E66" />
        <FontAwesome name="star" size={25} color="#0E0E66" />
        <FontAwesome name="star" size={25} color="#0E0E66" />
        <FontAwesome name="star" size={25} color="#0E0E66" />
        <FontAwesome name="star" size={25} color="#0E0E66" />
        <View style={styles.totalAvis}>
          <Text>({totalReviews} avis en DB)</Text>
        </View>
        <View style={styles.addBtnContainer}>
          <TouchableOpacity
            style={styles.addAvisBtn}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.txtAddBtn}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
      >
        <BookReviews bookId={bookId} backendAdress={backendAdress} />
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
    marginBottom: 75,
    borderRadius: 5,
    backgroundColor: "#0E0E66",
    float: "left",
    width: 180,
  },
  txtBtn: {
    color: "#ffffffff",
    fontFamily: "Inter_400Regular",
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
    fontFamily: "Inter_400Regular",
    marginTop: -3,
  },
  totalAvis: {
    margin: 5,
    justifyContent: "center",
  },
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
    fontFamily: "Inter_700Bold",
    fontSize: 25,

    textAlign: "center",
  },
  author: {
    textAlign: "center",
    fontFamily: "Inter_400Regular",
  },
  parutionDate: {
    textAlign: "center",
    fontFamily: "Inter_400Regular",
  },
  synopsisTitle: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
  },
  synopsisTxt: {
    textAlign: "center",
    fontFamily: "Inter_400Regular",

    width: 200,
    height: 120,
    margin: 5,
  },

  totalStars: {
    margin: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addAvisBtn: {
    padding: 10,
    margin: 10,
    height: 40,
    width: 40,
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
    fontFamily: "Inter_700Bold",
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
    fontFamily: "Inter_400Regular",
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
  },
  modalClose: {
    left: 310,

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
    fontFamily: "Inter_700Bold",
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
