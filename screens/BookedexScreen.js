import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../reducers/user"; // adapte le chemin si besoin
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { interFontsToUse } from '../assets/fonts/fonts';
import { CameraView, Camera } from "expo-camera";
// import { LOCAL_IP } from "@env";
//const backendAdress = process.env.EXPO_PUBLIC_URL_BACKEND;
const myip = process.env.MY_IP;
const backendAdress = `${myip}`;
console.log("Backend URL:", backendAdress);

export default function BookedexScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(false);
  const [scannedCode, setScannedCode] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  const [fetchedBookId, setFetchedBookId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userLibraryError, setUserLibraryError] = useState("");
  const userToken = useSelector((state) => state.user.value.token);

  console.log(userToken);
  useEffect(() => {
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      setHasPermission(result?.status === "granted");
    })();
  }, []);

  if (!hasPermission) return <View style={styles.container} />;

  //fonction saveBookToDB qui sera rappelée lors du fetchBookData
  const saveBookToDB = (bookToSave) => {
    fetch(`${backendAdress}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookToSave),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("fonction saveBookToDB: ", bookToSave);
        if (data.error) {
          console.log("Info :", data.error);
        } else {
          console.log("Livre ajouté dans la DB :", data._id);
          setFetchedBookId(data._id);
          setModalVisible(false);
          setSecondModalVisible(true);
        }
      })
      .catch((error) => {
        console.log("Erreur lors de l'enregistrement :", error.message);
      });
  };

  //Déclenchée au scan de l'ISBN du livre
  const fetchBookData = (isbn, category) => {
    const openLibraryUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;

    fetch(openLibraryUrl)
      .then((res) => res.json())
      .then((data) => {
        const bookData = data[`ISBN:${isbn}`];

        if (bookData) {
          const bookToSave = {
            title: bookData.title || "Titre inconnu",
            synopsis: bookData.notes || "Pas de résumé",
            author: bookData.authors?.[0]?.name || "Auteur inconnu",
            publishedDate:
              bookData.publish_date || "Date de publication inconnue",
            isbn: isbn,
            cover: `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`,
          };

          saveBookToDB(bookToSave);
          console.log("openlibrary: ", bookToSave);
        } else {
          console.log("Aucun livre trouvé dans OpenLibrary.");
          // Si OpenLibrary ne connait pas l'ISBN, fetch sur GoogleBooks
          const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

          fetch(googleBooksUrl)
            .then((res) => res.json())
            .then((data) => {
              if (data.totalItems > 0) {
                const info = data.items[0].volumeInfo;

                const bookToSave = {
                  title: info.title || "Titre inconnu",
                  synopsis: info.description || "Pas de résumé",
                  author: info.authors?.[0] || "Auteur inconnu",
                  publishedDate:
                    info.publishedDate || "Date de publication inconnue",
                  isbn: isbn,
                  cover: info.imageLinks?.thumbnail || null,
                };

                saveBookToDB(bookToSave);
                console.log("google: ", bookToSave);
              } else {
                console.log("Aucun livre trouvé dans Google Books.");
              }
            })
            .catch((err) => {
              console.log("Erreur avec Google Books :", err.message);
            });
        }
      })
      .catch((err) => {
        console.log("Erreur avec Open Library :", err.message);
      });
  };

  const handleScan = (result) => {
    if (!scannedCode && result?.data) {
      setScannedCode(result.data);
      setModalVisible(true);
    }
  };

  const handleAddToLibrary = () => {
    fetchBookData(scannedCode);
    console.log("Ajout à la bibliothèque :", scannedCode);
    setModalVisible(false);
    setScannedCode(null);
  };

  const handleReset = () => {
    setScannedCode(null);
    setModalVisible(false);
  };

  const handleSaveToUserLibrary = () => {
    if (!selectedCategory || !fetchedBookId) return;

    fetch(`${backendAdress}/userLibrary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: userToken,
        bookId: fetchedBookId,
        category: selectedCategory,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(userToken, fetchedBookId, selectedCategory);
        console.log("Ajout dans userLibrary :", data);
        setSecondModalVisible(false);
        setSelectedCategory(null);
        setFetchedBookId(null);
        setUserLibraryError("");
      })
      .catch((err) => {
        console.log("Erreur userLibrary :", err.message);
        setUserLibraryError("Livre déjà présent dans la bibliothèque");
      });
  };

  return (
    <LinearGradient colors={["#0E0E66", "#FCF8F1"]} style={styles.container}>
      <Text style={styles.title}>BOOKÉDEX</Text>
      <Text style={styles.scanTxt}>
        Capturez le code-barre du livre, dans l'encadré !
      </Text>

      <View style={styles.scanBox}>
        <CameraView
          style={styles.scanner}
          barcodeScannerSettings={{
            barcodeTypes: ["ean13"], // Code-barres classique pour livres
          }}
          onBarcodeScanned={handleScan}
        />
        <View style={styles.scanFrame} />
      </View>

      <TouchableOpacity
        style={styles.returnBtn}
        onPress={() => navigation.navigate("Search")}
      >
        <Text style={styles.txtBtn}>Retour à la recherche</Text>
      </TouchableOpacity>

      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={handleReset}
      >
        <Pressable style={styles.modalOverlay} onPress={handleReset}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Livre capturé</Text>
            <Text style={styles.modalText}>Code : {scannedCode}</Text>

            <TouchableOpacity
              style={styles.addBtn}
              onPress={handleAddToLibrary}
            >
              <Text style={styles.btnText}>Ajouter à la bibliothèque</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={handleReset}>
              <Text style={styles.cancelText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      <Modal
        transparent
        animationType="fade"
        visible={secondModalVisible}
        onRequestClose={() => setSecondModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Livre enregistré !</Text>
            <Text style={styles.modalText}>
              Dans quelle catégorie le ranger ?
            </Text>

            {userLibraryError !== "" && (
              <Text style={{ color: "red", textAlign: "center" }}>
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
              <Text style={styles.btnText}>Valider la catégorie</Text>
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E0E66",
    alignItems: "center",
    justifyContent: "center",
  },
  returnBtn: {
    padding: 10,
    margin: 10,
    marginTop: 30,

    borderRadius: 5,
    backgroundColor: "#0E0E66",
  },
  txtBtn: {
    color: "#ffffffff",
    fontFamily: interFontsToUse.regular,
  },
  title: {
    color: "#fff",
    fontSize: 40,
    fontFamily: interFontsToUse.bold,
    marginTop: 30,
  },
  scanTxt: {
    color: "#ffffffff",
    fontFamily: interFontsToUse.regular,
    marginTop: 10,
  },
  scanBox: {
    width: "80%",
    height: "65%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    marginTop: 30,
    overflow: "hidden",
  },
  scanner: {
    flex: 1,
  },
  scanFrame: {
    position: "absolute",
    top: 200,
    left: 40,
    width: "70%",
    height: 200,
    borderWidth: 2,
    borderColor: "#ffffff",
    borderRadius: 10,
    backgroundColor: "transparent",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 12,
    width: "85%",
    alignItems: "center",
    gap: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  addBtn: {
    backgroundColor: "#0E0E66",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  cancelBtn: {
    marginTop: 10,
  },
  btnText: {
    color: "#ffffffff",
    fontWeight: "bold",
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
});
