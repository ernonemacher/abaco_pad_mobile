import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft, Plus, Heart, Edit3, Trash2 } from 'lucide-react-native';
import { Book } from '../App';

interface BookshelfPageProps {
    books: Book[];
    onToggleFavorite: (id: number) => void;
    onEditBook: (book: Book) => void;
    onDeleteBook: (id: number) => void;
    onNewBook: () => void;
    onBack: () => void;
}

const BookshelfPage: React.FC<BookshelfPageProps> = ({
                                                         books,
                                                         onToggleFavorite,
                                                         onEditBook,
                                                         onDeleteBook,
                                                         onNewBook,
                                                         onBack,
                                                     }) => {
    return (
        <View className="flex flex-col items-center gap-6 w-full max-w-[402px]">
            <View className="flex flex-row justify-between items-center w-full">
                <TouchableOpacity onPress={onBack}>
                    <ArrowLeft className="text-white" size={24} />
                </TouchableOpacity>
                <Text className="text-[#00FFD4] text-5xl font-normal">AbacoPad</Text>
                <View className="w-6" />
            </View>
            <Text className="text-white text-2xl">Welcome to your bookshelf!</Text>
            <View className="flex flex-col gap-4 w-full">
                {books.map((book) => (
                    <View
                        key={book.id}
                        className="w-full bg-[#2F2E2E] rounded-[10px] p-4 flex flex-row justify-between items-center"
                    >
                        <Text className="text-white text-lg">{book.title}</Text>
                        <View className="flex flex-row gap-4">
                            <TouchableOpacity onPress={() => onToggleFavorite(book.id)}>
                                <Heart
                                    size={20}
                                    className={book.isFavorite ? 'text-[#00FFD4]' : 'text-[#79747E]'}
                                    fill={book.isFavorite ? '#00FFD4' : 'none'}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onEditBook(book)}>
                                <Edit3 size={20} className="text-[#79747E]" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onDeleteBook(book.id)}>
                                <Trash2 size={20} className="text-[#79747E]" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
                <TouchableOpacity
                    onPress={onNewBook}
                    className="w-full bg-[#2F2E2E] rounded-[10px] p-4 flex flex-row items-center justify-center gap-2"
                >
                    <Plus size={24} className="text-[#79747E]" />
                    <Text className="text-white text-lg">NEW BOOK</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BookshelfPage;
