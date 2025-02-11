// components/EditBookPage.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

interface EditBookPageProps {
    bookTitle: string;
    setBookTitle: (value: string) => void;
    onSave: () => void;
    onCancel: () => void;
}

const EditBookPage: React.FC<EditBookPageProps> = ({
                                                       bookTitle,
                                                       setBookTitle,
                                                       onSave,
                                                       onCancel,
                                                   }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onCancel}>
                    <ArrowLeft size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.title}>Edit Book</Text>
                <View style={{ width: 24 }} />
            </View>
            <TextInput
                style={styles.input}
                value={bookTitle}
                onChangeText={setBookTitle}
                placeholder="Enter new book title"
                placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.button} onPress={onSave}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { width: '100%', alignItems: 'center', padding: 16 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: { color: '#00FFD4', fontSize: 36, fontWeight: '400' },
    input: {
        width: '100%',
        height: 42,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 18,
        color: '#000',
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#008A73',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        width: 200,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontSize: 18 },
});

export default EditBookPage;
