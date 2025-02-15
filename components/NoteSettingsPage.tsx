// components/NoteSettingsPage.tsx
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";

interface NoteSettingsPageProps {
  fontSize: number;
  setFontSize: (value: number) => void;
  fontFamily: string;
  setFontFamily: (value: string) => void;
  color: string;
  setColor: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

const NoteSettingsPage: React.FC<NoteSettingsPageProps> = ({
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
  color,
  setColor,
  onSave,
  onCancel,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Note Settings</Text>
        <View style={{ width: 24 }} />
      </View>
      <Text style={styles.label}>Font Size</Text>
      <TextInput
        style={styles.input}
        value={fontSize.toString()}
        onChangeText={(value) => setFontSize(Number(value))}
        placeholder="Font Size"
        keyboardType="numeric"
        placeholderTextColor="#888"
      />
      <Text style={styles.label}>Font Family</Text>
      <TextInput
        style={styles.input}
        value={fontFamily}
        onChangeText={setFontFamily}
        placeholder="Font Family"
        placeholderTextColor="#888"
      />
      <Text style={styles.label}>Text Color</Text>
      <TextInput
        style={styles.input}
        value={color}
        onChangeText={setColor}
        placeholder="Color (hex)"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={onSave}>
        <Text style={styles.buttonText}>Save Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%", alignItems: "center", padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  title: { color: "#00FFD4", fontSize: 36, fontWeight: "400" },
  label: {
    color: "#fff",
    fontSize: 18,
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  input: {
    width: "100%",
    height: 42,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 18,
    color: "#000",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#008A73",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18 },
});

export default NoteSettingsPage;
