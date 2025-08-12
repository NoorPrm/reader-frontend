import React, { useState } from "react";
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

export default function BookReviews({
  reviews = [],
  averageRating = 0,
  totalReviews = 0,
  backendAdress,
  bookId,
  userToken,
  currentUsername = "",
  onRefresh,
}) {
  const [modalVisible, setModalVisible] = useState(null);

  const handleDelete = () => {
    fetch(`${backendAdress}/reviews/${bookId}/${userToken}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setModalVisible(null);
        if (data.result && onRefresh) onRefresh();
      })
      .catch((err) => {
        console.log("delete err:", err.message);
        setModalVisible(null);
      });
  };

  return (
    <View>
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

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator
      >
        {reviews.map((avis, index) => {
          const isUser = avis.authorUsername === currentUsername;
          const p = avis?.authorProfilePicture;
          const hasValidAvatar =
            typeof p === "string" &&
            (p.startsWith("http") || p.startsWith("file://"));

          return (
            <View style={styles.avisCard} key={avis._id || index}>
              <View style={styles.avisHeader}>
                <Image
                  source={
                    hasValidAvatar
                      ? { uri: p }
                      : require("../assets/images/whiteUser.png")
                  }
                  style={styles.avatarImg}
                />
                <View style={styles.avisContainer}>
                  <TouchableOpacity>
                    <Text style={styles.userName}>
                      {avis.authorUsername || "Utilisateur"}
                    </Text>
                  </TouchableOpacity>

                  {isUser && (
                    <TouchableOpacity
                      onPress={() => setModalVisible(index)}
                      style={styles.dotsContainer}
                    >
                      <Text style={styles.dots}>...</Text>
                    </TouchableOpacity>
                  )}

                  <View style={styles.userStars}>
                    {[...Array(5)].map((_, i) => (
                      <FontAwesome
                        key={i}
                        name="star"
                        size={20}
                        color={i < (avis.rating || 0) ? "#0E0E66" : "#ccc"}
                      />
                    ))}
                    <View style={styles.dateAvis}>
                      <Text>
                        {avis.createdAt
                          ? new Date(avis.createdAt).toLocaleDateString()
                          : ""}
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
                      onPress={handleDelete}
                    >
                      <Text style={styles.deleteText}>Supprimer</Text>
                    </TouchableOpacity>
                  </View>
                </Pressable>
              </Modal>
            </View>
          );
        })}
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
    backgroundColor: "#E8DCCA",
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
