import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemedText } from "../../components/ThemedText";
import { router } from "expo-router";
import { useAuth } from "../context/auth";

export default function ProfileScreen() {
  const { userType, logout, user } = useAuth();

  const ProfileHeader = () => (
    <View style={styles.header}>
      <View style={styles.profileImageContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editImageButton}>
          <FontAwesome5 name="camera" size={16} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <ThemedText style={styles.userName}>
        {user?.fullName ||
          (userType === "patient" ? "Alex Johnson" : "Dr. Sarah Smith")}
      </ThemedText>
      <ThemedText style={styles.userEmail}>
        {user?.email || "user@example.com"}
      </ThemedText>
    </View>
  );

  const SettingsSection = () => {
    const menuItems = [
      {
        icon: "user",
        title: "Personal Information",
        description: "Update your personal details",
      },
      {
        icon: "bell",
        title: "Notifications",
        description: "Manage your notification preferences",
      },
      ...(userType === "patient"
        ? [
            {
              icon: "phone",
              title: "Emergency Contacts",
              description: "Add or edit emergency contacts",
            },
            {
              icon: "user-md",
              title: "My Doctor",
              description: "View and contact your doctor",
            },
          ]
        : [
            {
              icon: "users",
              title: "My Patients",
              description: "Manage your patient list",
            },
            {
              icon: "hospital",
              title: "Hospital Info",
              description: "Update your hospital information",
            },
          ]),
      {
        icon: "bluetooth",
        title: "Device Settings",
        description: "Manage connected devices",
      },
      {
        icon: "shield-alt",
        title: "Privacy & Security",
        description: "Manage your privacy settings",
      },
    ];

    return (
      <View style={styles.settingsContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => {
              if (item.title === "Personal Information") {
                router.push("/personal-information");
              } else if (item.title === "Emergency Contacts") {
                router.push("/emergency-contacts");
              } else if (item.title === "My Doctor") {
                router.push("/my-doctor");
              }
            }}
          >
            <View style={styles.menuIcon}>
              <FontAwesome5 name={item.icon} size={20} color="#6c5ce7" />
            </View>
            <View style={styles.menuContent}>
              <ThemedText style={styles.menuTitle}>{item.title}</ThemedText>
              <ThemedText style={styles.menuDescription}>
                {item.description}
              </ThemedText>
            </View>
            <FontAwesome5 name="chevron-right" size={16} color="#666" />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const ActionButtons = () => (
    <View style={styles.actionButtons}>
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: "#f8f9fa" }]}
      >
        <FontAwesome5 name="question-circle" size={20} color="#666" />
        <ThemedText style={styles.actionButtonText}>Help & Support</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: "#ffe5e5" }]}
        onPress={logout}
      >
        <FontAwesome5 name="sign-out-alt" size={20} color="#ff4444" />
        <ThemedText style={[styles.actionButtonText, { color: "#ff4444" }]}>
          Sign Out
        </ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader />
      <SettingsSection />
      <ActionButtons />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#6c5ce7",
    padding: 20,
    paddingTop: 60,
    alignItems: "center",
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  editImageButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "#6c5ce7",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  settingsContainer: {
    padding: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(108, 92, 231, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContent: {
    flex: 1,
    marginLeft: 15,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  menuDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  actionButtons: {
    padding: 20,
    paddingTop: 0,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
});
