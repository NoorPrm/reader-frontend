import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { useSelector } from 'react-redux';
// import { LOCAL_IP } from "@env"; 
const backendAdress = process.env.EXPO_PUBLIC_URL_BACKEND

export default function Inscription({ navigation }) {
    const [statut, setStatut] = useState('LECTEUR');
    const [username, setUsername] = useState('');
    const [photo, setPhoto] = useState(null);

    const token = useSelector((state) => state.user.value.token);

    const handleProfileUpdate = () => {
        // console.log("token:", token)
        fetch(`${backendAdress}/users/${token}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                statut: statut,
                profilPicture: photo,
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

    const pickImage = () => {
        ImagePicker.requestMediaLibraryPermissionsAsync()
            .then(permissionResult => {
                if (!permissionResult.granted) {
                    alert("Permission refusée pour accéder aux images.");
                    return;
                }
                ImagePicker.launchImageLibraryAsync({
                    mediaTypes: "images",
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                })
                .then(result => {
                    if (!result.canceled) {
                        setPhoto(result.assets[0].uri);
                    }
                });
            });
    };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.formulaire}>
          <Text style={styles.formulaireText}>Formulaire d'inscription</Text>
        </View>

                <View style={styles.avatarContainer}>
                    <Image source={photo ? { uri: photo } : require('../assets/images/whiteUser.png')} style={styles.logoUser} />
                    <Text style={styles.textPhoto}> PHOTO DE PROFIL </Text>
                    {!photo && (
                    <TouchableOpacity onPress={pickImage} style={styles.plusButton}>
                        <Text style={styles.plus}>+</Text>
                    </TouchableOpacity>
                    )}
                </View>

                <View style={styles.formInputs}>
                    <View style={styles.Inputlabell}>
                        <Text style={styles.label1}>Nom d'utilisateur</Text>
                        <TextInput style={styles.input1} placeholder="Entrez votre nom d'utilisateur" autoCapitalize="none" value={username}                   // ← Lier à l'état
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
                        itemStyle={{ fontSize: 16 }}
                    >
                        <Picker.Item label="LECTEUR" value="LECTEUR" />
                        <Picker.Item label="AUTEUR" value="AUTEUR" />
                    </Picker>
                </View>

                <TouchableOpacity onPress={handleProfileUpdate} style={styles.buttonValidation} activeOpacity={0.8}>
                    <Text style={styles.textButton}> Validation </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: '#FCF8F1',
        alignItems: 'center',
        paddingTop: 20,
        width: "100%"
    },

    formulaire: {
        borderWidth: 0.5,
        borderRadius: 15,
        height: 50,
        width: 240,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E8DCCA',
    },
    formulaireText: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "Inter_700Bold",
        textAlign: 'center',
    },
    avatarContainer: {
        marginTop: 25,
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
        fontFamily: "Inter_700Bold",
    },

    plusButton: {
        position: 'absolute',
        bottom: 100,
        right: 67,
        width: 17,
        height: 20,
        borderRadius: 12,
        backgroundColor: '#0E0E66',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    plus: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: "Inter_700Bold",
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
        borderRadius: 15,
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
        fontFamily: "Inter_700Bold",
        textAlign: 'center',
    },
    label1: {
        marginBottom: -9,
        paddingLeft: 5,
        fontSize: 13,
        color: "#5c5c5c",
        fontFamily: "Inter_400Regular",
        
    },
    input1: {
        borderWidth: 1,
        borderColor: "#E8DCCA",
        borderRadius: 10,
        marginBottom: 16,
        height: 80,
        fontSize: 15,
        paddingLeft: 12,
        fontFamily: "Inter_400Regular",
        textAlign: "center",
    },

    separator: {
        width: '100%',
        height: 2,
        backgroundColor: 'black',
    },

    pickerContainer: {
        width: 180,
        height: 150,
        borderWidth: 1,
        borderColor: '#E8DCCA',
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 20,
    },

    picker: {
        color: '#fffff',
    },

    buttonValidation: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 70,
        width: 250,
        backgroundColor: '#0E0E66',
        borderRadius: 50,
        marginTop: 35,
        marginBottom: 70,
    },
    textButton: {
        color: "#ffffffff",
        fontSize: 18,
        fontFamily: "Inter_400Regular",
    }
});
