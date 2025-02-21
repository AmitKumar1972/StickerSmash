import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemedText } from "../components/ThemedText";

interface SearchResult {
  id: string;
  name: string;
  relationship?: string;
  phone: string;
  isRegistered: boolean;
}

export default function SearchRelativeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      phone: "+1 234-567-8903",
      isRegistered: true,
    },
    {
      id: "2",
      name: "Michael Brown",
      phone: "+1 234-567-8904",
      isRegistered: true,
    },
    {
      id: "3",
      name: "Emily Davis",
      phone: "+1 234-567-8905",
      isRegistered: false,
    },
  ]);

  const handleSearch = () => {
    // TODO: Implement actual search functionality
    console.log("Searching for:", searchQuery);
  };

  const handleInvite = (result: SearchResult) => {
    Alert.alert("Invite Relative", `Send invitation to ${result.name}?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Send Invite",
        onPress: () => {
          // TODO: Implement invite functionality
          console.log("Inviting:", result.name);
        },
      },
    ]);
  };

  const handleAdd = (result: SearchResult) => {
    Alert.alert("Add Relative", `Add ${result.name} as a relative?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Add",
        onPress: () => {
          // TODO: Implement add functionality
          console.log("Adding:", result.name);
        },
      },
    ]);
  };

  const SearchResultCard = ({ result }: { result: SearchResult }) => (
    <View style={styles.resultCard}>
      <View style={styles.resultInfo}>
        <FontAwesome5
          name={result.isRegistered ? "user-check" : "user"}
          size={20}
          color="#6c5ce7"
          solid
        />
        <View style={styles.textContainer}>
          <ThemedText style={styles.resultName}>{result.name}</ThemedText>
          <ThemedText style={styles.resultPhone}>{result.phone}</ThemedText>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.actionButton,
          {
            backgroundColor: result.isRegistered
              ? "#6c5ce7"
              : "rgba(108, 92, 231, 0.1)",
          },
        ]}
        onPress={() =>
          result.isRegistered ? handleAdd(result) : handleInvite(result)
        }
      >
        <FontAwesome5
          name={result.isRegistered ? "plus" : "envelope"}
          size={16}
          color={result.isRegistered ? "#ffffff" : "#6c5ce7"}
        />
        <ThemedText
          style={[
            styles.actionButtonText,
            { color: result.isRegistered ? "#ffffff" : "#6c5ce7" },
          ]}
        >
          {result.isRegistered ? "Add" : "Invite"}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Search Relative</ThemedText>
      </View>

      <View style={styles.content}>
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <FontAwesome5 name="search" size={16} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name or phone number..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#666"
              returnKeyType="search"
              onSubmitEditing={handleSearch}
            />
          </View>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <ThemedText style={styles.searchButtonText}>Search</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.resultsContainer}>
          <ThemedText style={styles.resultsTitle}>Search Results</ThemedText>
          {searchResults.map((result) => (
            <SearchResultCard key={result.id} result={result} />
          ))}
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <FontAwesome5 name="info-circle" size={20} color="#6c5ce7" />
            <View style={styles.infoContent}>
              <ThemedText style={styles.infoTitle}>How it works</ThemedText>
              <ThemedText style={styles.infoText}>
                Search for relatives by name or phone number. If they're
                registered, you can add them directly. If not, send them an
                invitation to join.
              </ThemedText>
            </View>
          </View>
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
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    marginRight: 10,
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
  searchButton: {
    backgroundColor: "#6c5ce7",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#6c5ce7",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  searchButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  resultsContainer: {
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 15,
  },
  resultCard: {
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
  resultInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  textContainer: {
    marginLeft: 15,
  },
  resultName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  resultPhone: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginLeft: 10,
  },
  actionButtonText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "500",
  },
  infoSection: {
    marginTop: 20,
  },
  infoCard: {
    backgroundColor: "rgba(108, 92, 231, 0.1)",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  infoContent: {
    marginLeft: 15,
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
