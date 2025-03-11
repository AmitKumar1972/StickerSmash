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

// Dummy data for patients
const initialPatients = [
  {
    id: "1",
    name: "John Doe",
    age: 42,
    condition: "Epilepsy",
    lastVisit: "2023-10-15",
    nextVisit: "2023-11-15",
    phone: "+918529481972",
    email: "john.doe@example.com",
    status: "Stable",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "2",
    name: "Jane Smith",
    age: 35,
    condition: "Seizure Disorder",
    lastVisit: "2023-10-20",
    nextVisit: "2023-11-20",
    phone: "+918529481972",
    email: "jane.smith@example.com",
    status: "Improving",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "3",
    name: "Robert Johnson",
    age: 58,
    condition: "Temporal Lobe Epilepsy",
    lastVisit: "2023-10-05",
    nextVisit: "2023-11-05",
    phone: "+918529481972",
    email: "robert.johnson@example.com",
    status: "Critical",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    id: "4",
    name: "Emily Davis",
    age: 29,
    condition: "Absence Seizures",
    lastVisit: "2023-10-25",
    nextVisit: "2023-11-25",
    phone: "+918529481972",
    email: "emily.davis@example.com",
    status: "Stable",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
  },
];

export default function MyPatientsScreen() {
  const [patients, setPatients] = useState(initialPatients);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleCall = (phone: string) => {
    Linking.canOpenURL(`tel:${phone}`)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(`tel:${phone}`);
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

  const handleEmail = (email: string) => {
    Linking.canOpenURL(`mailto:${email}`)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(`mailto:${email}`);
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

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "All" || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Stable":
        return "#4CAF50";
      case "Improving":
        return "#2196F3";
      case "Critical":
        return "#FF5252";
      default:
        return "#666";
    }
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
        <ThemedText style={styles.headerTitle}>My Patients</ThemedText>
      </View>

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <FontAwesome5 name="search" size={16} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search patients..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#666"
            />
          </View>
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filterStatus === "All" && styles.activeFilter,
              ]}
              onPress={() => setFilterStatus("All")}
            >
              <ThemedText
                style={[
                  styles.filterText,
                  filterStatus === "All" && styles.activeFilterText,
                ]}
              >
                All
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filterStatus === "Stable" && styles.activeFilter,
              ]}
              onPress={() => setFilterStatus("Stable")}
            >
              <ThemedText
                style={[
                  styles.filterText,
                  filterStatus === "Stable" && styles.activeFilterText,
                ]}
              >
                Stable
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                filterStatus === "Critical" && styles.activeFilter,
              ]}
              onPress={() => setFilterStatus("Critical")}
            >
              <ThemedText
                style={[
                  styles.filterText,
                  filterStatus === "Critical" && styles.activeFilterText,
                ]}
              >
                Critical
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {filteredPatients.map((patient) => (
          <View key={patient.id} style={styles.patientCard}>
            <View style={styles.patientHeader}>
              <Image
                source={{ uri: patient.image }}
                style={styles.patientImage}
              />
              <View style={styles.patientInfo}>
                <ThemedText style={styles.patientName}>
                  {patient.name}
                </ThemedText>
                <View style={styles.patientDetails}>
                  <ThemedText style={styles.patientAge}>
                    {patient.age} years
                  </ThemedText>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(patient.status) },
                    ]}
                  >
                    <ThemedText style={styles.statusText}>
                      {patient.status}
                    </ThemedText>
                  </View>
                </View>
                <ThemedText style={styles.patientCondition}>
                  {patient.condition}
                </ThemedText>
              </View>
            </View>

            <View style={styles.visitInfo}>
              <View style={styles.visitItem}>
                <ThemedText style={styles.visitLabel}>Last Visit</ThemedText>
                <ThemedText style={styles.visitDate}>
                  {patient.lastVisit}
                </ThemedText>
              </View>
              <View style={styles.visitItem}>
                <ThemedText style={styles.visitLabel}>Next Visit</ThemedText>
                <ThemedText style={styles.visitDate}>
                  {patient.nextVisit}
                </ThemedText>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleCall(patient.phone)}
              >
                <FontAwesome5 name="phone" size={16} color="#ffffff" />
                <ThemedText style={styles.actionButtonText}>Call</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleEmail(patient.email)}
              >
                <FontAwesome5 name="envelope" size={16} color="#ffffff" />
                <ThemedText style={styles.actionButtonText}>Email</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <FontAwesome5 name="file-medical" size={16} color="#ffffff" />
                <ThemedText style={styles.actionButtonText}>Records</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton}>
          <FontAwesome5 name="plus" size={16} color="#ffffff" />
          <ThemedText style={styles.addButtonText}>Add New Patient</ThemedText>
        </TouchableOpacity>
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
  searchContainer: {
    marginBottom: 20,
  },
  searchInputContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterButton: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  activeFilter: {
    backgroundColor: "#6c5ce7",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  activeFilterText: {
    color: "#ffffff",
  },
  patientCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  patientHeader: {
    flexDirection: "row",
    marginBottom: 15,
  },
  patientImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  patientInfo: {
    flex: 1,
    justifyContent: "center",
  },
  patientName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  patientDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  patientAge: {
    fontSize: 14,
    color: "#666",
    marginRight: 10,
  },
  statusBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "600",
  },
  patientCondition: {
    fontSize: 14,
    color: "#666",
  },
  visitInfo: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
    paddingVertical: 10,
    marginBottom: 15,
  },
  visitItem: {
    flex: 1,
    alignItems: "center",
  },
  visitLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  visitDate: {
    fontSize: 14,
    fontWeight: "600",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    backgroundColor: "#6c5ce7",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    marginLeft: 5,
    fontSize: 12,
  },
  addButton: {
    backgroundColor: "#6c5ce7",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    marginLeft: 10,
  },
});
