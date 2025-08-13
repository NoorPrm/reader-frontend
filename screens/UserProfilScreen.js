import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { interFontsToUse } from "../assets/fonts/fonts";
import { setSelectedBook } from "../reducers/bookSelected";
import * as ImagePicker from "expo-image-picker";
import Posts from "../screens/Posts";
import { login } from "../reducers/user";
const myip = process.env.MY_IP;
const backendAdress = `${myip}`;

export default function UserProfilScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [activeTab, setActiveTab] = useState("bibliotheque");
  const [books, setBooks] = useState([]);
  const [posts, setPosts] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const token = user.token;

  // Charger tous les livres du user
  const fetchUserBooks = () => {
    let allBooks = [];
    fetch(`${backendAdress}/userLibrary/${token}/Livres`)
      .then((res) => res.json())
      .then((data) => {
        allBooks = [...allBooks, ...data.map((item) => item.book)];
        return fetch(`${backendAdress}/userLibrary/${token}/BD`);
      })
      .then((res) => res.json())
      .then((data) => {
        allBooks = [...allBooks, ...data.map((item) => item.book)];
        return fetch(`${backendAdress}/userLibrary/${token}/Mangas`);
      })
      .then((res) => res.json())
      .then((data) => {
        allBooks = [...allBooks, ...data.map((item) => item.book)];
        setBooks(allBooks);
      });
  };

  // Charger tous les posts du user
  const fetchUserPosts = () => {
    fetch(`${backendAdress}/posts/${token}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts || []);
      })
      .catch((error) => console.log("error posts:", error));
  };

  // Premier chargement
  useEffect(() => {
    fetchUserBooks();
    fetchUserPosts();
  }, []);

  // Rechargement à chaque retour sur l'écran
  useFocusEffect(
    useCallback(() => {
      fetchUserBooks();
      fetchUserPosts();
    }, [token])
  );

  // Changer photo profil
  const pickImage = () => {
    ImagePicker.requestMediaLibraryPermissionsAsync()
      .then((permissionResult) => {
        if (!permissionResult.granted) {
          alert("Permission refusée pour accéder aux images.");
          throw new Error("Permission not granted");
        }
        return ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      })
      .then((result) => {
        if (result.canceled) throw new Error("canceled");
        const photo = result.assets[0].uri;
        return fetch(`${backendAdress}/users/${token}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profilPicture: photo }),
        })
          .then((r) => r.json())
          .then((data) => {
            if (!data.result)
              throw new Error(data.error || "User update failed");
            dispatch(
              login({
                ...user,
                profilPicture: data.updatedUser.profilPicture || photo,
              })
            );
            return fetch(`${backendAdress}/posts/update-avatar/${token}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                profilPicture: data.updatedUser.profilPicture || photo,
              }),
            });
          })
          .then((r) => r.json())
          .then((data) => {
            if (!data.result) {
              console.log("MAJ avatar posts: ", data.error);
            } else {
              console.log("MAJ avatar posts OK:", data.modifiedCount);
            }
            setRefreshKey((k) => k + 1);
          });
      })
      .catch((err) => {
        console.log("error: ", err.message);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.navigate("Parametres")}
      >
        <Text style={styles.menuText}>⋯</Text>
      </TouchableOpacity>

      <View style={styles.profileSection}>
        <Text style={styles.username}>{user.username}</Text>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              user.profilPicture
                ? { uri: user.profilPicture }
                : require("../assets/images/whiteUser.png")
            }
            style={styles.avatar}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.followersContainer}
          onPress={() => setIsFollowing(!isFollowing)}
        >
          <Text style={styles.followersText}> ♥︎ 77 Followers</Text>
        </TouchableOpacity>
        <Text style={styles.userStatut}>{user.statut}</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "bibliotheque" && styles.activeTab]}
          onPress={() => setActiveTab("bibliotheque")}
        >
          <Text style={styles.tabText}>BIBLIOTHÈQUE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "posts" && styles.activeTab]}
          onPress={() => setActiveTab("posts")}
        >
          <Text style={styles.tabText}>POSTS</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === "bibliotheque" ? (
          <View>
            {books.length > 0 ? (
              books.map((book, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.bookItem}
                  onPress={() => {
                    dispatch(setSelectedBook(book));
                    navigation.navigate("BookInfos");
                  }}
                >
                  <Image
                    source={
                      book.cover
                        ? { uri: book.cover }
                        : require("../assets/images/notAvailable.jpg")
                    }
                    style={styles.bookCover}
                  />
                  <Text style={styles.bookTitle}>
                    "{book.title}" de {book.author}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ fontStyle: "italic" }}>
                Aucun livre dans la bibliothèque.
              </Text>
            )}
          </View>
        ) : (
          <View>
            {posts.length > 0 ? (
              <Posts
                posts={posts}
                backendAdress={backendAdress}
                userToken={token}
                currentUsername={user.username}
                currentUserPic={user.profilPicture}
                refreshKey={refreshKey}
                onRefresh={fetchUserPosts}
              />
            ) : (
              <Text style={{ fontStyle: "italic" }}>
                Aucun post pour cet utilisateur.
              </Text>
            )}
          </View>
        )}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FCF8F1", alignItems: "center" },
  menuButton: { position: "absolute", top: 50, right: 15, padding: 10 },
  menuText: { fontSize: 24 },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    backgroundColor: "#E8DCCA",
    borderBlockColor: "#FCF8F1",
  },
  userStatut: { fontFamily: interFontsToUse.bold, color: "#0E0E66" },
  profileSection: { alignItems: "center", marginTop: 50 },
  username: {
    fontSize: 22,
    fontFamily: interFontsToUse.bold,
    marginBottom: 5,
    color: "#0E0E66",
  },
  separator: {
    width: "100%",
    height: 2,
    backgroundColor: "#E8DCCA",
    marginBottom: 10,
    marginTop: 10,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#0E0E66",
  },
  tab: { paddingVertical: 10, paddingHorizontal: 20 },
  activeTab: { borderBottomWidth: 3, borderColor: "#0E0E66" },
  tabText: { fontSize: 14, fontWeight: "bold", color: "#0E0E66" },
  content: { width: "100%", padding: 20 },
  bookItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 8,
  },
  bookCover: { width: 50, height: 70, marginRight: 10, borderRadius: 4 },
  bookTitle: { fontSize: 14, fontWeight: "500", flexShrink: 1 },
  followersContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  followersText: {
    fontSize: 14,
    color: "#0E0E66",
    fontWeight: "500",
    opacity: 0.4,
  },
});
