import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import PasswordInput from './PasswordInput';

interface AdminSetupPageProps {
    password: string;
    setPassword: (value: string) => void;
    showPassword: boolean;
    toggleShowPassword: () => void;
    anyoneCanEdit: boolean;
    setAnyoneCanEdit: (value: boolean) => void;
    onContinue: () => void;
}

const AdminSetupPage: React.FC<AdminSetupPageProps> = ({
                                                           password,
                                                           setPassword,
                                                           showPassword,
                                                           toggleShowPassword,
                                                           anyoneCanEdit,
                                                           setAnyoneCanEdit,
                                                           onContinue,
                                                       }) => {
    return (
        <View className="flex flex-col items-center gap-6">
            <Text className="text-[#00FFD4] text-5xl font-normal">AbacoPad</Text>
            <Text className="text-white text-xl">Create an admin password</Text>
            <PasswordInput
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword}
            />
            <View className="flex flex-row items-center gap-2">
                <Switch
                    value={anyoneCanEdit}
                    onValueChange={setAnyoneCanEdit}
                    className="w-4 h-4"
                />
                <Text className="text-white">Anyone edits</Text>
            </View>
            <TouchableOpacity
                onPress={onContinue}
                className="bg-[#008A73] text-white px-6 py-2 rounded-md"
            >
                <Text className="text-white">Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AdminSetupPage;
