import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "@shopify/restyle";

import { Onboarding, Welcome } from "./src/Authentication";
import { LoadAssets, theme } from "./src/components";

const fonts = {
  "SFPro-Display-Bold": require("./assets/fonts/SFPro-Display-Bold.ttf"),
  "SFPro-Display-Semibold": require("./assets/fonts/SFPro-Display-Semibold.ttf"),
  "SFPro-Display-Medium": require("./assets/fonts/SFPro-Display-Medium.ttf"),
  "SFPro-Display-Regular": require("./assets/fonts/SFPro-Display-Regular.ttf"),
};

const AuthenticationStack = createStackNavigator();
const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="OnBoarding" component={Onboarding} />
      <AuthenticationStack.Screen name="Welcome" component={Welcome} />
    </AuthenticationStack.Navigator>
  );
};

export default function App() {
  return (
    <ThemeProvider {...{ theme }}>
      <LoadAssets {...{ fonts }}>
        <AuthenticationNavigator />
      </LoadAssets>
    </ThemeProvider>
  );
}
