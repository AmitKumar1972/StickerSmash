import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Alert,
  Linking,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemedText } from "../components/ThemedText";
import { router } from "expo-router";

// Dummy hospital data
const initialHospitalData = {
  name: "City General Hospital",
  address: "123 Medical Center Blvd, City, State 12345",
  phone: "+918529481972",
  email: "info@citygeneralhospital.com",
  website: "https://www.citygeneralhospital.com",
  department: "Neurology Department",
  position: "Head of Department",
  officeHours: [
    { day: "Monday", hours: "9:00 AM - 5:00 PM" },
    { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 12:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
    { day: "Friday", hours: "9:00 AM - 3:00 PM" },
  ],
  staff: [
    {
      id: "1",
      name: "Dr. James Wilson",
      position: "Neurologist",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
    },
    {
      id: "2",
      name: "Dr. Lisa Chen",
      position: "Neurologist",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
    },
    {
      id: "3",
      name: "Nurse Michael Brown",
      position: "Head Nurse",
      image: "https://randomuser.me/api/portraits/men/55.jpg",
    },
    {
      id: "4",
      name: "Nurse Emily Taylor",
      position: "Registered Nurse",
      image: "https://randomuser.me/api/portraits/women/22.jpg",
    },
  ],
};

export default function HospitalInfoScreen() {
  const [hospitalData, setHospitalData] = useState(initialHospitalData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(initialHospitalData);

  const handleSave = () => {
    setHospitalData(editedData);
    setIsEditing(false);
    Alert.alert("Success", "Hospital information updated successfully");
  };

  const handleCancel = () => {
    setEditedData(hospitalData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedData({
      ...editedData,
      [field]: value,
    });
  };

  const handleCall = () => {
    Linking.canOpenURL(`tel:${hospitalData.phone}`)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(`tel:${hospitalData.phone}`);
        } else {
          Alert.alert(
            "Phone call not supported",
            "Your device does not support making phone calls"
          );
        }
      })
      .catch((err) =>
        Alert.alert("Error", "An error occurred while trying to make the call")
      );
  };

  const handleEmail = () => {
    Linking.canOpenURL(`mailto:${hospitalData.email}`)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(`mailto:${hospitalData.email}`);
        } else {
          Alert.alert(
            "Email not supported",
            "Your device does not support sending emails"
          );
        }
      })
      .catch((err) =>
        Alert.alert("Error", "An error occurred while trying to send an email")
      );
  };

  const handleWebsite = () => {
    Linking.canOpenURL(hospitalData.website)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(hospitalData.website);
        } else {
          Alert.alert(
            "Browser not supported",
            "Your device does not support opening this website"
          );
        }
      })
      .catch((err) =>
        Alert.alert(
          "Error",
          "An error occurred while trying to open the website"
        )
      );
  };

  const renderField = (label: string, value: string, field: string) => {
    return (
      <View style={styles.fieldContainer}>
        <ThemedText style={styles.fieldLabel}>{label}</ThemedText>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editedData[field as keyof typeof editedData] as string}
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
        <ThemedText style={styles.headerTitle}>Hospital Info</ThemedText>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          <FontAwesome5
            name={isEditing ? "check" : "edit"}
            size={20}
            color="#ffffff"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.hospitalCard}>
          <Image
            source={{ uri: "https://via.placeholder.com/400x200" }}
            style={styles.hospitalImage}
          />
          <View style={styles.hospitalInfo}>
            <ThemedText style={styles.hospitalName}>
              {hospitalData.name}
            </ThemedText>
            <ThemedText style={styles.hospitalDepartment}>
              {hospitalData.department}
            </ThemedText>
          </View>
        </View>

        <View style={styles.contactButtons}>
          <TouchableOpacity style={styles.contactButton} onPress={handleCall}>
            <FontAwesome5 name="phone" size={20} color="#ffffff" />
            <ThemedText style={styles.contactButtonText}>Call</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton} onPress={handleEmail}>
            <FontAwesome5 name="envelope" size={20} color="#ffffff" />
            <ThemedText style={styles.contactButtonText}>Email</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={handleWebsite}
          >
            <FontAwesome5 name="globe" size={20} color="#ffffff" />
            <ThemedText style={styles.contactButtonText}>Website</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <ThemedText style={styles.sectionTitle}>Hospital Details</ThemedText>
          {renderField("Hospital Name", hospitalData.name, "name")}
          {renderField("Address", hospitalData.address, "address")}
          {renderField("Phone", hospitalData.phone, "phone")}
          {renderField("Email", hospitalData.email, "email")}
          {renderField("Website", hospitalData.website, "website")}
        </View>

        <View style={styles.infoCard}>
          <ThemedText style={styles.sectionTitle}>Your Position</ThemedText>
          {renderField("Department", hospitalData.department, "department")}
          {renderField("Position", hospitalData.position, "position")}
        </View>

        <View style={styles.infoCard}>
          <ThemedText style={styles.sectionTitle}>Office Hours</ThemedText>
          {hospitalData.officeHours.map((schedule, index) => (
            <View key={index} style={styles.scheduleItem}>
              <ThemedText style={styles.scheduleDay}>{schedule.day}</ThemedText>
              <ThemedText style={styles.scheduleHours}>
                {schedule.hours}
              </ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.infoCard}>
          <ThemedText style={styles.sectionTitle}>Department Staff</ThemedText>
          {hospitalData.staff.map((staff) => (
            <View key={staff.id} style={styles.staffItem}>
              <Image source={{ uri: staff.image }} style={styles.staffImage} />
              <View style={styles.staffInfo}>
                <ThemedText style={styles.staffName}>{staff.name}</ThemedText>
                <ThemedText style={styles.staffPosition}>
                  {staff.position}
                </ThemedText>
              </View>
              <TouchableOpacity style={styles.staffContactButton}>
                <FontAwesome5 name="envelope" size={16} color="#6c5ce7" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {isEditing && (
          <View style={styles.editButtons}>
            <TouchableOpacity
              style={[styles.editActionButton, styles.cancelButton]}
              onPress={handleCancel}
            >
              <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.editActionButton, styles.saveButton]}
              onPress={handleSave}
            >
              <ThemedText style={styles.saveButtonText}>Save</ThemedText>
            </TouchableOpacity>
          </View>
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
  hospitalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hospitalImage: {
    width: "100%",
    height: 150,
  },
  hospitalInfo: {
    padding: 15,
  },
  hospitalName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  hospitalDepartment: {
    fontSize: 16,
    color: "#6c5ce7",
  },
  contactButtons: {
    flexDirection: "row",
    marginBottom: 20,
  },
  contactButton: {
    backgroundColor: "#6c5ce7",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginRight: 10,
  },
  contactButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    marginLeft: 8,
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
  scheduleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  scheduleDay: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  scheduleHours: {
    fontSize: 14,
    color: "#666",
  },
  staffItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  staffImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  staffInfo: {
    flex: 1,
  },
  staffName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 3,
  },
  staffPosition: {
    fontSize: 14,
    color: "#666",
  },
  staffContactButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
  },
  editButtons: {
    flexDirection: "row",
    marginBottom: 20,
  },
  editActionButton: {
    borderRadius: 8,
    padding: 15,
    flex: 1,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f8f9fa",
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: "#6c5ce7",
    marginLeft: 10,
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "600",
  },
  saveButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
});
