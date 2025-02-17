// components/EditBookPage.tsx
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { Book } from "@/App";
import { Database } from "firebase/database";

interface NewBookPageProps {
  database: Database;
  path: string;
  navigation: any;
  onLogout: () => void;
}

const NewBookPage: React.FC<NewBookPageProps> = ({
  database,
  path,
  navigation,
  onLogout,
}) => {
  const [title, setTitle] = React.useState("");

  function onSelectBook() {
    console.log(title);
    navigation.navigate("Bookshelf", {
      title,
      database,
      path,
      navigation,
      onLogout,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {}}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>New Book</Text>
        <View style={{ width: 24 }} />
      </View>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter new book title"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={onSelectBook}>
        <Text style={styles.buttonText}>Save</Text>
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

export default NewBookPage;
