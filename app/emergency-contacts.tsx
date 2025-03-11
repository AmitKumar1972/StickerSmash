import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Linking,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemedText } from "../components/ThemedText";
import { router } from "expo-router";

// Dummy data for emergency contacts
const initialContacts = [
  {
    id: "1",
    name: "John Smith",
    relationship: "Father",
    phone: "+918529481972",
  },
  {
    id: "2",
    name: "Mary Johnson",
    relationship: "Mother",
    phone: "+918529481972",
  },
  {
    id: "3",
    name: "Dr. Robert Williams",
    relationship: "Primary Doctor",
    phone: "+918529481972",
  },
];

export default function EmergencyContactsScreen() {
  const [contacts, setContacts] = useState(initialContacts);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    relationship: "",
    phone: "",
  });

  const handleAddContact = () => {
    if (!newContact.name || !newContact.relationship || !newContact.phone) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const contact = {
      id: Date.now().toString(),
      name: newContact.name,
      relationship: newContact.relationship,
      phone: newContact.phone,
    };

    setContacts([...contacts, contact]);
    setNewContact({ name: "", relationship: "", phone: "" });
    setIsAddingContact(false);
  };

  const handleDeleteContact = (id: string) => {
    Alert.alert(
      "Delete Contact",
      "Are you sure you want to delete this contact?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setContacts(contacts.filter((contact) => contact.id !== id));
          },
          style: "destructive",
        },
      ]
    );
  };

  const handleCallContact = (phone: string) => {
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#ffffff" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Emergency Contacts</ThemedText>
      </View>

      <View style={styles.content}>
        {contacts.map((contact) => (
          <View key={contact.id} style={styles.contactCard}>
            <View style={styles.contactInfo}>
              <ThemedText style={styles.contactName}>{contact.name}</ThemedText>
              <ThemedText style={styles.contactRelationship}>
                {contact.relationship}
              </ThemedText>
              <ThemedText style={styles.contactPhone}>
                {contact.phone}
              </ThemedText>
            </View>
            <View style={styles.contactActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleCallContact(contact.phone)}
              >
                <FontAwesome5 name="phone" size={20} color="#6c5ce7" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDeleteContact(contact.id)}
              >
                <FontAwesome5 name="trash" size={20} color="#ff4444" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {isAddingContact ? (
          <View style={styles.addContactForm}>
            <ThemedText style={styles.formTitle}>Add New Contact</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newContact.name}
              onChangeText={(text) =>
                setNewContact({ ...newContact, name: text })
              }
              placeholderTextColor="#666"
            />
            <TextInput
              style={styles.input}
              placeholder="Relationship"
              value={newContact.relationship}
              onChangeText={(text) =>
                setNewContact({ ...newContact, relationship: text })
              }
              placeholderTextColor="#666"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={newContact.phone}
              onChangeText={(text) =>
                setNewContact({ ...newContact, phone: text })
              }
              keyboardType="phone-pad"
              placeholderTextColor="#666"
            />
            <View style={styles.formButtons}>
              <TouchableOpacity
                style={[styles.formButton, styles.cancelButton]}
                onPress={() => setIsAddingContact(false)}
              >
                <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.formButton, styles.saveButton]}
                onPress={handleAddContact}
              >
                <ThemedText style={styles.saveButtonText}>Save</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsAddingContact(true)}
          >
            <FontAwesome5 name="plus" size={16} color="#ffffff" />
            <ThemedText style={styles.addButtonText}>
              Add Emergency Contact
            </ThemedText>
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
  contactCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  contactRelationship: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  contactPhone: {
    fontSize: 14,
    color: "#6c5ce7",
  },
  contactActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
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
  addContactForm: {
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
  formTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  formButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formButton: {
    borderRadius: 8,
    padding: 12,
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
