import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
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
import Posts from "../screens/Posts";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";

const myip = process.env.MY_IP;
const backendAdress = `${myip}`;

export default function GeneralScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const userToken = useSelector((state) => state.user.value.token);
  const user = useSelector((state) => state.user.value);

  // Premier chargement
  useEffect(() => {
    fetchAllPosts();
  }, []);

  // Rechargement à chaque retour sur l'écran
  useFocusEffect(
    useCallback(() => {
      fetchAllPosts();
    }, [userToken])
  );

  const fetchAllPosts = () => {
    fetch(`${backendAdress}/posts`)
      .then((res) => res.json())
      .then((data) => setAllPosts(data.posts || []))
      .catch((err) => console.log("Erreur lors du fetch des posts :", err));
  };

  const addPost = () => {
    fetch(`${backendAdress}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: userToken, post }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.posts) {
          setAllPosts((prev) => [data.posts, ...prev]);
          setPost("");
        }
      })
      .catch((err) => console.log("Erreur lors de la publication :", err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.miniStoriesContainer}>
        <Image style={styles.miniStory} />
        <Image style={styles.miniStory} />
        <Image style={styles.miniStory} />
        <Image style={styles.miniStory} />
      </View>

      <View style={styles.separator} />
      <View style={styles.userPostContainer}>
        <Image
          source={
            user?.profilPicture &&
            (user.profilPicture.startsWith("http") ||
              user.profilPicture.startsWith("file://"))
              ? { uri: user.profilPicture }
              : require("../assets/images/whiteUser.png")
          }
          style={styles.avatarImg}
        />
        <TouchableOpacity
          style={styles.addPostInputContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: "#777" }}>
            {post
              ? post.slice(0, 40) + (post.length > 40 ? "…" : "")
              : "Ecrire..."}
          </Text>
        </TouchableOpacity>
        <View style={styles.addBtnContainer}>
          <TouchableOpacity onPress={() => addPost()}>
            <FontAwesome5 name="paper-plane" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.separator} />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator
      >
        <Posts
          posts={allPosts}
          backendAdress={backendAdress}
          userToken={user.token}
          currentUsername={user.username}
          currentUserPic={user.profilPicture}
          refreshKey={refreshKey}
          onRefresh={() => {
            fetch(`${backendAdress}/posts`)
              .then((res) => res.json())
              .then((data) => setAllPosts(data.posts || []))
              .catch((error) =>
                console.log("Erreur lors du fetch des posts :", error)
              );
          }}
        />
      </ScrollView>

      <Modal
        animationType="slide"
        transparent
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

            <TextInput
              style={styles.inputAvis}
              multiline
              placeholder="Partagez votre dernier coup de coeur ici..."
              value={post}
              onChangeText={setPost}
            />

            <TouchableOpacity
              style={styles.sendBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.txtBtn}>Partager</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FCF8F1" },
  userPostContainer: {
    top: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 150,
    width: "100%",
  },
  addPostInputContainer: {
    padding: 30,
    width: 150,
    borderRadius: 15,
    borderColor: "#E8DCCA",
    borderWidth: 1,
  },
  txtBtn: { color: "#fff", fontFamily: "Inter_400Regular" },
  addBtnContainer: {
    margin: 10,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    width: 55,
    borderRadius: 15,
    backgroundColor: "#0E0E66",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  separator: { top: 100, width: "100%", height: 2, backgroundColor: "black" },
  miniStoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  miniStory: {
    marginTop: 20,
    backgroundColor: "grey",
    borderRadius: 40,
    height: 80,
    width: 80,
    marginBottom: -80,
  },
  avatarImg: {
    width: 120,
    height: 120,
    borderRadius: 70,
    backgroundColor: "#E8DCCA",
    borderWidth: 0.5,
    borderColor: "#E8DCCA",
  },
  scrollContainer: { paddingHorizontal: 10, marginTop: 110 },
  content: { paddingBottom: 40 },
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
    alignSelf: "flex-end",
    backgroundColor: "#fff",
    width: 35,
    height: 35,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
});
