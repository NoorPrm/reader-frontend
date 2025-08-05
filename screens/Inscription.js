import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

export default function Inscription({ navigation }) {
    const [statut, setStatut] = useState('lecteur');
    const [username, setUsername] = useState('')

    const handleProfileUpdate = () => {
        fetch('http://10.188.219.101:3000/users/:token', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                statut: statut,
                photo: photo,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    navigation.navigate("TabNavigator");
                } else {
                    console.log('Erreur');
                }
            })
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.container}>
                <View style={styles.formulaire}>
                    <Text style={styles.formulaireText}>Formulaire d'inscription</Text>
                </View>

                <View style={styles.avatarContainer}>
                    <Image source={require('../assets/images/whiteUser.png')} style={styles.logoUser} />
                    <Text style={styles.textPhoto}> Photo de profil </Text>
                    <TouchableOpacity onPress={() => { }} style={styles.plusButton}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.formInputs}>
                    <View style={styles.Inputlabell}>
                        <Text style={styles.label1}>Username</Text>
                        <TextInput style={styles.input1} placeholder="Entrez votre nom d'utilisateur" value={username}                   // ← Lier à l'état
                            onChangeText={setUsername} />
                    </View>
                </View>
                <View style={styles.separator} />
                <View style={styles.statut}>
                    <Text style={styles.statutText}>Statut de l'utilisateur</Text>
                </View>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={statut}
                        onValueChange={(itemValue) => setStatut(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Lecteur" value="lecteur" />
                        <Picker.Item label="Auteur" value="auteur" />
                    </Picker>
                </View>

                <TouchableOpacity onPress={() => { handleProfileUpdate }} style={styles.buttonValidation} activeOpacity={0.8}>
                    <Text style={styles.textButton}> Validation </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCF8F1',
        alignItems: 'center',
        paddingTop: 20,
        width: "100%"
    },

    formulaire: {
        borderWidth: 0.5,
        borderRadius: 10,
        height: 50,
        width: 200,
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
        marginTop: 15,
        alignItems: 'center',
    },
    logoUser: {
        width: 150,
        height: 150,
        borderRadius: 70,
        backgroundColor: '#E8DCCA',
        borderWidth: 0.5,
        borderColor: '#E8DCCA',
    },
    textPhoto: {
        color: '#E8DCCA',
        fontSize: 16,
        fontWeight: "bold"
    },

    plusButton: {
        position: 'absolute',
        bottom: 100,
        right: 67,
        width: 17,
        height: 17,
        borderRadius: 12,
        backgroundColor: '#efefefff',
        alignItems: 'center',
        justifyContent: 'center',
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
    statut: {
        alignSelf: 'center',
        borderWidth: 0.5,
        borderRadius: 10,
        height: 75,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8DCCA',
        marginTop: 30,
    },
    statutText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    label1: {
        fontWeight: 'bold',
        fontSize: 7,
        marginBottom: 5,
        color: 'black',
    },
    input1: {

        borderWidth: 1,
        borderColor: '#E8DCCA',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
        backgroundColor: 'white',
        height: 50,
        width: '100%',
    },

    separator: {

        width: '100%',
        height: 2,
        backgroundColor: 'black',
    },

    pickerContainer: {

        width: 200,
        borderWidth: 1,
        borderColor: '#E8DCCA',
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 20,
    },

    buttonValidation: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: 200,
        backgroundColor: '#0E0E66',
        borderRadius: 20,
        marginTop: 40,
        marginBottom: 70,
    },
    textButton: {
        color: "white",
        fontWeight: "bold",
    }
});