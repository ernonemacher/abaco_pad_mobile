import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
// If available, use a React Native compatible icon library
import { Eye, EyeOff } from 'lucide-react-native';

interface PasswordInputProps {
    password: string;
    setPassword: (value: string) => void;
    showPassword: boolean;
    toggleShowPassword: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
                                                         password,
                                                         setPassword,
                                                         showPassword,
                                                         toggleShowPassword,
                                                     }) => {
    return (
        <View className="relative w-full max-w-[306px]">
            <TextInput
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                placeholder="********"
                className="w-full h-[42px] bg-white rounded-[10px] px-4 text-black text-lg"
            />
            <TouchableOpacity
                onPress={toggleShowPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                accessibilityRole="button"
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </TouchableOpacity>
        </View>
    );
};

export default PasswordInput;
