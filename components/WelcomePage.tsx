import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
        <View style={styles.container}>
            <Text style={styles.title}>AbacoPad</Text>
            <Text style={styles.subtitle}>
                Get started by creating or login to your pad
            </Text>
            <PasswordInput
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                toggleShowPassword={toggleShowPassword}
            />
            <TouchableOpacity onPress={onStart} style={styles.button}>
                <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // Tailwind: "flex flex-col items-center gap-6"
        flexDirection: 'column', // "flex-col"
        alignItems: 'center',    // "items-center"
        // Note: React Native doesn’t support a native "gap" property.
        // To simulate "gap-6" (i.e. 24px gap), we add marginBottom on individual elements.
    },
    title: {
        // Tailwind: "text-[#00FFD4] text-5xl font-normal"
        color: '#00FFD4',        // "text-[#00FFD4]"
        fontSize: 48,            // "text-5xl" (approx. 48px)
        fontWeight: 'normal',    // "font-normal"
        marginBottom: 24,        // Simulate gap-6
    },
    subtitle: {
        // Tailwind: "text-white text-xl"
        color: '#FFFFFF',        // "text-white"
        fontSize: 20,            // "text-xl" (approx. 20px)
        marginBottom: 24,        // Simulate gap-6
    },
    button: {
        // Tailwind: "bg-[#008A73] text-white px-6 py-2 rounded-md"
        backgroundColor: '#008A73',
        paddingHorizontal: 24,   // "px-6" (24px horizontal padding)
        paddingVertical: 8,      // "py-2" (8px vertical padding)
        borderRadius: 6,         // "rounded-md" (approx. 6px radius)
    },
    buttonText: {
        color: '#FFFFFF',        // "text-white"
    },
});

export default WelcomePage;
