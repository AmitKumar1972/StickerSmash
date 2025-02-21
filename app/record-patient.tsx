import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { ThemedText } from "../components/ThemedText";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => (
  <View style={styles.formSection}>
    <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
    {children}
  </View>
);

export default function RecordPatientScreen() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    bloodType: "",
    emergencyContact: "",
    contactRelation: "",
    contactPhone: "",
    diagnosisDate: "",
    medications: "",
    allergies: "",
    previousSeizures: "",
    additionalNotes: "",
  });

  const [selectedGender, setSelectedGender] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const GenderSelector = () => (
    <View style={styles.genderContainer}>
      {["Male", "Female", "Other"].map((gender) => (
        <TouchableOpacity
          key={gender}
          style={[
            styles.genderOption,
            selectedGender === gender && styles.genderOptionSelected,
          ]}
          onPress={() => {
            setSelectedGender(gender);
            handleInputChange("gender", gender);
          }}
        >
          <ThemedText
            style={[
              styles.genderText,
              selectedGender === gender && styles.genderTextSelected,
            ]}
          >
            {gender}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );

  const handleSubmit = () => {
    // TODO: Implement form submission
    console.log("Form Data:", formData);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>Record Patient</ThemedText>
      </View>

      <View style={styles.formContainer}>
        <FormSection title="Personal Information">
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={formData.fullName}
            onChangeText={(text) => handleInputChange("fullName", text)}
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={formData.age}
            onChangeText={(text) => handleInputChange("age", text)}
            keyboardType="numeric"
            placeholderTextColor="#666"
          />
          <ThemedText style={styles.inputLabel}>Gender</ThemedText>
          <GenderSelector />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Weight (kg)"
              value={formData.weight}
              onChangeText={(text) => handleInputChange("weight", text)}
              keyboardType="numeric"
              placeholderTextColor="#666"
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Height (cm)"
              value={formData.height}
              onChangeText={(text) => handleInputChange("height", text)}
              keyboardType="numeric"
              placeholderTextColor="#666"
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Blood Type"
            value={formData.bloodType}
            onChangeText={(text) => handleInputChange("bloodType", text)}
            placeholderTextColor="#666"
          />
        </FormSection>

        <FormSection title="Emergency Contact">
          <TextInput
            style={styles.input}
            placeholder="Emergency Contact Name"
            value={formData.emergencyContact}
            onChangeText={(text) => handleInputChange("emergencyContact", text)}
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            placeholder="Relationship"
            value={formData.contactRelation}
            onChangeText={(text) => handleInputChange("contactRelation", text)}
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            placeholder="Contact Phone Number"
            value={formData.contactPhone}
            onChangeText={(text) => handleInputChange("contactPhone", text)}
            keyboardType="phone-pad"
            placeholderTextColor="#666"
          />
        </FormSection>

        <FormSection title="Medical History">
          <TextInput
            style={styles.input}
            placeholder="Date of First Diagnosis"
            value={formData.diagnosisDate}
            onChangeText={(text) => handleInputChange("diagnosisDate", text)}
            placeholderTextColor="#666"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Current Medications"
            value={formData.medications}
            onChangeText={(text) => handleInputChange("medications", text)}
            multiline
            numberOfLines={4}
            placeholderTextColor="#666"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Allergies"
            value={formData.allergies}
            onChangeText={(text) => handleInputChange("allergies", text)}
            multiline
            numberOfLines={4}
            placeholderTextColor="#666"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Previous Seizure History"
            value={formData.previousSeizures}
            onChangeText={(text) => handleInputChange("previousSeizures", text)}
            multiline
            numberOfLines={4}
            placeholderTextColor="#666"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Additional Notes"
            value={formData.additionalNotes}
            onChangeText={(text) => handleInputChange("additionalNotes", text)}
            multiline
            numberOfLines={4}
            placeholderTextColor="#666"
          />
        </FormSection>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <FontAwesome5 name="save" size={20} color="#ffffff" />
          <ThemedText style={styles.submitButtonText}>Save Record</ThemedText>
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
  formContainer: {
    padding: 20,
  },
  formSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    width: "48%",
  },
  inputLabel: {
    fontSize: 16,
    color: "#1a1a1a",
    marginBottom: 10,
  },
  genderContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  genderOption: {
    flex: 1,
    padding: 12,
    backgroundColor: "#ffffff",
    marginRight: 10,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  genderOptionSelected: {
    backgroundColor: "#6c5ce7",
  },
  genderText: {
    fontSize: 16,
    color: "#666",
  },
  genderTextSelected: {
    color: "#ffffff",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#6c5ce7",
    padding: 18,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#6c5ce7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
});
