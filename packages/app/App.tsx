import React from "react";
import "expo-dev-client";
import { View, Dimensions, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ApolloProvider } from "@apollo/client";
import { client } from "./src/Apollo/apollo";

import { Friends } from "./src/Groups/FriendsStack";
import { HomeNavigator } from "./src/Home/HomeNavigator";
import { Gyms } from "./src/Gyms/Gyms";
import { TabBar } from "./src/TabBar/TabBar";
import { Profile } from "./src/Settings/Profile";

import { NavigationContainer, Theme } from "@react-navigation/native";
import { AuthGateway } from "./src/Auth/Auth";
import { stackHeader } from "./src/Header";

const { width, height } = Dimensions.get("window");

export const appTheme: Theme = {
  dark: false,
  colors: {
    primary: "rgb(0, 122, 255)",
    background: "#EEE",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(216, 216, 216)",
    notification: "rgb(255, 59, 48)",
  },
};

export default function App() {
  let [loaded] = useFonts({
    Lexend: require("./assets/fonts/Lexend/Lexend-VariableFont_wght.ttf"),
    LexendThin: require("./assets/fonts/Lexend/static/Lexend-Light.ttf"),
    LexendSemibold: require("./assets/fonts/Lexend/static/Lexend-SemiBold.ttf"),
    LexendBold: require("./assets/fonts/Lexend/static/Lexend-ExtraBold.ttf"),
  });

  if (!loaded) return null;

  StatusBar.setBarStyle("dark-content");

  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer theme={appTheme}>
      <ApolloProvider client={client}>
        <AuthGateway>
          <View
            style={{
              width,
              height: height,
            }}
          >
            <Tab.Navigator
              initialRouteName="You"
              id="BottomTab"
              screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
              }}
              backBehavior="none"
              tabBar={(props) => <TabBar {...props} />}
            >
              <Tab.Screen name="Gyms" component={Gyms} />
              <Tab.Screen name="Routes" component={Gyms} />
              <Tab.Screen name="You" component={HomeNavigator} />
              <Tab.Screen name="Groups" component={Friends} />
              <Tab.Screen name="Settings" component={Profile} />
            </Tab.Navigator>
          </View>
        </AuthGateway>
      </ApolloProvider>
    </NavigationContainer>
  );
}
