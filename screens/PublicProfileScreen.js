import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    Text, View, TouchableOpacity, StyleSheet, Image, ScrollView,
} from "react-native";
import { interFontsToUse } from "../assets/fonts/fonts";
import { Feather } from "@expo/vector-icons";

const myip = process.env.MY_IP;
const backendAdress = `${myip}`;

export default function PublicProfileScreen({ route, navigation }) {
    const { username, profilPicture, statut = [] } = route.params || {};

    const [activeTab, setActiveTab] = useState("bibliotheque");

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.back}
                onPress={() => navigation.navigate("TabNavigator")}
            >
                <Text style={styles.backText}>Retour à l'acceuil </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuButton} onPress={() => { }}>
                <Text style={styles.menuText}>⋯</Text>
            </TouchableOpacity>
            <View style={styles.profileSection}>
                <Text style={styles.username}>{username || "Utilisateur"}</Text>
                <View style={styles.statutRow}>
                    <Text style={styles.userStatut}>{statut}</Text>
                    {statut?.toLowerCase() === "auteur" && (
                        <Feather name="feather" size={16} color="#0E0E66" />
                    )}
                </View>
                <Image
                    source={
                        profilPicture
                            ? { uri: profilPicture }
                            : require("../assets/images/whiteUser.png")
                    }
                    style={styles.avatar}
                />
                <Text style={styles.followersText}>
                  ♥︎ 43 Abonnés
                </Text>
            </View>

            <View style={styles.separator} />

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

            <ScrollView style={styles.content}>
                {activeTab === "bibliotheque" ? (
                    <Text style={{ fontStyle: "italic" }}>
                        Aucun livre présent dans la bibliothèque.
                    </Text>
                ) : (
                    <View>
                        <Text style={{ fontStyle: "italic" }}>Aucun post pour cet utilisateur.</Text>
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
    backgroundColor: "#FCF8F1",
    alignItems: "center",
  },

  menuButton: {
    position: "absolute",
    top: 20,
    right: 15,
    padding: 10,
  },
  menuText: {
    fontSize: 24,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 50,
  },

  username: {
    fontSize: 22,
    fontFamily: interFontsToUse.bold,
    marginBottom: 5,
    color: "#0E0E66",
  },

    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10,
        marginTop: 10,
        backgroundColor: "#E8DCCA",
    },

  followersText: {
    fontSize: 14,
    color: "#0E0E66",
    fontWeight: "500",
    opacity: 0.4,
  },
  separator: {
    width: "100%",
    height: 2,
    backgroundColor: "#E8DCCA",
    marginBottom: 10,
    marginTop: 10,
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
        borderColor: "#0E0E66"
    },
    tabText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#0E0E66"
    },
    content: {
        width: "100%",
        padding: 20
    },
    back: {
        alignSelf: "flex-start",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        paddingHorizontal: 12,
        backgroundColor: "#0E0E66",
        marginTop: 35,
        marginBottom: 30,
        marginLeft: 20,
        borderRadius: 5,
    },
    backText: {
        color: "#FFFFFF",
        fontFamily: interFontsToUse.regular,
    },
    profileSection: {
        alignItems: "center",
        marginTop: -10
    },
    statutRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
    },
    userStatut: { fontFamily: interFontsToUse.bold, color: "#0E0E66" },

});
