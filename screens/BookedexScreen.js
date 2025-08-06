import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CameraView, Camera } from "expo-camera";

export default function BookedexScreen({navigation}) {
  const [hasPermission, setHasPermission] = useState(false);
  const [scannedCode, setScannedCode] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const result = await Camera.requestCameraPermissionsAsync();
      setHasPermission(result?.status === "granted");
    })();
  }, []);

  if (!hasPermission) return <View style={styles.container} />;

  const fetchBookData = (isbn) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.totalItems > 0) {
          const book = data.items[0].volumeInfo;

          const bookToSave = {
            title: book.title || "Titre inconnu",
            synopsis: book.description || "Pas de résumé",
            author: book.authors ? book.authors[0] : "Auteur inconnu",
            genre: book.categories ? book.categories[0] : "Genre inconnu",
          };

          fetch("http://192.168.1.17:3000/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookToSave),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Livre ajouté dans la DB :", data);
            })
            .catch((error) => {
              console.log("Erreur lors de l'enregistrement :", error);
            });
        } else {
          console.log("Aucun livre trouvé pour cet ISBN.");
        }
      })
      .catch((err) => {
        console.log(
          "Erreur lors de la récupération depuis Google Books :",
          err.message
        );
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

  return (
    <LinearGradient colors={["#0E0E66", "#FCF8F1"]} style={styles.container}>
      <Text style={styles.title}>BOOKéDEX</Text>
      <Text style={styles.scanTxt}>
        Capturez le code-barre du livre dans l'encadré !
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

    borderRadius: 5,
    backgroundColor: "#0E0E66",
  },
  txtBtn: {
    color: "#ffffffff",
    fontFamily: "Inter_400Regular",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 40,
  },
  scanTxt: {
    color: "#ffffffff",
  },
  scanBox: {
    width: "80%",
    height: "65%",

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
    color: "#fff",
    fontWeight: "bold",
  },
  cancelText: {
    color: "#888",
  },
});
