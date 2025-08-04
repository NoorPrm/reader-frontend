import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function BookScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.returnBtn}>
        <Text style={styles.txtBtn}>Retour à la bibliothèque</Text>
      </TouchableOpacity>

      <View style={styles.bookContainer}>
        <Image
          source={require("../assets/images/couvlartdelaguerre.jpg")}
          style={styles.image}
        ></Image>
        <View style={styles.bookInfosContainer}>
          <Text style={styles.title}>TITRE API</Text>
          <Text style={styles.author}>auteur API</Text>
          <Text style={styles.parutionDate}>Date de parution API</Text>
          <Text style={styles.synopsisTitle}>RESUME</Text>
          <Text style={styles.synopsisTxt}>
            bla bla bla Texte résumé API bla bla bla bla bla bla Texte résumé
            API bla bla bla bla bla bla Texte résumé API bla bla bla bla bla bla
            Texte résumé API bla bla bla bla bla bla Texte résumé API bla bla
            bla
          </Text>{" "}
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.txtBtn}>Ajouter à ma bibliothèque</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.totalStars}>
        <FontAwesome name="star" size={25} color="#0E0E66" />
        <FontAwesome name="star" size={25} color="#0E0E66" />
        <FontAwesome name="star" size={25} color="#0E0E66" />
        <FontAwesome name="star" size={25} color="#0E0E66" />
        <FontAwesome name="star" size={25} color="#0E0E66" />
        <View style={styles.totalAvis}>
          <Text>(xxxx avis en DB)</Text>
        </View>
        <View style={styles.addBtnContainer}>
          <TouchableOpacity style={styles.addAvisBtn}>
            <Text style={styles.txtBtn}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.avisCard}>
          <View style={styles.avisHeader}>
            <Image
              source={require("../assets/images/userBryanCranston.jpg")}
              style={styles.avatarImg}
            />
            <View style={styles.avisContainer}>
              <TouchableOpacity>
                <Text style={styles.userName}>Bryan Cranston</Text>
              </TouchableOpacity>
              <View style={styles.userStars}>
                {[...Array(5)].map((_, i) => (
                  <FontAwesome key={i} name="star" size={20} color="#0E0E66" />
                ))}
                <View style={styles.dateAvis}>
                  <Text>Il y a 40 jours</Text>
                </View>
              </View>
              <Text>(133 avis)</Text>
            </View>
          </View>

          <View style={styles.avisTxt}>
            <Text>
              blablabla mon avis bla bla bla blablabla mon avis bla bla bla
              blablabla mon avis bla bla bla blablabla mon avis bla bla bla
              blablabla mon avis bla bla bla blablabla mon avis bla bla bla
              blablabla mon avis bla bla bla blablabla mon avis bla bla bla
              blablabla mon avis bla bla bla blablabla mon avis bla bla bla
            </Text>
          </View>
        </View>

        <View style={styles.avisCard}>
          <View style={styles.avisHeader}>
            <Image
              source={require("../assets/images/userBryanCranston.jpg")}
              style={styles.avatarImg}
            />
            <View style={styles.avisContainer}>
              <TouchableOpacity>
                <Text style={styles.userName}>Bryan Cranston</Text>
              </TouchableOpacity>
              <View style={styles.userStars}>
                {[...Array(5)].map((_, i) => (
                  <FontAwesome key={i} name="star" size={20} color="#0E0E66" />
                ))}
                <View style={styles.dateAvis}>
                  <Text>Il y a 40 jours</Text>
                </View>
              </View>
              <Text>(133 avis)</Text>
            </View>
          </View>

          <View style={styles.avisTxt}>
            <Text>
              blablabla mon avis bla bla bla blablabla mon avis bla bla bla
              blablabla mon avis bla bla bla blablabla mon avis bla bla bla
              blablabla mon avis bla bla bla blablabla mon avis bla bla bla
              blablabla mon avis bla bla bla blablabla mon avis bla bla bla
              blablabla mon avis bla bla bla blablabla mon avis bla bla bla
            </Text>
          </View>
        </View>

        <View style={styles.avisCard}>
          <View style={styles.avisHeader}>
            <Image
              source={require("../assets/images/userBryanCranston.jpg")}
              style={styles.avatarImg}
            />
            <View style={styles.avisContainer}>
              <TouchableOpacity>
                <Text style={styles.userName}>Bryan Cranston</Text>
              </TouchableOpacity>
              <View style={styles.userStars}>
                {[...Array(5)].map((_, i) => (
                  <FontAwesome key={i} name="star" size={20} color="#0E0E66" />
                ))}
                <View style={styles.dateAvis}>
                  <Text>Il y a 40 jours</Text>
                </View>
              </View>
              <Text>(133 avis)</Text>
            </View>
          </View>

          <View style={styles.avisTxt}>
            <Text>
              blablabla mon avis bla bla bla blablabla mon avis bla bla bla
              blablabla mon avis bla bla bla blablabla mon avis bla bla bla
              blablabla mon avis bla bla bla blablabla mon avis bla bla bla
              blablabla mon avis bla bla bla blablabla mon avis bla bla bla
              blablabla mon avis bla bla bla blablabla mon avis bla bla bla
            </Text>
          </View>
        </View>

        <View style={styles.avisCard}>
          <View style={styles.avisHeader}>
            <Image
              source={require("../assets/images/userBryanCranston.jpg")}
              style={styles.avatarImg}
            />
            <View style={styles.avisContainer}>
              <TouchableOpacity>
                <Text style={styles.userName}>Bryan Cranston</Text>
              </TouchableOpacity>
              <View style={styles.userStars}>
                {[...Array(5)].map((_, i) => (
                  <FontAwesome key={i} name="star" size={20} color="#0E0E66" />
                ))}
                <View style={styles.dateAvis}>
                  <Text>Il y a 40 jours</Text>
                </View>
              </View>
              <Text>(133 avis)</Text>
            </View>
          </View>

          <View style={styles.avisTxt}>
            <Text>
              blablabla mon avis bla bla bla blablabla mon avis bla bla bla
              blablabla mon avis bla bla bla blablabla mon avis bla bla bla
              blablabla mon avis bla bla bla blablabla mon avis bla bla bla
              blablabla mon avis bla bla bla blablabla mon avis bla bla bla
              blablabla mon avis bla bla bla blablabla mon avis bla bla bla
            </Text>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF8F1",
  },
  returnBtn: {
    padding: 10,
    margin: 10,
    marginBottom: 75,
    borderRadius: 5,
    backgroundColor: "#0E0E66",
    float: "left",
    width: 180,
  },
  txtBtn: {
    color: "#ffffffff",
    fontFamily: "Inter_400Regular",
    textAlign: "center",
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addBtn: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: "#0E0E66",
  },
  totalAvis: {
    margin: 5,
    justifyContent: "center",
  },
  bookContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  bookInfosContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
  image: {
    height: 220,
    width: 140,
    margin: 10,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 25,

    textAlign: "center",
  },
  author: {
    textAlign: "center",
    fontFamily: "Inter_400Regular",
  },
  parutionDate: {
    textAlign: "center",
    fontFamily: "Inter_400Regular",
  },
  synopsisTitle: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
  },
  synopsisTxt: {
    textAlign: "center",
    fontFamily: "Inter_400Regular",

    width: 200,
    height: 120,
    margin: 5,
  },

  totalStars: {
    margin: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addAvisBtn: {
    padding: 10,
    margin: 10,
    width: 35,
    borderRadius: 5,
    backgroundColor: "#0E0E66",
  },
  avisCard: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  avisHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatarImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  avisContainer: {
    marginLeft: 10,
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Inter_700Bold",
    color: "#0E0E66",
  },
  userStars: {
    flexDirection: "row",
  },
  dateAvis: {
    justifyContent: "center",
    margin: 5,
  },
  avisTxt: {
    marginTop: 10,
    fontFamily: "Inter_400Regular",
  },
});
