import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import PasswordInput from "./PasswordInput";

interface AdminSetupPageProps {
  navigation: any;
}

const AdminSetupPage: React.FC<AdminSetupPageProps> = ({ navigation }) => {
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
    <View className="flex flex-col items-center gap-6">
      <Text className="text-[#00FFD4] text-5xl font-normal">AbacoPad</Text>
      <Text className="text-white text-xl">Create an admin password</Text>
      <PasswordInput
        password={password}
        onChangePassword={setPassword}
        showPassword={showPassword}
        onToggleShowPassword={onToggleShowPassword}
      />
      <View className="flex flex-row items-center gap-2">
        <Switch value={false} onValueChange={() => {}} className="w-4 h-4" />
        <Text className="text-white">Anyone edits</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Bookshelf")}
        className="bg-[#008A73] text-white px-6 py-2 rounded-md"
      >
        <Text className="text-white">Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminSetupPage;
