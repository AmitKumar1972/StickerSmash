import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Linking,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemedText } from "../components/ThemedText";
import { router } from "expo-router";

// Dummy doctor data
const doctorData = {
  name: "Dr. Sarah Williams",
  specialty: "Neurologist",
  hospital: "City General Hospital",
  address: "123 Medical Center Blvd, City, State 12345",
  phone: "+918529481972",
  email: "dr.williams@example.com",
  bio: "Dr. Williams is a board-certified neurologist with over 15 years of experience specializing in epilepsy and seizure disorders. She completed her medical training at Johns Hopkins University and her residency at Mayo Clinic.",
  availability: [
    { day: "Monday", hours: "9:00 AM - 5:00 PM" },
    { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 12:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
    { day: "Friday", hours: "9:00 AM - 3:00 PM" },
  ],
};

export default function MyDoctorScreen() {
  const handleCall = () => {
    Linking.canOpenURL(`tel:${doctorData.phone}`)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(`tel:${doctorData.phone}`);
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
    Linking.canOpenURL(`mailto:${doctorData.email}`)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(`mailto:${doctorData.email}`);
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#ffffff" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>My Doctor</ThemedText>
      </View>

      <View style={styles.content}>
        <View style={styles.doctorCard}>
          <View style={styles.doctorHeader}>
            <Image
              source={{
                uri: "https://randomuser.me/api/portraits/women/14.jpg",
              }}
              style={styles.doctorImage}
            />
            <View style={styles.doctorInfo}>
              <ThemedText style={styles.doctorName}>
                {doctorData.name}
              </ThemedText>
              <ThemedText style={styles.doctorSpecialty}>
                {doctorData.specialty}
              </ThemedText>
              <ThemedText style={styles.doctorHospital}>
                {doctorData.hospital}
              </ThemedText>
            </View>
          </View>

          <View style={styles.contactButtons}>
            <TouchableOpacity style={styles.contactButton} onPress={handleCall}>
              <FontAwesome5 name="phone" size={20} color="#ffffff" />
              <ThemedText style={styles.contactButtonText}>Call</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={handleEmail}
            >
              <FontAwesome5 name="envelope" size={20} color="#ffffff" />
              <ThemedText style={styles.contactButtonText}>Email</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionContainer}>
            <ThemedText style={styles.sectionTitle}>About</ThemedText>
            <ThemedText style={styles.bioText}>{doctorData.bio}</ThemedText>
          </View>

          <View style={styles.sectionContainer}>
            <ThemedText style={styles.sectionTitle}>Contact</ThemedText>
            <View style={styles.contactItem}>
              <FontAwesome5 name="phone" size={16} color="#6c5ce7" />
              <ThemedText style={styles.contactText}>
                {doctorData.phone}
              </ThemedText>
            </View>
            <View style={styles.contactItem}>
              <FontAwesome5 name="envelope" size={16} color="#6c5ce7" />
              <ThemedText style={styles.contactText}>
                {doctorData.email}
              </ThemedText>
            </View>
            <View style={styles.contactItem}>
              <FontAwesome5 name="map-marker-alt" size={16} color="#6c5ce7" />
              <ThemedText style={styles.contactText}>
                {doctorData.address}
              </ThemedText>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <ThemedText style={styles.sectionTitle}>Availability</ThemedText>
            {doctorData.availability.map((schedule, index) => (
              <View key={index} style={styles.scheduleItem}>
                <ThemedText style={styles.scheduleDay}>
                  {schedule.day}
                </ThemedText>
                <ThemedText style={styles.scheduleHours}>
                  {schedule.hours}
                </ThemedText>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.appointmentButton}>
            <ThemedText style={styles.appointmentButtonText}>
              Schedule Appointment
            </ThemedText>
          </TouchableOpacity>
        </View>
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
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  content: {
    padding: 20,
  },
  doctorCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doctorHeader: {
    flexDirection: "row",
    marginBottom: 20,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
  },
  doctorInfo: {
    flex: 1,
    justifyContent: "center",
  },
  doctorName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  doctorSpecialty: {
    fontSize: 16,
    color: "#6c5ce7",
    marginBottom: 5,
  },
  doctorHospital: {
    fontSize: 14,
    color: "#666",
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
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#1a1a1a",
  },
  bioText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#444",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  contactText: {
    fontSize: 14,
    color: "#444",
    marginLeft: 10,
    flex: 1,
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
  appointmentButton: {
    backgroundColor: "#6c5ce7",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  appointmentButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
});
