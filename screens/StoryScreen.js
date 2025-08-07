import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator, FlatList } from "react-native";
import { BookLibraryScreen } from "../screens/BookLibraryScreen";
import { TextInput } from 'react-native-web';


const [post, setPost] = useState(""); //gere le texte du post et l'envoie via le bouton envoyer.
const [like, setLike] = useState(false); //gere le like du post
const [postComments, setPostComments] = useState([]); //gere l'envoie de se commentaire 



export default function StoryScreen() {
  const sendPost = () => {
    fetch('http://192.168.1.16:3000/users/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ post, like, comment }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          console.log('Post envoyé avec succès');
          setPost(""); // Réinitialise le champ de saisie après l'envoi du post
          setLike(false); // Réinitialise le like
          setPostComments(prevComments => [...prevComments, postComments]); //Ajoute le commentaire sans le retirer même apres l'envoi d'un nouveau commentaire
        }
      })
  };



  return (
    <View style={styles.container}>
      <TextInput style={styles.input}
        placeholder="Saisir texte & partager mon dernier coup de coeur"
        onChangeText={(value) => setPost(value)}
        value={post}>

      </TextInput>

      <TouchableOpacity
        onPress={() => sendPost()}
        style={styles.buttonEnvoyer}
        activeOpacity={1}>
        <Image
          source={require("../assets/images/blueBullediscuterStoryBonus.png")}
          style={styles.logoHeart}
        />

      </TouchableOpacity>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8DCCA",
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    backgroundColor: "#FCF8F1",
    alignItems: 'center',
    justifyContent: 'center',
  }
});