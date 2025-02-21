import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemedText } from "../../components/ThemedText";
import { useAuth } from "../context/auth";

export default function HistoryScreen() {
  const { userType } = useAuth();

  const StatisticsSection = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <ThemedText style={styles.statNumber}>24</ThemedText>
        <ThemedText style={styles.statLabel}>Total Events</ThemedText>
        <ThemedText style={styles.statPeriod}>Last 30 Days</ThemedText>
      </View>
      <View style={styles.statCard}>
        <ThemedText style={styles.statNumber}>-15%</ThemedText>
        <ThemedText style={styles.statLabel}>Change</ThemedText>
        <ThemedText style={styles.statPeriod}>vs Last Month</ThemedText>
      </View>
    </View>
  );

  const TimelineSection = () => (
    <View style={styles.timelineContainer}>
      <View style={styles.sectionHeader}>
        <ThemedText style={styles.sectionTitle}>Event Timeline</ThemedText>
        <TouchableOpacity style={styles.filterButton}>
          <FontAwesome5 name="filter" size={16} color="#6c5ce7" />
          <ThemedText style={styles.filterText}>Filter</ThemedText>
        </TouchableOpacity>
      </View>

      <View style={styles.timelineEvent}>
        <View style={styles.timelineDate}>
          <ThemedText style={styles.timelineDay}>20</ThemedText>
          <ThemedText style={styles.timelineMonth}>FEB</ThemedText>
        </View>
        <View style={styles.timelineContent}>
          <View style={styles.timelineHeader}>
            <ThemedText style={styles.eventTitle}>Seizure Episode</ThemedText>
            <ThemedText style={styles.eventTime}>2:30 PM</ThemedText>
          </View>
          <View style={styles.eventDetails}>
            <View style={styles.eventDetail}>
              <FontAwesome5 name="clock" size={14} color="#666" />
              <ThemedText style={styles.detailText}>Duration: 45s</ThemedText>
            </View>
            <View style={styles.eventDetail}>
              <FontAwesome5 name="wave-square" size={14} color="#666" />
              <ThemedText style={styles.detailText}>Intensity: High</ThemedText>
            </View>
          </View>
          <TouchableOpacity style={styles.viewDetailsButton}>
            <ThemedText style={styles.viewDetailsText}>View Details</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.timelineEvent}>
        <View style={styles.timelineDate}>
          <ThemedText style={styles.timelineDay}>19</ThemedText>
          <ThemedText style={styles.timelineMonth}>FEB</ThemedText>
        </View>
        <View style={styles.timelineContent}>
          <View style={styles.timelineHeader}>
            <ThemedText style={styles.eventTitle}>Medication Taken</ThemedText>
            <ThemedText style={styles.eventTime}>9:00 AM</ThemedText>
          </View>
          <View style={styles.eventDetails}>
            <View style={styles.eventDetail}>
              <FontAwesome5 name="pills" size={14} color="#666" />
              <ThemedText style={styles.detailText}>Regular Dose</ThemedText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const AnalyticsSection = () => (
    <View style={styles.analyticsContainer}>
      <ThemedText style={styles.sectionTitle}>Analytics</ThemedText>

      {/* Placeholder for Analytics Graph */}
      <View style={styles.graphPlaceholder}>
        <ThemedText style={styles.graphText}>Monthly Trend Analysis</ThemedText>
      </View>

      <View style={styles.patternCard}>
        <FontAwesome5 name="chart-line" size={20} color="#6c5ce7" />
        <View style={styles.patternContent}>
          <ThemedText style={styles.patternTitle}>Pattern Detected</ThemedText>
          <ThemedText style={styles.patternDescription}>
            Higher frequency of events during evening hours (6-8 PM)
          </ThemedText>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>
          {userType === "patient" ? "My History" : "Patient History"}
        </ThemedText>
      </View>
      <StatisticsSection />
      <TimelineSection />
      <AnalyticsSection />
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
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    marginTop: -20,
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
    fontSize: 32,
    fontWeight: "bold",
    color: "#6c5ce7",
  },
  statLabel: {
    fontSize: 14,
    color: "#1a1a1a",
    marginTop: 5,
  },
  statPeriod: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  timelineContainer: {
    padding: 20,
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
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "rgba(108, 92, 231, 0.1)",
    borderRadius: 20,
  },
  filterText: {
    marginLeft: 5,
    color: "#6c5ce7",
    fontSize: 14,
  },
  timelineEvent: {
    flexDirection: "row",
    marginBottom: 20,
  },
  timelineDate: {
    width: 60,
    alignItems: "center",
    marginRight: 15,
  },
  timelineDay: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  timelineMonth: {
    fontSize: 14,
    color: "#666",
  },
  timelineContent: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timelineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  eventTime: {
    fontSize: 14,
    color: "#666",
  },
  eventDetails: {
    marginTop: 10,
  },
  eventDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
  viewDetailsButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "rgba(108, 92, 231, 0.1)",
    borderRadius: 8,
    alignItems: "center",
  },
  viewDetailsText: {
    color: "#6c5ce7",
    fontSize: 14,
    fontWeight: "500",
  },
  analyticsContainer: {
    padding: 20,
  },
  graphPlaceholder: {
    height: 200,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  graphText: {
    color: "#666",
  },
  patternCard: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  patternContent: {
    marginLeft: 15,
    flex: 1,
  },
  patternTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 5,
  },
  patternDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
