import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { BookLibraryScreen } from "../screens/BookLibraryScreen";

const [post, setPost] = useState("");
const [like, setLike] = useState(false);
const [comment, setComment] = useState("");
const [postComments, setPostComments] = useState([]);

const sendPost = () => {
  fetch('http://192.168.1.16:3000/users/post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ post, like, comment }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.result) {
      
    }
  })
};

export default function StoryScreen() {
  return (
    <View style={styles.container}>
      <Text></Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});