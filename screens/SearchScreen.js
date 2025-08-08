import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function SearchScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.input}
        onPress={() => navigation.navigate("BookInfos")}
      >
        <Text style={styles.text}>BookInfos</Text>
        {/*Image source={require('')} style={styles.logo3} />*/}
      </TouchableOpacity>
      <Text>Chercher un livre.</Text>
      <StatusBar style="auto" />
      <TouchableOpacity
        style={styles.input}
        onPress={() => navigation.navigate("Bookedex")}
      >
        <Text style={styles.text}>Scanne ton livre !</Text>
        {/*Image source={require('')} style={styles.logo3} />*/}
      </TouchableOpacity>
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
