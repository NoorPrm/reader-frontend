import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";

export default function Posts({ backendAdress }) {
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(null);

  useEffect(() => {
    fetch(`${backendAdress}/posts`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
      })
      .catch((err) => console.log("Erreur post:", err));
  }, [backendAdress]);

  return (
    <View style={{ paddingBottom: 20 }}>
      {posts.map((post, index) => (
        <View style={styles.card} key={post._id || index}>
          <View style={styles.header}>
            <Image
              source={
                post?.author?.profilPicture
                  ? { uri: post.author.profilPicture }
                  : require("../assets/images/whiteUser.png")
              }
              style={styles.avatar}
            />

            <View style={styles.headerRight}>
              <TouchableOpacity>
                <Text style={styles.username}>
                  {post?.author?.username || "Utilisateur"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setModalVisible(index)}
                style={styles.dotsContainer}
              >
                <Text style={styles.dots}>...</Text>
              </TouchableOpacity>

              <Text style={styles.date}>
                {post?.createdAt
                  ? new Date(post.createdAt).toLocaleDateString()
                  : ""}
              </Text>
            </View>
          </View>

          <View style={styles.content}>
            <Text>{post?.content || post?.text || post?.post || ""}</Text>
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
                    // TODO: supprimer le post (appel DELETE), puis:
                    // setPosts(prev => prev.filter((_, i) => i !== index));
                    setModalVisible(null);
                  }}
                >
                  <Text style={styles.deleteText}>Supprimer</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Modal>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 12,
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatar: {
    height: 56,
    width: 56,
    borderRadius: 28,
    backgroundColor: "#E8DCCA",
  },
  headerRight: {
    marginLeft: 10,
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0E0E66",
  },
  dotsContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  dots: {
    fontSize: 22,
    color: "#0E0E66",
    fontWeight: "bold",
  },
  date: {
    marginTop: 4,
    color: "#666",
    fontSize: 12,
  },
  content: {
    marginTop: 10,
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
