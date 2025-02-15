// components/NoteFormPage.tsx (updated)
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";

interface NoteFormPageProps {
  isEditing: boolean;
  noteTitle: string;
  setNoteTitle: (value: string) => void;
  noteContent: string;
  setNoteContent: (value: string) => void;
  onEditSettings: () => void; // New prop to trigger navigation to note settings
  onSave: () => void;
  onCancel: () => void;
}

const NoteFormPage: React.FC<NoteFormPageProps> = ({
  isEditing,
  noteTitle,
  setNoteTitle,
  noteContent,
  setNoteContent,
  onEditSettings,
  onSave,
  onCancel,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>AbacoPad</Text>
        <View style={{ width: 24 }} />
      </View>
      <Text style={styles.pageTitle}>
        {isEditing ? "Edit Note" : "Create New Note"}
      </Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={noteTitle}
          onChangeText={setNoteTitle}
          placeholder="Enter note title"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.textArea}
          value={noteContent}
          onChangeText={setNoteContent}
          placeholder="Enter note content"
          placeholderTextColor="#888"
          multiline
        />
        <TouchableOpacity
          style={styles.editSettingsButton}
          onPress={onEditSettings}
        >
          <Text style={styles.editSettingsText}>Edit Note Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSave}>
          <Text style={styles.buttonText}>
            {isEditing ? "Save Changes" : "Create Note"}
          </Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 16,
  },
  title: { color: "#00FFD4", fontSize: 36, fontWeight: "400" },
  pageTitle: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  form: { width: "100%", gap: 16 },
  input: {
    width: "100%",
    height: 42,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 18,
    color: "#000",
  },
  textArea: {
    width: "100%",
    height: 180,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    textAlignVertical: "top",
  },
  editSettingsButton: {
    backgroundColor: "#767676",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  editSettingsText: { color: "#fff", fontSize: 16 },
  button: {
    backgroundColor: "#008A73",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 16,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default NoteFormPage;
