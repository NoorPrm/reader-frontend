import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const AvisCard = ({ avisData, isUser, onDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.avisCard}>
      <View style={styles.avisHeader}>
        <Image
          source={require("../assets/images/userBryanCranston.jpg")}
          style={styles.avatarImg}
        />
        <View style={styles.avisContainer}>
          <TouchableOpacity>
            <Text style={styles.userName}>{avisData.username}</Text>
          </TouchableOpacity>

          {isUser && (
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
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
                color={i < avisData.rating ? "#0E0E66" : "#ccc"}
              />
            ))}
            <View style={styles.dateAvis}>
              <Text>{avisData.date}</Text>
            </View>
          </View>
          <View style={styles.totalAvis}>
            <Text>({avisData.totalAvis} avis)</Text>
          </View>
        </View>
      </View>

      <View style={styles.avisTxt}>
        <Text>{avisData.comment}</Text>
      </View>

      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modal}>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => {
                setModalVisible(false);
                onDelete();
              }}
            >
              <Text style={styles.deleteText}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
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

    bottom: 20,
  },
  dateAvis: {
    justifyContent: "center",
    textAlign: "center",
    margin: 5,
    bottom: 3,
  },
  totalAvis: {
    bottom: 20,
  },
  avisTxt: {
    marginTop: 10,
    fontFamily: "Inter_400Regular",
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

export default AvisCard;
