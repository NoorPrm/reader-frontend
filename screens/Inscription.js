import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';



export default function Inscription({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.formulaire}>
                <Text style={styles.formulaireText}>Formulaire d'inscription</Text>
            </View>


            <View style={styles.avatarContainer}>
                <Image
                    source={require('../assets/images/whiteUser.png')}
                    style={styles.logoUser}
                />
                <TouchableOpacity onPress={() => handleSubmit()} style={styles.plusButton}>
                    <Text>+</Text>
                </TouchableOpacity>
                <View style={styles.formInputs}>
                    <View style={styles.Inputlabell}>
                        <Text style={styles.label1}>Username</Text>
                        <TextInput
                            style={styles.input1}
                            placeholder="Entrez votre nom d'utilisateur"
                        />
                    </View>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCF8F1',
        alignItems: 'center',
        paddingTop: 40,
    },

    formulaire: {
        borderWidth: 0.5,
        borderRadius: 10,
        height: 50,
        width: 250,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8DCCA',
    },

    formulaireText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    avatarContainer: {
        position: 'relative',
        marginTop: 15,
        alignItems: 'center'
    },

    logoUser: {
        width: 150,
        height: 150,
        borderRadius: 70,
        backgroundColor: '#E8DCCA',
        borderWidth: 0.5,
        borderColor: '#E8DCCA',
    },

    plusButton: {
        position: 'absolute',
        bottom: 105,
        right: 67,
        width: 17,
        height: 17,
        borderRadius: 12,
        backgroundColor: '#efefefff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextPhoto: {
        color: '#E8DCCA',
        fontWeight: 'bold',
        fontSize: 20
    },
    
    formInputs: {
  marginTop: 20,
  width: 250,
  alignItems: 'flex-start', 
},

Inputlabell: {
  width: '100%',
  marginBottom: 20,
},

label1: {
  fontWeight: 'bold',
  marginBottom: 5,
  fontSize: 14,
  color: 'black',
},
   

});