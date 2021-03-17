import * as React from "react";
import { ThemeProvider } from "@shopify/restyle";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  assets as authenticationAssets,
  AuthenticationNavigator,
} from "./src/Authentication";
import { LoadAssets, theme } from "./src/components";

const assets = [...authenticationAssets];
const fonts = {
  "SFPro-Display-Bold": require("./assets/fonts/SFPro-Display-Bold.ttf"),
  "SFPro-Display-Semibold": require("./assets/fonts/SFPro-Display-Semibold.ttf"),
  "SFPro-Display-Medium": require("./assets/fonts/SFPro-Display-Medium.ttf"),
  "SFPro-Display-Regular": require("./assets/fonts/SFPro-Display-Regular.ttf"),
};

export default function App() {
  return (
    <ThemeProvider {...{ theme }}>
      <LoadAssets {...{ fonts, assets }}>
        <SafeAreaProvider>
          <AuthenticationNavigator />
        </SafeAreaProvider>
      </LoadAssets>
    </ThemeProvider>
  );
}
