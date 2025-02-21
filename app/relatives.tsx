import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemedText } from "../components/ThemedText";

interface Relative {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isEmergencyContact: boolean;
}

export default function RelativesScreen() {
  const [relatives] = useState<Relative[]>([
    {
      id: "1",
      name: "John Smith",
      relationship: "Father",
      phone: "+1 234-567-8900",
      isEmergencyContact: true,
    },
    {
      id: "2",
      name: "Mary Johnson",
      relationship: "Sister",
      phone: "+1 234-567-8901",
      isEmergencyContact: true,
    },
    {
      id: "3",
      name: "Robert Wilson",
      relationship: "Uncle",
      phone: "+1 234-567-8902",
      isEmergencyContact: false,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredRelatives = relatives.filter((relative) =>
    relative.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const RelativeCard = ({ relative }: { relative: Relative }) => (
    <View style={styles.relativeCard}>
      <View style={styles.relativeInfo}>
        <View style={styles.nameSection}>
          <FontAwesome5
            name={relative.isEmergencyContact ? "star" : "user"}
            size={20}
            color={relative.isEmergencyContact ? "#FFD700" : "#6c5ce7"}
            solid={relative.isEmergencyContact}
          />
          <View style={styles.textContainer}>
            <ThemedText style={styles.relativeName}>{relative.name}</ThemedText>
            <ThemedText style={styles.relationshipText}>
              {relative.relationship}
            </ThemedText>
          </View>
        </View>
        <View style={styles.contactSection}>
          <ThemedText style={styles.phoneText}>{relative.phone}</ThemedText>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome5 name="phone" size={16} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome5 name="message" size={16} color="#6c5ce7" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <FontAwesome5 name="edit" size={16} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Relatives</ThemedText>
      </View>

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <FontAwesome5 name="search" size={16} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search relatives..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <ThemedText style={styles.statNumber}>
              {relatives.filter((r) => r.isEmergencyContact).length}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Emergency Contacts</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statNumber}>
              {relatives.length}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Total Relatives</ThemedText>
          </View>
        </View>

        <View style={styles.relativesList}>
          {filteredRelatives.map((relative) => (
            <RelativeCard key={relative.id} relative={relative} />
          ))}
        </View>

        <TouchableOpacity style={styles.addButton}>
          <FontAwesome5 name="plus" size={20} color="#ffffff" />
          <ThemedText style={styles.addButtonText}>Add New Relative</ThemedText>
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
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#6c5ce7",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  content: {
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
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
    color: "#1a1a1a",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    width: "48%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6c5ce7",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  relativesList: {
    marginBottom: 20,
  },
  relativeCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  relativeInfo: {
    flex: 1,
  },
  nameSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  relativeName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  relationshipText: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  contactSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  phoneText: {
    fontSize: 14,
    color: "#666",
  },
  actionButtons: {
    flexDirection: "row",
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(108, 92, 231, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: "#6c5ce7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    borderRadius: 12,
    shadowColor: "#6c5ce7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
});
