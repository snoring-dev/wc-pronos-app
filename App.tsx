import React from "react";
import { Provider as AppStoreProvider } from "react-redux";
import { Store } from "redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider, extendTheme } from "native-base";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { Pages } from "./utils/Pages";
import { ApplicationState } from "./store";
import { configureStore } from "./store/configureStore";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons'; 
import FlashMessage from "react-native-flash-message";
import NewsFeed from "./screens/NewsFeed";
import Matchs from "./screens/Matchs";
import Profile from "./screens/Profile";
import Community from "./screens/Community";
import EditProfile from "./screens/EditProfile";
import MatchView from "./screens/MatchView";
import CommunityView from "./screens/CommunityView";
import SplashScreen from "./screens/SplashScreen";
import socketClient from "./utils/Socket";

socketClient.connect();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="News"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Overview"
        component={NewsFeed}
        options={{
          tabBarLabel: "Overview",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Matches"
        component={Matchs}
        options={{
          tabBarLabel: "Matches",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-football" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          tabBarLabel: "Community",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="gamepad-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Your Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function HomeScreen() {
  return (
    <>
      <MyTabs />
    </>
  );
}

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}

export default function App() {
  const globalStore: Store<ApplicationState> = configureStore();
  return (
    <AppStoreProvider store={globalStore}>
      <FlashMessage position="top" />
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={Pages.Login}
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={Pages.SplashScreen}
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={Pages.Home}
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={Pages.MatchView}
              component={MatchView}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={Pages.CommunityView}
              component={CommunityView}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={Pages.Register}
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={Pages.EditProfile}
              component={EditProfile}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </AppStoreProvider>
  );
}
