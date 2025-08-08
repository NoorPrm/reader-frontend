import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function BookReviews({ bookId, backendAdress }) {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [modalVisible, setModalVisible] = useState(null); // pour les "..."

  useEffect(() => {
    if (!bookId) return;

    fetch(`${backendAdress}/reviews/${bookId}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.reviews);
        setAverageRating(data.averageRating);
        setTotalReviews(data.totalReviews);
      })
      .catch((err) => console.log("Erreur avis:", err));
  }, [bookId]);

  return (
    <View>
      {/* moyenne étoiles */}
      <View style={styles.totalStars}>
        {[1, 2, 3, 4, 5].map((i) => (
          <FontAwesome
            key={i}
            name="star"
            size={25}
            color={i <= Math.round(averageRating) ? "#0E0E66" : "#ccc"}
          />
        ))}
        <Text style={styles.totalAvis}>({totalReviews} avis)</Text>
      </View>

      {/* Liste des avis */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
      >
        {reviews.map(
          (avis, index) => (
            console.log("avis.author =>", avis.author),
            (
              <View style={styles.avisCard} key={index}>
                <View style={styles.avisHeader}>
                  <Image
                    source={require("../assets/images/userBryanCranston.jpg")} // tu pourras le remplacer par un champ `avatar` plus tard
                    style={styles.avatarImg}
                  />
                  <View style={styles.avisContainer}>
                    <TouchableOpacity>
                      <Text style={styles.userName}>
                        {avis.author.username}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setModalVisible(index)}
                      style={styles.dotsContainer}
                    >
                      <Text style={styles.dots}>...</Text>
                    </TouchableOpacity>

                    <View style={styles.userStars}>
                      {[...Array(5)].map((_, i) => (
                        <FontAwesome
                          key={i}
                          name="star"
                          size={20}
                          color={i < avis.rating ? "#0E0E66" : "#ccc"}
                        />
                      ))}
                      <View style={styles.dateAvis}>
                        <Text>
                          {new Date(avis.createdAt).toLocaleDateString()}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.avisTxt}>
                  <Text>{avis.review}</Text>
                </View>

                <Modal
                  transparent
                  animationType="fade"
                  visible={modalVisible === index}
                  onRequestClose={() => setModalVisible(null)}
                >
                  <Pressable
                    style={styles.overlay}
                    onPress={() => setModalVisible(null)}
                  >
                    <View style={styles.modal}>
                      <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => {
                          setModalVisible(null);
                          // Ajoute ici une fonction de suppression si besoin
                        }}
                      >
                        <Text style={styles.deleteText}>Supprimer</Text>
                      </TouchableOpacity>
                    </View>
                  </Pressable>
                </Modal>
              </View>
            )
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  totalStars: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  totalAvis: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollContainer: {
    maxHeight: 300,
  },
  content: {
    paddingBottom: 20,
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
    color: "#0E0E66",
  },
  userStars: {
    flexDirection: "row",
    bottom: 20,
  },
  dateAvis: {
    justifyContent: "center",
    margin: 5,
    bottom: 3,
  },
  avisTxt: {
    marginTop: 10,
  },
  dotsContainer: {
    left: 250,
    bottom: 30,
  },
  dots: {
    fontSize: 24,
    color: "#0E0E66",
    fontWeight: "bold",
    textAlign: "right",
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
});
