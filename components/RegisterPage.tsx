import React, { memo, useState } from "react";
import {
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import PasswordInput from "./PasswordInput";

export interface WelcomePageProps {
  navigation: any;
  onCreate: (email: string, password: string) => void;
}

const RegisterPage: React.FC<WelcomePageProps> = ({ navigation, onCreate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  const onToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (value: string) => {
    onChangePassword(value);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>AbacoPad</Text>
        <Text style={styles.subtitle}>Estamos muito felizes em ter você!</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={handleEmailChange}
          placeholder="email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
        />
        <PasswordInput
          password={password}
          onChangePassword={handlePasswordChange}
          showPassword={showPassword}
          onToggleShowPassword={onToggleShowPassword}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onCreate(email, password)}
        >
          <Text style={styles.buttonText}>Criar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    color: "#00FFD4",
    fontSize: 40,
    fontWeight: "400",
    marginBottom: 16,
  },
  subtitle: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 24,
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
    marginTop: 24,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default memo(RegisterPage);
