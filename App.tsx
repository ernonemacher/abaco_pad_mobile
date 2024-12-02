import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

const Stack = createNativeStackNavigator();

const CustomButton = ({ label, onPress, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const TelaInicial = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Welcome to AbacoPad!</Text>
    <Text style={styles.subtitle}>
      Get started by creating or logging into your pad
    </Text>
    <TextInput
      style={styles.input}
      placeholder="abaco.vercel.app"
      placeholderTextColor="#888"
    />
    <CustomButton
      label="ABACO"
      onPress={() => navigation.navigate("Password")}
      style={styles.button}
    />
  </View>
);

const TelaLogin = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Enter the bookshelf password</Text>
    <TextInput
      style={styles.input}
      placeholder="Password"
      placeholderTextColor="#888"
      secureTextEntry
    />
    <CustomButton
      label="Enter"
      onPress={() => navigation.navigate("Bookshelf")}
      style={styles.button}
    />
  </View>
);

const TelaBiblioteca = ({ navigation }) => {
  const books = ["Book 1", "Book 2", "Book 3"];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to your bookshelf!</Text>
      <FlatList
        data={books}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookItem}
            onPress={() => navigation.navigate("BookNotes", { book: item })}
          >
            <Text style={styles.bookText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <CustomButton label="New Book" onPress={() => {}} style={styles.button} />
    </View>
  );
};

const TelaLivros = ({ navigation, route }) => {
  const { book } = route.params;
  const notes = ["Note 1", "Note 2", "Note 3"];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book}</Text>
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookItem}
            onPress={() => navigation.navigate("Note", { note: item })}
          >
            <Text style={styles.bookText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <CustomButton label="New Note" onPress={() => {}} style={styles.button} />
    </View>
  );
};

const TelaNotas = ({ navigation, route }) => {
  const { note } = route.params;
  const [text, setText] = useState(
    "Class aptent taciti sociosquad litora torquent per conubia nostra, per inceptos himenaeos."
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note}</Text>
      <TextInput
        style={[styles.input, styles.noteInput]}
        multiline
        value={text}
        onChangeText={setText}
      />
      <CustomButton
        label="Style"
        onPress={() => navigation.navigate("NoteStyle")}
        style={styles.button}
      />
    </View>
  );
};

const NoteStyleScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Note Style</Text>
    <View style={styles.option}>
      <Text style={styles.optionText}>Font</Text>
      <Text style={styles.optionValue}>Arial</Text>
    </View>
    <View style={styles.option}>
      <Text style={styles.optionText}>Font-Size</Text>
      <Text style={styles.optionValue}>14 px</Text>
    </View>
    <View style={styles.option}>
      <Text style={styles.optionText}>Special Configs</Text>
      <Text style={styles.optionValue}>...</Text>
    </View>
  </View>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={TelaInicial}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Password"
          component={TelaLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Bookshelf"
          component={TelaBiblioteca}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookNotes"
          component={TelaLivros}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Note"
          component={TelaNotas}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NoteStyle"
          component={NoteStyleScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  title: {
    color: "#00FFCC",
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#1C1C1C",
    borderRadius: 5,
    padding: 10,
    color: "#FFF",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2C2C2C",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  label: {
    color: "#00FFCC",
    fontSize: 16,
  },
  bookItem: {
    backgroundColor: "#2C2C2C",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  bookText: {
    color: "#FFF",
    fontSize: 16,
  },
  noteInput: {
    height: 200,
    textAlignVertical: "top",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },
  optionText: {
    color: "#FFF",
    fontSize: 16,
  },
  optionValue: {
    color: "#00FFCC",
    fontSize: 16,
  },
});
