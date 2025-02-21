import { Tabs } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "../context/auth";

export default function TabLayout() {
  const { userType } = useAuth();
  console.log("yeh h india");

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#6c5ce7",
        tabBarInactiveTintColor: "#666",
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#eee",
          height: 60,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesome5 name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="monitoring"
        options={{
          title: "Monitoring",
          tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesome5 name="heartbeat" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesome5 name="history" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesome5 name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
