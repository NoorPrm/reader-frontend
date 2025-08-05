import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FontAwesome from "react-native-vector-icons/FontAwesome";

import HomeScreen from "./screens/HomeScreen";
import GeneralScreen from "./screens/GeneralScreen";
import SearchScreen from "./screens/SearchScreen";
import LibraryScreen from "./screens/LibraryScreen";
import UserProfilScreen from "./screens/UserProfilScreen";
import BookScreen from "./screens/BookScreen";
import BookedexScreen from "./screens/BookedexScreen";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Inscription from "./screens/Inscription";
// import user from './reducers/user';

const store = configureStore({
  reducer: {},
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
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Inscription" component={Inscription} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="BookInfos" component={BookScreen} />
          <Stack.Screen name="Bookedex" component={BookedexScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
