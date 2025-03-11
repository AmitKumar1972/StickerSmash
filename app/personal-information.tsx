import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemedText } from "../components/ThemedText";
import { router } from "expo-router";
import { useAuth } from "./context/auth";

// Dummy user data (will be overridden by actual user data if available)
const initialUserData = {
  fullName: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+918529481972",
  dateOfBirth: "1990-05-15",
  gender: "Male",
  bloodType: "O+",
  height: "175",
  weight: "70",
  allergies: "None",
  medications: "Levetiracetam 500mg twice daily",
  emergencyContact: "John Smith (Father) - +918529481972",
};

export default function PersonalInformationScreen() {
  const { user } = useAuth();

  // Use actual user data if available, otherwise use dummy data
  const [formData, setFormData] = useState({
    fullName: user?.fullName || initialUserData.fullName,
    email: user?.email || initialUserData.email,
    phone: initialUserData.phone,
    dateOfBirth: initialUserData.dateOfBirth,
    gender: initialUserData.gender,
    bloodType: initialUserData.bloodType,
    height: initialUserData.height,
    weight: initialUserData.weight,
    allergies: initialUserData.allergies,
    medications: initialUserData.medications,
    emergencyContact: initialUserData.emergencyContact,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSave = () => {
    // In a real app, this would save the data to the backend
    Alert.alert(
      "Success",
      "Your personal information has been updated successfully."
    );
    setIsEditing(false);
  };

  const renderField = (label: string, value: string, field: string) => {
    return (
      <View style={styles.fieldContainer}>
        <ThemedText style={styles.fieldLabel}>{label}</ThemedText>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={(text) => handleInputChange(field, text)}
            placeholderTextColor="#666"
          />
        ) : (
          <ThemedText style={styles.fieldValue}>{value}</ThemedText>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#ffffff" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Personal Information</ThemedText>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(!isEditing)}
        >
          <FontAwesome5
            name={isEditing ? "check" : "edit"}
            size={20}
            color="#ffffff"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: "https://randomuser.me/api/portraits/men/32.jpg",
            }}
            style={styles.profileImage}
          />
          {isEditing && (
            <TouchableOpacity style={styles.changePhotoButton}>
              <FontAwesome5 name="camera" size={16} color="#ffffff" />
              <ThemedText style={styles.changePhotoText}>
                Change Photo
              </ThemedText>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.infoCard}>
          <ThemedText style={styles.sectionTitle}>Basic Information</ThemedText>
          {renderField("Full Name", formData.fullName, "fullName")}
          {renderField("Email", formData.email, "email")}
          {renderField("Phone", formData.phone, "phone")}
          {renderField("Date of Birth", formData.dateOfBirth, "dateOfBirth")}
          {renderField("Gender", formData.gender, "gender")}
        </View>

        <View style={styles.infoCard}>
          <ThemedText style={styles.sectionTitle}>
            Medical Information
          </ThemedText>
          {renderField("Blood Type", formData.bloodType, "bloodType")}
          {renderField("Height (cm)", formData.height, "height")}
          {renderField("Weight (kg)", formData.weight, "weight")}
          {renderField("Allergies", formData.allergies, "allergies")}
          {renderField("Medications", formData.medications, "medications")}
        </View>

        <View style={styles.infoCard}>
          <ThemedText style={styles.sectionTitle}>Emergency Contact</ThemedText>
          {renderField(
            "Primary Contact",
            formData.emergencyContact,
            "emergencyContact"
          )}
        </View>

        {isEditing && (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <ThemedText style={styles.saveButtonText}>Save Changes</ThemedText>
          </TouchableOpacity>
        )}
      </View>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    flex: 1,
    textAlign: "center",
  },
  editButton: {
    width: 40,
    alignItems: "flex-end",
  },
  content: {
    padding: 20,
  },
  profileImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  changePhotoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6c5ce7",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  changePhotoText: {
    color: "#ffffff",
    marginLeft: 8,
    fontWeight: "500",
  },
  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#1a1a1a",
  },
  fieldContainer: {
    marginBottom: 15,
  },
  fieldLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  fieldValue: {
    fontSize: 16,
    color: "#1a1a1a",
  },
  input: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#6c5ce7",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
});
