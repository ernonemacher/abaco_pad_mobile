import './global.css'


import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import WelcomePage from './components/WelcomePage';
import AdminSetupPage from './components/AdminSetupPage';
import BookshelfPage from './components/BookShelfPage';
import BookFormPage from './components/BookFormPage';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterPage from "@/components/RegisterPage";

export type View = 'welcome' | 'admin-setup' | 'bookshelf' | 'new-book' | 'edit-book';

export interface Book {
    id: number;
    title: string;
    isFavorite: boolean;
}

const Stack = createNativeStackNavigator();

function App() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [anyoneCanEdit, setAnyoneCanEdit] = useState(false);
    const [books, setBooks] = useState<Book[]>([
        { id: 1, title: 'BOOK 1', isFavorite: false },
        { id: 2, title: 'BOOK 2', isFavorite: false },
        { id: 3, title: 'BOOK 3', isFavorite: false },
    ]);
    const [editingBook, setEditingBook] = useState<Book | null>(null);
    const [newBookTitle, setNewBookTitle] = useState('');
    const [bookText, setBookText] = useState('');
    const [email, setEmail] = useState('');

    const handleCreateBook = () => {
        if (newBookTitle.trim()) {
            const newBook: Book = {
                id: books.length + 1,
                title: newBookTitle.trim(),
                isFavorite: false,
            };
            setBooks([...books, newBook]);
            setNewBookTitle('');
        }
    };

    const handleUpdateBook = () => {
        if (editingBook && newBookTitle.trim()) {
            setBooks(books.map(book =>
                book.id === editingBook.id
                    ? { ...book, title: newBookTitle.trim() }
                    : book
            ));
            setEditingBook(null);
            setNewBookTitle('');
        }
    };

    const handleDeleteBook = (id: number) => {
        setBooks(books.filter(book => book.id !== id));
    };

    const toggleFavorite = (id: number) => {
        setBooks(books.map(book =>
            book.id === id ? { ...book, isFavorite: !book.isFavorite } : book
        ));
    };

    const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <View className="min-h-screen bg-[#232324] flex items-center justify-center p-6">
            <View className="w-full max-w-[452px] min-h-[801px] bg-[#232324] border border-black/10 shadow-2xl rounded-[10px] p-6 flex flex-col items-center justify-center">
                {children}
            </View>
        </View>
    );

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Welcome">
                    {({ navigation }) => (
                        <Layout>
                            <WelcomePage
                                email={email}
                                onChangeEmail={setEmail}
                                password={password}
                                onChangePassword={setPassword}
                                showPassword={showPassword}
                                onToggleShowPassword={() => setShowPassword(!showPassword)}
                                onStart={() => navigation.navigate('Bookshelf')}
                                onRegister={() => navigation.navigate('Register')}
                            />
                        </Layout>
                    )}
                </Stack.Screen>

                <Stack.Screen name="Register">
                    {({ navigation }) => (
                        <Layout>
                            <RegisterPage
                                email={email}
                                onChangeEmail={setEmail}
                                password={password}
                                onChangePassword={setPassword}
                                showPassword={showPassword}
                                onToggleShowPassword={() => setShowPassword(!showPassword)}
                                onCreate={() => navigation.navigate('Bookshelf')}
                            />
                        </Layout>
                    )}
                </Stack.Screen>

                <Stack.Screen name="AdminSetup">
                    {({ navigation }) => (
                        <Layout>
                            <AdminSetupPage
                                password={password}
                                setPassword={setPassword}
                                showPassword={showPassword}
                                toggleShowPassword={() => setShowPassword(!showPassword)}
                                anyoneCanEdit={anyoneCanEdit}
                                setAnyoneCanEdit={setAnyoneCanEdit}
                                onContinue={() => navigation.navigate('Bookshelf')}
                            />
                        </Layout>
                    )}
                </Stack.Screen>

                <Stack.Screen name="Bookshelf">
                    {({ navigation }) => (
                        <Layout>
                            <BookshelfPage
                                books={books}
                                onToggleFavorite={toggleFavorite}
                                onEditBook={(book) => {
                                    setEditingBook(book);
                                    setNewBookTitle(book.title);
                                    navigation.navigate('EditBook');
                                }}
                                onDeleteBook={handleDeleteBook}
                                onNewBook={() => navigation.navigate('NewBook')}
                                onBack={() => navigation.navigate('Welcome')}
                            />
                        </Layout>
                    )}
                </Stack.Screen>

                <Stack.Screen name="NewBook">
                    {({ navigation }) => (
                        <Layout>
                            <BookFormPage
                                setBookText={setBookText}
                                bookText={bookText}
                                isEditing={false}
                                bookTitle={newBookTitle}
                                setBookTitle={setNewBookTitle}
                                onSave={() => {
                                    handleCreateBook();
                                    navigation.navigate('Bookshelf');
                                }}
                                onCancel={() => {
                                    setNewBookTitle('');
                                    navigation.navigate('Bookshelf');
                                }}
                            />
                        </Layout>
                    )}
                </Stack.Screen>

                <Stack.Screen name="EditBook">
                    {({ navigation }) => (
                        <Layout>
                            <BookFormPage
                                setBookText={setBookText}
                                bookText={bookText}
                                isEditing={true}
                                bookTitle={newBookTitle}
                                setBookTitle={setNewBookTitle}
                                onSave={() => {
                                    handleUpdateBook();
                                    navigation.navigate('Bookshelf');
                                }}
                                onCancel={() => {
                                    setNewBookTitle('');
                                    setEditingBook(null);
                                    navigation.navigate('Bookshelf');
                                }}
                            />
                        </Layout>
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
