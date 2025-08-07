import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function UserProfileScreen() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPublic, setIsPublic] = useState(true);

    return (
        <View style={styles.container}>

            <TouchableOpacity>
                <Text> Retour au Profil Utilisateur</Text>
            </TouchableOpacity>
            <View style={styles.statut}>
                <Text>Statut de l'utilisateur</Text></View>
            <Text>LECTEUR</Text>


            <Text style={styles.label}>E-mail</Text>
            <TextInput
                style={styles.input}
                placeholder="Entrez votre Email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress" //autocomplétion IOS
                autoComplete="email" // autocomplétion Android
                onChangeText={(value) => setEmail(value)}
                value={email}
            />

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        backgroundColor: "#FCF8F1",
        alignItems: "center",
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
    }
})