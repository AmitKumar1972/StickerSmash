import { Stack, Redirect } from "expo-router";
import { useAuth } from "../context/auth";

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  // If authenticated, redirect to tabs
  if (!isLoading && isAuthenticated) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <Stack initialRouteName="login">
      <Stack.Screen
        name="login"
        options={{
          title: "Login",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: "Sign Up",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
