import React from "react";
import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router"

LogBox.ignoreAllLogs(true);

export default function _Rootlayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  )
}