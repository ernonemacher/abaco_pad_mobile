import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

interface BookFormPageProps {
    isEditing: boolean;
    bookTitle: string;
    bookText: string;
    setBookTitle: (value: string) => void;
    setBookText: (value: string) => void;
    onSave: () => void;
    onCancel: () => void;
}

const BookFormPage: React.FC<BookFormPageProps> = ({
                                                       isEditing,
                                                       bookTitle,
                                                       setBookTitle,
                                                       onSave,
                                                       onCancel,
                                                       bookText,
                                                       setBookText,
                                                   }) => {
    return (
        <View className="flex flex-col items-center gap-6 w-full max-w-[402px]">
            <View className="flex flex-row justify-between items-center w-full">
                <TouchableOpacity onPress={onCancel}>
                    <ArrowLeft className="text-white" size={24} />
                </TouchableOpacity>
                <Text className="text-[#00FFD4] text-5xl font-normal">AbacoPad</Text>
                <View className="w-6" />
            </View>
            <Text className="text-white text-2xl">
                {isEditing ? 'Edit Book' : 'Create New Book'}
            </Text>
            <View className="w-full space-y-4">
                <TextInput
                    value={bookTitle}
                    onChangeText={setBookTitle}
                    placeholder="Enter book title"
                    className="w-full h-[42px] bg-white rounded-[10px] px-4 text-black text-lg"
                    autoFocus
                />
                <TextInput
                    value={bookText}
                    onChangeText={setBookText}
                    placeholder="Enter book title"
                    className="w-full h-[180px] bg-white rounded-[10px] px-4 text-black text-lg"
                    autoFocus
                    multiline
                />
                <TouchableOpacity
                    onPress={onSave}
                    className="w-full bg-[#008A73] py-2 rounded-[10px]"
                >
                    <Text className="text-white text-lg">
                        {isEditing ? 'Save Changes' : 'Create Book'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BookFormPage;
