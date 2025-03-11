import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Linking,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemedText } from "../../components/ThemedText";
import { useAuth } from "../context/auth";

export default function HomeScreen() {
  const { userType, user } = useAuth();

  const PatientDashboard = () => (
    <View>
      <View style={styles.statusCard}>
        <FontAwesome5 name="check-circle" size={24} color="#4CAF50" />
        <ThemedText style={styles.statusText}>Device Connected</ThemedText>
        <ThemedText style={styles.deviceBattery}>Battery: 85%</ThemedText>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            const phoneNumber = "+918529481972";
            Linking.canOpenURL(`tel:${phoneNumber}`)
              .then((supported) => {
                if (supported) {
                  return Linking.openURL(`tel:${phoneNumber}`);
                } else {
                  Alert.alert(
                    "Phone call not supported",
                    "Your device does not support making phone calls"
                  );
                }
              })
              .catch((err) =>
                Alert.alert(
                  "Error",
                  "An error occurred while trying to make the call"
                )
              );
          }}
        >
          <FontAwesome5 name="phone" size={24} color="#6c5ce7" />
          <ThemedText style={styles.actionText}>Emergency Call</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            const phoneNumber = "+918529481972";
            Linking.canOpenURL(`tel:${phoneNumber}`)
              .then((supported) => {
                if (supported) {
                  return Linking.openURL(`tel:${phoneNumber}`);
                } else {
                  Alert.alert(
                    "Phone call not supported",
                    "Your device does not support making phone calls"
                  );
                }
              })
              .catch((err) =>
                Alert.alert(
                  "Error",
                  "An error occurred while trying to make the call"
                )
              );
          }}
        >
          <FontAwesome5 name="user-md" size={24} color="#6c5ce7" />
          <ThemedText style={styles.actionText}>Contact Doctor</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <ThemedText style={styles.statNumber}>3</ThemedText>
          <ThemedText style={styles.statLabel}>Events Today</ThemedText>
        </View>
        <View style={styles.statCard}>
          <ThemedText style={styles.statNumber}>12</ThemedText>
          <ThemedText style={styles.statLabel}>Events This Week</ThemedText>
        </View>
      </View>

      <View style={styles.recentActivity}>
        <ThemedText style={styles.sectionTitle}>Recent Activity</ThemedText>
        <View style={styles.activityItem}>
          <FontAwesome5 name="exclamation-circle" size={20} color="#FF5252" />
          <View style={styles.activityContent}>
            <ThemedText style={styles.activityTitle}>
              Seizure Detected
            </ThemedText>
            <ThemedText style={styles.activityTime}>Today, 2:30 PM</ThemedText>
          </View>
        </View>
        <View style={styles.activityItem}>
          <FontAwesome5 name="pills" size={20} color="#6c5ce7" />
          <View style={styles.activityContent}>
            <ThemedText style={styles.activityTitle}>
              Medication Reminder
            </ThemedText>
            <ThemedText style={styles.activityTime}>Today, 9:00 AM</ThemedText>
          </View>
        </View>
      </View>
    </View>
  );

  const DoctorDashboard = () => (
    <View>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <ThemedText style={styles.statNumber}>12</ThemedText>
          <ThemedText style={styles.statLabel}>Active Patients</ThemedText>
        </View>
        <View style={styles.statCard}>
          <ThemedText style={styles.statNumber}>5</ThemedText>
          <ThemedText style={styles.statLabel}>Critical Cases</ThemedText>
        </View>
      </View>

      <View style={styles.recentActivity}>
        <ThemedText style={styles.sectionTitle}>Patient Alerts</ThemedText>
        <TouchableOpacity style={styles.patientAlert}>
          <View style={styles.alertHeader}>
            <ThemedText style={styles.patientName}>John Doe</ThemedText>
            <ThemedText style={styles.alertTime}>2:30 PM</ThemedText>
          </View>
          <ThemedText style={styles.alertDescription}>
            Multiple seizures detected in the last 24 hours
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.patientAlert}>
          <View style={styles.alertHeader}>
            <ThemedText style={styles.patientName}>Jane Smith</ThemedText>
            <ThemedText style={styles.alertTime}>11:45 AM</ThemedText>
          </View>
          <ThemedText style={styles.alertDescription}>
            Unusual pattern detected in EMG readings
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.greeting}>Good Morning,</ThemedText>
        <ThemedText style={styles.name}>
          {user?.fullName || (userType === "patient" ? "Alex" : "Dr. Smith")}
        </ThemedText>
      </View>
      {userType === "patient" ? <PatientDashboard /> : <DoctorDashboard />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#6c5ce7",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  greeting: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 5,
  },
  statusCard: {
    backgroundColor: "#ffffff",
    margin: 20,
    padding: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  deviceBattery: {
    marginLeft: "auto",
    color: "#666",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  actionButton: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    width: Dimensions.get("window").width * 0.4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  statCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    width: Dimensions.get("window").width * 0.4,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6c5ce7",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    textAlign: "center",
  },
  recentActivity: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  activityItem: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityContent: {
    marginLeft: 15,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  activityTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  patientAlert: {
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
  alertHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  patientName: {
    fontSize: 16,
    fontWeight: "600",
  },
  alertTime: {
    fontSize: 14,
    color: "#666",
  },
  alertDescription: {
    fontSize: 14,
    color: "#666",
  },
});
