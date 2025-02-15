import React, { memo } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

export interface PasswordInputProps {
  password: string;
  onChangePassword: (value: string) => void;
  showPassword: boolean;
  onToggleShowPassword: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  onChangePassword,
  showPassword,
  onToggleShowPassword,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={onChangePassword}
        placeholder="********"
        placeholderTextColor="#888"
      />
      <TouchableOpacity
        onPress={onToggleShowPassword}
        style={styles.iconButton}
        accessibilityRole="button"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    maxWidth: 500,
    marginBottom: 16,
  },
  input: {
    width: "100%",
    height: 42,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 18,
    color: "#000",
  },
  iconButton: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
});

export default memo(PasswordInput);
