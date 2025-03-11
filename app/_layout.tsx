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
import { View, ActivityIndicator } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider, useAuth } from "./context/auth";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// This function is no longer used, but kept for reference
// function RootLayoutNav() {
//   const { isAuthenticated, userType, isLoading } = useAuth();
//   const colorScheme = useColorScheme();

//   // Show loading indicator while checking authentication state
//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#6c5ce7" />
//       </View>
//     );
//   }

//   // Redirect to login if not authenticated
//   if (!isAuthenticated) {
//     return <Redirect href="/auth/login" />;
//   }

//   return (
//     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//       <Drawer
//         screenOptions={{
//           headerShown: false,
//           drawerActiveTintColor: "#6c5ce7",
//           drawerInactiveTintColor: "#666",
//           drawerStyle: {
//             backgroundColor: "#ffffff",
//           },
//         }}
//       >
//         <Drawer.Screen
//           name="(tabs)"
//           options={{
//             drawerLabel: "Home",
//             drawerIcon: ({ color }: { color: string }) => (
//               <FontAwesome5 name="home" size={20} color={color} />
//             ),
//           }}
//         />
//         {userType === "patient" && (
//           <>
//             <Drawer.Screen
//               name="connect-device"
//               options={{
//                 drawerLabel: "Connect Device",
//                 drawerIcon: ({ color }: { color: string }) => (
//                   <FontAwesome5 name="bluetooth" size={20} color={color} />
//                 ),
//               }}
//             />
//             <Drawer.Screen
//               name="record-patient"
//               options={{
//                 drawerLabel: "Record Patient",
//                 drawerIcon: ({ color }: { color: string }) => (
//                   <FontAwesome5 name="user-plus" size={20} color={color} />
//                 ),
//               }}
//             />
//             <Drawer.Screen
//               name="relatives"
//               options={{
//                 drawerLabel: "Relatives List",
//                 drawerIcon: ({ color }: { color: string }) => (
//                   <FontAwesome5 name="users" size={20} color={color} />
//                 ),
//               }}
//             />
//             <Drawer.Screen
//               name="search-relative"
//               options={{
//                 drawerLabel: "Search Relative",
//                 drawerIcon: ({ color }: { color: string }) => (
//                   <FontAwesome5 name="search" size={20} color={color} />
//                 ),
//               }}
//             />
//           </>
//         )}
//       </Drawer>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }

export default function RootLayout() {
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
      <RootLayoutNavigator />
    </AuthProvider>
  );
}

function RootLayoutNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading indicator while checking authentication state
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6c5ce7" />
      </View>
    );
  }

  return (
    <Stack
      initialRouteName={isAuthenticated ? "(tabs)" : "auth"}
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          // Prevent going back to login after authentication
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="connect-device" options={{ headerShown: false }} />
      <Stack.Screen name="record-patient" options={{ headerShown: false }} />
      <Stack.Screen name="relatives" options={{ headerShown: false }} />
      <Stack.Screen name="search-relative" options={{ headerShown: false }} />
      <Stack.Screen
        name="emergency-contacts"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="my-doctor" options={{ headerShown: false }} />
      <Stack.Screen
        name="personal-information"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="my-patients" options={{ headerShown: false }} />
      <Stack.Screen name="hospital-info" options={{ headerShown: false }} />
    </Stack>
  );
}
