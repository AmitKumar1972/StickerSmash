import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemedText } from "../components/ThemedText";

const DeviceStatus = () => (
  <View style={styles.statusCard}>
    <View style={styles.statusHeader}>
      <FontAwesome5 name="bluetooth-b" size={24} color="#6c5ce7" />
      <ThemedText style={styles.statusTitle}>Device Status</ThemedText>
    </View>
    <View style={styles.statusInfo}>
      <View style={styles.statusItem}>
        <ThemedText style={styles.statusLabel}>Connection:</ThemedText>
        <View style={styles.statusValue}>
          <View style={[styles.indicator, { backgroundColor: "#4CAF50" }]} />
          <ThemedText style={styles.statusText}>Connected</ThemedText>
        </View>
      </View>
      <View style={styles.statusItem}>
        <ThemedText style={styles.statusLabel}>Battery:</ThemedText>
        <View style={styles.statusValue}>
          <FontAwesome5
            name="battery-three-quarters"
            size={16}
            color="#4CAF50"
          />
          <ThemedText style={styles.statusText}>85%</ThemedText>
        </View>
      </View>
      <View style={styles.statusItem}>
        <ThemedText style={styles.statusLabel}>Signal Strength:</ThemedText>
        <View style={styles.statusValue}>
          <FontAwesome5 name="signal" size={16} color="#4CAF50" />
          <ThemedText style={styles.statusText}>Excellent</ThemedText>
        </View>
      </View>
    </View>
  </View>
);

const AvailableDevices = () => {
  const [devices] = useState([
    { id: 1, name: "EMG-Sensor-001", strength: "Strong" },
    { id: 2, name: "EMG-Sensor-002", strength: "Medium" },
    { id: 3, name: "EMG-Sensor-003", strength: "Weak" },
  ]);

  return (
    <View style={styles.devicesContainer}>
      <View style={styles.sectionHeader}>
        <ThemedText style={styles.sectionTitle}>Available Devices</ThemedText>
        <TouchableOpacity style={styles.refreshButton}>
          <FontAwesome5 name="sync" size={16} color="#6c5ce7" />
          <ThemedText style={styles.refreshText}>Refresh</ThemedText>
        </TouchableOpacity>
      </View>

      {devices.map((device) => (
        <TouchableOpacity key={device.id} style={styles.deviceItem}>
          <View style={styles.deviceInfo}>
            <FontAwesome5 name="microchip" size={20} color="#6c5ce7" />
            <View style={styles.deviceDetails}>
              <ThemedText style={styles.deviceName}>{device.name}</ThemedText>
              <ThemedText style={styles.deviceStrength}>
                Signal: {device.strength}
              </ThemedText>
            </View>
          </View>
          <TouchableOpacity style={styles.connectButton}>
            <ThemedText style={styles.connectButtonText}>Connect</ThemedText>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Instructions = () => (
  <View style={styles.instructionsContainer}>
    <ThemedText style={styles.sectionTitle}>How to Connect</ThemedText>
    <View style={styles.instructionStep}>
      <View style={styles.stepNumber}>
        <ThemedText style={styles.stepNumberText}>1</ThemedText>
      </View>
      <ThemedText style={styles.stepText}>
        Turn on your EMG sensor by pressing and holding the power button
      </ThemedText>
    </View>
    <View style={styles.instructionStep}>
      <View style={styles.stepNumber}>
        <ThemedText style={styles.stepNumberText}>2</ThemedText>
      </View>
      <ThemedText style={styles.stepText}>
        Make sure Bluetooth is enabled on your phone
      </ThemedText>
    </View>
    <View style={styles.instructionStep}>
      <View style={styles.stepNumber}>
        <ThemedText style={styles.stepNumberText}>3</ThemedText>
      </View>
      <ThemedText style={styles.stepText}>
        Select your device from the list and tap "Connect"
      </ThemedText>
    </View>
  </View>
);

export default function ConnectDeviceScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Connect Device</ThemedText>
      </View>
      <DeviceStatus />
      <AvailableDevices />
      <Instructions />
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  statusCard: {
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
  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  statusInfo: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
  },
  statusItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  statusLabel: {
    fontSize: 14,
    color: "#666",
  },
  statusValue: {
    flexDirection: "row",
    alignItems: "center",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    marginLeft: 6,
    color: "#4CAF50",
  },
  devicesContainer: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "rgba(108, 92, 231, 0.1)",
    borderRadius: 20,
  },
  refreshText: {
    marginLeft: 5,
    color: "#6c5ce7",
    fontSize: 14,
  },
  deviceItem: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deviceInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  deviceDetails: {
    marginLeft: 15,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  deviceStrength: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  connectButton: {
    backgroundColor: "rgba(108, 92, 231, 0.1)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  connectButtonText: {
    color: "#6c5ce7",
    fontSize: 14,
    fontWeight: "500",
  },
  instructionsContainer: {
    padding: 20,
  },
  instructionStep: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#6c5ce7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  stepNumberText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
