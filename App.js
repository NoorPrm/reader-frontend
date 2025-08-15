import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { interFonts } from './assets/fonts/fonts';

import HomeScreen from "./screens/HomeScreen";
import GeneralScreen from "./screens/GeneralScreen";
import SearchScreen from "./screens/SearchScreen";
import ResultSearchScreen from "./screens/ResultSearchScreen";
import LibraryScreen from "./screens/LibraryScreen";
import BookLibraryScreen from "./screens/BookLibraryScreen";
import ComicLibraryScreen from "./screens/ComicLibraryScreen";
import MangaLibraryScreen from "./screens/MangaLibraryScreen";
import UserProfilScreen from "./screens/UserProfilScreen";
import BookScreen from "./screens/BookScreen";
import BookedexScreen from "./screens/BookedexScreen";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import InscriptionScreen from "./screens/InscriptionScreen";
import SettingsScreen from "./screens/SettingsScreen";
import user from "./reducers/user";
import bookSelected from "./reducers/bookSelected";
import PublicProfileScreen from "./screens/PublicProfileScreen";
import searchResults from "./reducers/searchResults";

const store = configureStore({
  reducer: { user, bookSelected, searchResults },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName = "";

        if (route.name === "General") iconName = "home";
        else if (route.name === "Search") iconName = "search";
        else if (route.name === "Library") iconName = "book";
        else if (route.name === "UserProfil") iconName = "user-circle";

        return (
          <FontAwesome
            name={iconName}
            size={35}
            color={color}
            style={{ marginTop: 10 }}
          />
        );
      },
      tabBarShowLabel: false,
      tabBarActiveTintColor: "#ffffffff",
      tabBarInactiveTintColor: "#82888bff",
      tabBarStyle: { backgroundColor: "#0E0E66" },
      headerShown: false,
    })}
  >
    <Tab.Screen name="General" component={GeneralScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Library" component={LibraryScreen} />
    <Tab.Screen name="UserProfil" component={UserProfilScreen} />
  </Tab.Navigator>
);

export default function App() {

  const [fontsLoaded] = useFonts(interFonts);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Inscription" component={InscriptionScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="ResultSearch" component={ResultSearchScreen} />
          <Stack.Screen name="BookLibrary" component={BookLibraryScreen} />
          <Stack.Screen name="ComicLibrary" component={ComicLibraryScreen} />
          <Stack.Screen name="MangaLibrary" component={MangaLibraryScreen} />
          <Stack.Screen name="BookInfos" component={BookScreen} />
          <Stack.Screen name="Bookedex" component={BookedexScreen} />
          <Stack.Screen name="Parametres" component={SettingsScreen} />
          <Stack.Screen name="PublicProfile" component={PublicProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
