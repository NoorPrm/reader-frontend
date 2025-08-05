import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";

export default function BookLibraryScreen({ route }) {
  const { category } = route.params; //<= permet d'acceder aux different catégorie (Mangas,BD,Livre)
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:9780140328721&format=json&jscmd=data${category}`).then(data => setBooks(data));
  }, [category]
  )

  


  return (
    <View style={styles.container}>
      {books.map((book) => (
        <View key={book.id} style={styles.bookItem}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.name}>{book.name}</Text>
            <Text style={styles.genre}>{book.genre}</Text>
            <Text style={styles.date}>{book.date}</Text>
            <Text style={styles.librariesCount}>Présent dans {book.librariesCount} bibliothèques</Text>
          </View>

        </View>
      ))}
      <StatusBar style="auto" />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF8F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bookItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',



  },
  textContainer: {
    flex: 1
  },

  title: {
    fontWeight: 'bold',
    color: '#0E0E66',
    fontSize: 16,
  },

  name: {
    fontWeight: 'bold',
    color: '#0E0E66',
    fontSize: 12,
  },

  date: {
    fontStyle: 'italic',
    color: '#0E0E66',
    fontSize: 12,
  },

  genre: {
    fontStyle: 'italic',
    color: '#0E0E66',
    fontSize: 12,
  },

  librariesCount:{
    fontWeight: 'bold',
    color: '#0E0E66',
    fontSize: 16,
  }

});