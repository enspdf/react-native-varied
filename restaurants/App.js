import React from "react";
import Navigation from "./navigation/Navigation";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

export default function App() {
  return <Navigation />;
}
