import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider, useAuth } from "./context/auth";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  console.log("yehehhehehehh");
  const { isAuthenticated, userType } = useAuth();
  const colorScheme = useColorScheme();

  console.log("YEHHEHHEH root layout");

  if (!isAuthenticated) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: "#6c5ce7",
          drawerInactiveTintColor: "#666",
          drawerStyle: {
            backgroundColor: "#ffffff",
          },
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            drawerIcon: ({ color }: { color: string }) => (
              <FontAwesome5 name="home" size={20} color={color} />
            ),
          }}
        />
        {userType === "patient" && (
          <>
            <Drawer.Screen
              name="connect-device"
              options={{
                drawerLabel: "Connect Device",
                drawerIcon: ({ color }: { color: string }) => (
                  <FontAwesome5 name="bluetooth" size={20} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="record-patient"
              options={{
                drawerLabel: "Record Patient",
                drawerIcon: ({ color }: { color: string }) => (
                  <FontAwesome5 name="user-plus" size={20} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="relatives"
              options={{
                drawerLabel: "Relatives List",
                drawerIcon: ({ color }: { color: string }) => (
                  <FontAwesome5 name="users" size={20} color={color} />
                ),
              }}
            />
            <Drawer.Screen
              name="search-relative"
              options={{
                drawerLabel: "Search Relative",
                drawerIcon: ({ color }: { color: string }) => (
                  <FontAwesome5 name="search" size={20} color={color} />
                ),
              }}
            />
          </>
        )}
      </Drawer>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  console.log("jkcsnskajncslkd");
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="connect-device" />
        <Stack.Screen name="record-patient" />
        <Stack.Screen name="relatives" />
        <Stack.Screen name="search-relative" />
      </Stack>
    </AuthProvider>
  );
}
