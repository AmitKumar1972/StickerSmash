import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemedText } from "../../components/ThemedText";
import { useAuth } from "../context/auth";

export default function MonitoringScreen() {
  const { userType } = useAuth();

  const MonitoringHeader = () => (
    <View style={styles.header}>
      <View style={styles.deviceStatus}>
        <FontAwesome5 name="bluetooth" size={20} color="#4CAF50" />
        <ThemedText style={styles.deviceStatusText}>Connected</ThemedText>
      </View>
      <View style={styles.batteryStatus}>
        <FontAwesome5 name="battery-three-quarters" size={20} color="#4CAF50" />
        <ThemedText style={styles.batteryText}>85%</ThemedText>
      </View>
    </View>
  );

  const VitalStats = () => (
    <View style={styles.vitalStats}>
      <View style={styles.vitalCard}>
        <FontAwesome5 name="heartbeat" size={24} color="#6c5ce7" />
        <ThemedText style={styles.vitalValue}>72</ThemedText>
        <ThemedText style={styles.vitalLabel}>Heart Rate</ThemedText>
      </View>
      <View style={styles.vitalCard}>
        <FontAwesome5 name="wave-square" size={24} color="#6c5ce7" />
        <ThemedText style={styles.vitalValue}>Normal</ThemedText>
        <ThemedText style={styles.vitalLabel}>EMG Status</ThemedText>
      </View>
    </View>
  );

  const LiveMonitoring = () => (
    <View style={styles.monitoringSection}>
      <View style={styles.sectionHeader}>
        <ThemedText style={styles.sectionTitle}>Live EMG Signal</ThemedText>
        <TouchableOpacity style={styles.refreshButton}>
          <FontAwesome5 name="sync" size={16} color="#6c5ce7" />
        </TouchableOpacity>
      </View>

      {/* Placeholder for EMG Graph */}
      <View style={styles.graphPlaceholder}>
        <ThemedText style={styles.graphText}>
          EMG Signal Visualization
        </ThemedText>
      </View>

      <View style={styles.statusIndicator}>
        <View style={[styles.indicator, { backgroundColor: "#4CAF50" }]} />
        <ThemedText style={styles.statusText}>Normal Activity</ThemedText>
      </View>
    </View>
  );

  const AlertsSection = () => (
    <View style={styles.alertsSection}>
      <ThemedText style={styles.sectionTitle}>Recent Alerts</ThemedText>
      <View style={styles.alertItem}>
        <View style={styles.alertIcon}>
          <FontAwesome5 name="exclamation-triangle" size={20} color="#FF5252" />
        </View>
        <View style={styles.alertInfo}>
          <ThemedText style={styles.alertTitle}>
            Unusual Activity Detected
          </ThemedText>
          <ThemedText style={styles.alertTime}>Today, 2:30 PM</ThemedText>
        </View>
        <TouchableOpacity style={styles.alertAction}>
          <FontAwesome5 name="chevron-right" size={16} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <MonitoringHeader />
      <VitalStats />
      <LiveMonitoring />
      <AlertsSection />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  deviceStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  deviceStatusText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "500",
  },
  batteryStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  batteryText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#4CAF50",
  },
  vitalStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  vitalCard: {
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
  vitalValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginTop: 10,
  },
  vitalLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  monitoringSection: {
    backgroundColor: "#ffffff",
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  refreshButton: {
    padding: 8,
  },
  graphPlaceholder: {
    height: 200,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  graphText: {
    color: "#666",
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "500",
  },
  alertsSection: {
    padding: 20,
  },
  alertItem: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 82, 82, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertInfo: {
    flex: 1,
    marginLeft: 15,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  alertTime: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  alertAction: {
    padding: 8,
  },
});
