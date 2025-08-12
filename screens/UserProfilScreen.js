import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { interFontsToUse } from '../assets/fonts/fonts';
import { setSelectedBook } from "../reducers/bookSelected";
const myip = process.env.MY_IP;
const backendAdress = `${myip}`;

export default function UserProfilScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [activeTab, setActiveTab] = useState("bibliotheque");
  const [books, setBooks] = useState([]);
  const [posts, setPosts] = useState([]);

  // Chargement des données
  useEffect(() => {
    const token = user.token;

    // Charger tous les livres du user
    let allBooks = [];
    fetch(`${backendAdress}/userLibrary/${token}/Livres`)
      .then(res => res.json())
      .then(data => {
        allBooks = [...allBooks, ...data.map(item => item.book)];
        return fetch(`${backendAdress}/userLibrary/${token}/BD`);
      })
      .then(res => res.json())
      .then(data => {
        allBooks = [...allBooks, ...data.map(item => item.book)];
        return fetch(`${backendAdress}/userLibrary/${token}/Mangas`);
      })
      .then(res => res.json())
      .then(data => {
        allBooks = [...allBooks, ...data.map(item => item.book)];
        setBooks(allBooks);
      });

    // Charger tous les posts du user
    fetch(`${backendAdress}/posts/${token}`)
      .then(res => res.json())
      .then(data => {
        console.log("TOKEN FRONT =>", user.token);
        console.log("DATA POSTS =>", data);
        if (data.result) {
          setPosts(data.posts);
        } else {
          setPosts([]);
        }
      });
  }, [user.token]);

  return (
    <View style={styles.container}>

      {/* Bouton menu en haut à droite */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.navigate("Parametres")}
      >
        <Text style={styles.menuText}>⋯</Text>
      </TouchableOpacity>

      {/* Section profil */}
      <View style={styles.profileSection}>
        <Text style={styles.username}>{user.username}</Text>
        <Image
          source={
            user.profilPicture
              ? { uri: user.profilPicture }
              : require('../assets/images/whiteUser.png')
          }
          style={styles.avatar}
        />

        <Text style={styles.followersText}> 77 Followers</Text>

        <Text style={styles.userStatut}>
          {user.statut}
        </Text>
      </View>

      {/* Séparateur */}
      <View style={styles.separator} />

      {/* Onglets */}
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

      {/* Contenu des onglets */}
      <ScrollView style={styles.content}>

        {/* Onglet Bibliothèque */}
        {activeTab === "bibliotheque" ? (
          <View>
            {books.length > 0 ? (
              books.map((book, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.bookItem}
                  onPress={() => {
                    dispatch(setSelectedBook(book));
                    navigation.navigate('BookInfos');
                  }}
                >
                  <Image
                    source={
                      book.cover
                        ? { uri: book.cover }
                        : require('../assets/images/notAvailable.jpg')
                    }
                    style={styles.bookCover}
                  />
                  <Text style={styles.bookTitle}>"{book.title}" de {book.author}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ fontStyle: "italic" }}>Aucun livre dans la bibliothèque.</Text>
            )}
          </View>
        ) : (

          /* Onglet Posts */
          <View>
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <View key={post._id || index} style={styles.postItem}>
                  <Image
                    source={
                      post?.authorProfilePicture
                        ? { uri: post.authorProfilePicture }
                        : require("../assets/images/whiteUser.png")
                    }
                    style={styles.postAvatar}
                  />
                  <Text style={styles.postUsername}>
                    {post?.authorUsername || "Utilisateur"}
                  </Text>
                  <Text style={styles.postText}>
                    {post?.content || ""}
                  </Text>
                  <Text style={styles.postDate}>
                    {post?.createdAt
                      ? new Date(post.createdAt).toLocaleDateString()
                      : ""}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={{ fontStyle: "italic" }}>Aucun post pour cet utilisateur.</Text>
            )}
          </View>
        )}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF8F1',
    alignItems: 'center',
  },
  menuButton: {
    position: "absolute",
    top: 50,
    right: 15,
    padding: 10,
  },
  menuText: {
    fontSize: 24,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
    backgroundColor: "#E8DCCA",
    borderBlockColor: "#FCF8F1"
  },
  userStatut: {
    fontFamily: interFontsToUse.bold,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 50,
  },
  username: {
    fontSize: 22,
    fontFamily: interFontsToUse.regular,
    marginBottom: 5,
    color: "#0E0E66"
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
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderColor: "#0E0E66",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0E0E66",
  },
  content: {
    width: "100%",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bookItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 8,
  },
  bookCover: {
    width: 50,
    height: 70,
    marginRight: 10,
    borderRadius: 4,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: "500",
    flexShrink: 1,
  },
  followersContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  followersText: {
    fontSize: 14,
    color: "#0E0E66",
    fontWeight: "500",
  },
});
