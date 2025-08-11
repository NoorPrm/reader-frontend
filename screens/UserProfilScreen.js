import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { interFontsToUse } from '../assets/fonts/fonts';
import AvisCard from "../components/AvisCard";
const myip = process.env.MY_IP;
const backendAdress = `${myip}`;

export default function UserProfilScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const [activeTab, setActiveTab] = useState("bibliotheque");
  const [books, setBooks] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false); 
  console.log("Profil picture :", user.profilPicture);

  useEffect(() => {
    const token = user.token; // ✅ récupération du token
    if (!token) return; // sécurité

    fetch(`${backendAdress}/userLibrary/${token}/Livres`)
      .then((response) => response.json())
      .then((data) => {
        console.log('data reçue:', data);
        const booksFromBackend = data.map(item => item.book);
        setBooks(booksFromBackend);
      })
      .catch(err => console.error("Erreur lors du fetch:", err));
  }, [user.token]);

  return (
    <View style={styles.container}>
      {/* Bouton menu */}
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
        <TouchableOpacity 
          style={styles.followersContainer} 
          onPress={() => setIsFollowing(!isFollowing)}
        >
          <Text style={styles.followersText}> 77 Followers</Text>
        </TouchableOpacity>
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
        {activeTab === "bibliotheque" ? (
          <View>
            {books.length > 0 ? (
              books.map((book, index) => (
                <View key={index} style={styles.bookItem}>
                  <Image
                    source={{ uri: book.cover }}
                    style={styles.bookCover}
                  />
                  <Text style={styles.bookTitle}>"{book.title}" de  {book.author}</Text>
                </View>
              ))
            ) : (
              <Text style={{ fontStyle: "italic" }}>Aucun livre dans la bibliothèque.</Text>
            )}
          </View>
        ) : (
          <View>
            <AvisCard
          avisData={{
            username: user.username,
            rating: 5,
            date: "Il y a 40 jours",
            totalAvis: 133,
            comment: "Ce livre est réellement fantastique, je vous le recommande vivement ! ",
          }}
          isUser={true} //à remplacer plus tard avec userId === avis.userId
          onDelete={() => console.log("yaaah")} //avis.id
        />
        <AvisCard
          avisData={{
            username: user.username,
            rating: 1,
            date: "Il y a 25 jours",
            totalAvis: 54,
            comment: " Même Reese aurait fait mieux. ",
          }}
          isUser={true} //à remplacer plus tard avec userId === avis.userId
          onDelete={() => console.log("yaaah")} //avis.id
        />
        <AvisCard
          avisData={{
            username: user.username,
            rating: 5,
            date: "Il y a 30 jours",
            totalAvis: 101,
            comment: "Excellent ! ",
          }}
          isUser={true} //à remplacer plus tard avec userId === avis.userId
          onDelete={() => console.log("yaaah")} //avis.id
        />
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
    marginTop:10,
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
