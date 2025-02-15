import React, { memo, useCallback } from "react";
import {
  View,
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
  email: string;
  onChangeEmail: (value: string) => void;
  password: string;
  onChangePassword: (value: string) => void;
  showPassword: boolean;
  onToggleShowPassword: () => void;
  onCreate: () => void;
}

const RegisterPage: React.FC<WelcomePageProps> = ({
  email,
  onChangeEmail,
  password,
  onChangePassword,
  showPassword,
  onToggleShowPassword,
  onCreate,
}) => {
  const handleEmailChange = useCallback(
    (value: string) => {
      onChangeEmail(value);
    },
    [onChangeEmail]
  );

  const handlePasswordChange = useCallback(
    (value: string) => {
      onChangePassword(value);
    },
    [onChangePassword]
  );

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
        <TouchableOpacity style={styles.button} onPress={onCreate}>
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
