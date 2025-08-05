import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
// import { Image } from 'expo-image';
import { TouchableOpacity } from 'react-native';

export default function LibraryScreen({navigation}) {
  
    const [mangas, setMangas] = useState("mangas");
    const [bd, setBd] = useState("bd");
    const [livre, setLivre] = useState("livre");

  return (
   <View style={styles.container}>
               <Text>Ma Bibliothèque</Text>
   
               <TouchableOpacity style={styles.input} onPress={() => navigation.navigate("BookLibraryScreen", { category: "mangas" })}>
                   <Text style={styles.text}>{mangas}</Text>
                   <Image source={require('../../assets/images/BibliothequeManga.png')} style={styles.logo1}/>
               </TouchableOpacity>
   
               <TouchableOpacity style={styles.input} onPress={() => navigation.navigate("BookLibraryScreen", { category: "bd" })}>
                   <Text style={styles.text}>{bd}</Text>
                   <Image source={require('../../assets/images/BibliothequeBD.png')} style={styles.logo2} />
               </TouchableOpacity>
   
               <TouchableOpacity style={styles.input} onPress={() => navigation.navigate("BookLibraryScreen", { category: "livre" })}>
                   <Text style={styles.text}>{livre}</Text>
                   <Image source={require('../../assets/images/BibliothequeLivre.png')} style={styles.logo3} />
               </TouchableOpacity>
   
               <StatusBar style="auto" />
           </View>
  )}
   

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        color: '#0E0E66',
        textAlign: 'center'
    },
     input: {
        borderColor: '#E8DCCA',
        backgroundColor: '#FCF8F1',
        borderWidth: 2,
        paddingVertical: 12,
        paddingHorizontal: 20,
        margin: 10,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
