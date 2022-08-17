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

const Stack = createNativeStackNavigator();

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
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={Pages.Login} component={Login} />
            <Stack.Screen name={Pages.Register} component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </AppStoreProvider>
  );
}
