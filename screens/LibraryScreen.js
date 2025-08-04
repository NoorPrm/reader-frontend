import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function LibraryScreen({ navigation }) {
  const handleSubmit = () => {
    navigation.navigate("BookInfos");
  };

  return (
    <View style={styles.container}>
      <Text>Ma bibliothèque de Livres, BD et Mangas.</Text>
      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text>Go to Book Infos</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
