import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { interFontsToUse } from '../assets/fonts/fonts';
import { useSelector, useDispatch } from "react-redux";
import { login } from "../reducers/user";

//const backendAdress = process.env.EXPO_PUBLIC_URL_BACKEND;
const myip = process.env.MY_IP;
const backendAdress = `${myip}`;
//console.log("Backend URL:", backendAdress);

export default function Parametres({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const statut = user.statut;
  const dispatch = useDispatch();

  const [statutL, setStatutL] = useState(user.statut);
  const [email, setEmail] = useState(user.email || "");
  const [username, setUsername] = useState(user.username || "");
  const [password, setPassword] = useState("");
  const [isPublic, setIsPublic] = useState(true);

    // Fetch UPDATE 
    const handleUpdate = () => {
        fetch(`${backendAdress}/users/${user.token}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                username,
                statut: statutL,
                mode: isPublic ? "Public" : "Privé",
                password: password || undefined,
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.result) {
                    dispatch(login({
                        email: data.updatedUser.email, // updatedUser : la data reçue dans la route PUT users
                        username: data.updatedUser.username,
                        statut: data.updatedUser.statut,
                        profilPicture: data.updatedUser.profilPicture,
                    }));
                    console.log('Modification mise à jour avec succès');
                    navigation.navigate("TabNavigator");
                } else {
                    console.log('Erreur à la modification');
                }
            });
    };

  // FETCH DELETE
  const handleDelete = () => {
    fetch(`${backendAdress}/users/${user.email}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          console.log("Compte supprimé");
          navigation.navigate("Home");
        } else {
          console.log("Erreur suppression:", data.error);
        }
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate("TabNavigator")}
      >
        <Text style={styles.backText}>Retour au Profil Utilisateur</Text>
      </TouchableOpacity>

      <View style={styles.statut}>
        <Text style={styles.statutText}>Statut de l'utilisateur</Text>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={statutL}
          onValueChange={(itemValue) => setStatutL(itemValue)}
          style={styles.picker}
          itemStyle={{ fontSize: 16 }}
        >
          <Picker.Item label="LECTEUR" value="LECTEUR" />
          <Picker.Item label="AUTEUR" value="AUTEUR" />
        </Picker>
      </View>

      <View style={styles.visibilityContainer}>
        <TouchableOpacity
          style={[
            styles.visibilityButton,
            !isPublic && styles.visibilitySelectedPrivate,
          ]}
          onPress={() => setIsPublic(false)}
        >
          <Text
            style={[
              styles.visibilityText,
              !isPublic && styles.visibilityTextSelectedPrivate,
            ]}
          >
            Privé
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.visibilityButton,
            isPublic && styles.visibilitySelectedPublic,
          ]}
          onPress={() => setIsPublic(true)}
        >
          <Text
            style={[
              styles.visibilityText,
              isPublic && styles.visibilityTextSelectedPublic,
            ]}
          >
            Public
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionTitle}>
        <Text style={styles.sectionTitleText}>Coordonnées</Text>
      </View>

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Text style={styles.label}>Nom d'utilisateur</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
                style={styles.input}
                placeholder="Entrez le nouveau mot de passe"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.validateButton} onPress={handleUpdate}>
          <Text style={styles.validateButtonText}>
            Valider les modifications
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Supprimer mon compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    minHeight: Dimensions.get("window").height,
    backgroundColor: "#FCF8F1",
    alignItems: "center",
    paddingBottom: 40,
  },
  back: {
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    paddingHorizontal: 12,
    backgroundColor: "#0E0E66",
    marginTop: 60,
    marginBottom: 20,
    marginLeft: 20,
    borderRadius: 5,
  },
  backText: {
    color: "#FFFFFF",
    fontFamily: interFontsToUse.regular,
  },
  statut: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "#0E0E66",
    height: 60,
    width: 260,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF8F1",
    marginTop: 5,
  },
  statutText: {
    fontSize: 17,
    fontFamily: interFontsToUse.regular,
    textAlign: "center",
    color: "#0E0E66",
  },
  statutValue: {
    marginTop: 20,
    height: 50,
    width: 220,
    borderRadius: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  statutValueText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  visibilityContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
    gap: 50,
  },
  visibilityButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 100,
    backgroundColor: "#E6DCCF",
    alignItems: "center",
  },
  visibilitySelectedPrivate: {
    backgroundColor: "#0E0E66",
  },
  visibilitySelectedPublic: {
    backgroundColor: "#0E0E66",
  },
  visibilityText: {
    color: "black",
  },
  visibilityTextSelectedPrivate: {
    color: "white",
  },
  visibilityTextSelectedPublic: {
    color: "white",
  },
  sectionTitle: {
    borderWidth: 2,
    borderColor: "#E6DCCF",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 30,
  },
  sectionTitleText: {
    fontSize: 17,
    fontFamily: interFontsToUse.regular,
    textAlign: "center",
    color: "#0E0E66",
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: 30,
    marginTop: 15,
    marginBottom: -7,
    paddingLeft: 5,
    fontSize: 13,
    color: "#5c5c5c",
    fontFamily: interFontsToUse.bold,
  },
  input: {
    width: "85%",
    height: 50,
    borderColor: "#E8DCCA",
    borderWidth: 1,
    borderRadius: 10,
    opacity: 0.4,
    paddingHorizontal: 10,
    fontSize: 15,
    alignSelf: "flex-start",
    marginLeft: 30,
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 190,
    gap: 2,
    marginRight: 139,
  },
  validateButton: {
    backgroundColor: "#0E0E66",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  validateButtonText: {
    color: "#FFFFFF",
    fontFamily: interFontsToUse.regular,
    fontSize: 12,
  },
  deleteButton: {
    backgroundColor: "#FF4C61",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#FFFFFF",
    fontFamily: interFontsToUse.regular,
    fontSize: 12,
  },
   pickerContainer: {
    width: 180,
    height: 150,
    borderWidth: 1,
    borderColor: "#E8DCCA",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 20,
  },
  picker: {
    color: "#fffff",
  },
});
