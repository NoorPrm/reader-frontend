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
  Pressable,
} from "react-native";
import Posts from "../screens/Posts";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { interFontsToUse } from "../assets/fonts/fonts";
import * as ImagePicker from "expo-image-picker";

const myip = process.env.MY_IP;
const backendAdress = `${myip}`;

export default function GeneralScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [storyPhoto, setStoryPhoto] = useState(null);
  const [photoPreviewVisible, setPhotoPreviewVisible] = useState(false);
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
      .then((data) => setAllPosts(data.posts || []));
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
      });
  };

  const openSystemCamera = () => {
    ImagePicker.requestCameraPermissionsAsync()
      .then((permission) => {
        if (!permission.granted) {
          alert("Permission caméra refusée.");
          return null;
        }
        return ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      })
      .then((result) => {
        if (!result || result.canceled) return;
        setStoryPhoto(
          result.assets && result.assets[0] && result.assets[0].uri
        );
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.miniStoriesContainer}>
        <View style={styles.storyItem}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (storyPhoto) setPhotoPreviewVisible(true);
            }}
          >
            <Image
              source={
                storyPhoto
                  ? { uri: storyPhoto }
                  : user?.profilPicture &&
                    (user.profilPicture.startsWith("http") ||
                      user.profilPicture.startsWith("file://"))
                  ? { uri: user.profilPicture }
                  : require("../assets/images/whiteUser.png")
              }
              style={[styles.miniStory, styles.miniStoryWithName]}
            />
          </TouchableOpacity>

          <Text style={styles.storyName}>{user.username}</Text>

          <TouchableOpacity style={styles.plusButton}>
            <Text style={styles.plus} onPress={openSystemCamera}>
              +
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.storyItem}>
          <Image
            source={require("../assets/images/LecteurStory.jpg")}
            style={[styles.miniStory, styles.miniStoryWithName]}
          />
          <Text style={styles.storyName}>Noah.K</Text>
        </View>

        <View style={styles.storyItem}>
          <Image
            source={require("../assets/images/UserScreenStory.jpg")}
            style={[styles.miniStory, styles.miniStoryWithName]}
          />
          <Text style={styles.storyName}>Aurélie_t</Text>
        </View>

        <View style={styles.storyItem}>
          <Image
            source={require("../assets/images/AmelieNothomb.png")}
            style={[styles.miniStory, styles.miniStoryWithName]}
          />
          <Text style={styles.storyName}>
            {" "}
            JK.Rowling <Feather name="feather" size={18} color="#0E0E66" />{" "}
          </Text>
        </View>
      </View>

      <View style={styles.separator} />
      <View style={styles.userPostContainer}>
        <TouchableOpacity
          style={styles.addPostInputContainer}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: "grey", textAlign: "center", top: 10 }}>
            {post
              ? post.slice(0, 40) + (post.length > 40 ? "…" : "")
              : "Écrivez ici et..."}
            <FontAwesome5 name="book" size={16} color="grey" />
          </Text>
        </TouchableOpacity>
        <View style={styles.addBtnContainer}>
          <TouchableOpacity onPress={() => addPost()}>
            <FontAwesome5 name="paper-plane" size={30} color="white" />
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
          navigation={navigation}
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
              placeholder="Partagez votre dernier coup de coeur !"
              placeholderTextColor="#bfbfceff"
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
      <Modal
        transparent
        animationType="fade"
        visible={photoPreviewVisible}
        onRequestClose={() => setPhotoPreviewVisible(false)}
      >
        <Pressable
          style={styles.previewOverlay}
          onPress={() => setPhotoPreviewVisible(false)}
        >
          {storyPhoto && (
            <Image source={{ uri: storyPhoto }} style={styles.previewImage} />
          )}
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FCF8F1" },
  userPostContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 150,
    width: "100%",
    top: 10,
  },
  addPostInputContainer: {
    width: 240,
    height: 100,
    padding: 30,
    borderRadius: 15,
    borderColor: "#0E0E66",
    borderWidth: 1,
    backgroundColor: "#FCF8F1",
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
  separator: {
    top: 10,
    width: "100%",
    height: 1.5,
    backgroundColor: "#0E0E66",
  },
  miniStoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  miniStory: {
    marginTop: 30,
    borderWidth: 1.5,
    borderColor: "#0E0E66",
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
  scrollContainer: { paddingHorizontal: 10, marginTop: 10 },
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
  plusButton: {
    position: "absolute",
    top: 90,
    right: 10,
    width: 15,
    height: 20,
    borderRadius: 12,
    backgroundColor: "#0E0E66",
    alignItems: "center",
    justifyContent: "center",
  },

  plus: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: interFontsToUse.bold,
    alignItems: "center",
  },

  storyItem: {
    alignItems: "center",
  },
  miniStoryWithName: {
    marginBottom: 4,
  },
  storyName: {
    fontSize: 12,
    color: "#0E0E66",
    fontFamily: interFontsToUse.boldItalic,
  },
  previewOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
    borderRadius: 10,
  },
});
