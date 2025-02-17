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
  navigation: any;
  onStart: (email: string, password: string) => void;
  onRegister: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onStart, onRegister }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const onToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
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
        <Text style={styles.subtitle}>Bem vindo! Faça login para começar</Text>
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
          onPress={() => onStart(email, password)}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-8" onPress={onRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
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

export default memo(WelcomePage);
