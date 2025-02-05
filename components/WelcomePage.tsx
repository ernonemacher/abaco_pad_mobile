import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PasswordInput from './PasswordInput';

interface WelcomePageProps {
    password: string;
    setPassword: (value: string) => void;
    showPassword: boolean;
    toggleShowPassword: () => void;
    onStart: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({
                                                     password,
                                                     setPassword,
                                                     showPassword,
                                                     toggleShowPassword,
                                                     onStart,
                                                 }) => {
    return (
        <View className="flex flex-col items-center gap-6">
            <Text className="text-[#00FFD4] text-5xl font-normal">AbacoPad</Text>
            <Text className="text-white text-xl">
                Get started by creating or login to your pad
            </Text>
            <PasswordInput
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword}
            />
            <TouchableOpacity
                onPress={onStart}
                className="bg-[#008A73] text-white px-6 py-2 rounded-md"
            >
                <Text className="text-white">Start</Text>
            </TouchableOpacity>
        </View>
    );
};

export default WelcomePage;