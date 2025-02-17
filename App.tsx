import "./global.css";

import React, { useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./RootNavigation";

import WelcomePage from "./components/WelcomePage";
import RegisterPage from "./components/RegisterPage";
import AdminSetupPage from "./components/AdminSetupPage";
import BookshelfPage from "./components/BookShelfPage";
import BookFormPage from "./components/BookFormPage";
import EditBookPage from "./components/EditBookPage";
import BookNotesPage from "./components/BookNotesPage";
import NoteFormPage from "./components/NoteFormPage";
import NoteSettingsPage from "./components/NoteSettingsPage";

import { getApps, initializeApp, FirebaseApp } from "firebase/app";
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  initializeAuth,
  User,
  getReactNativePersistence,
  signOut,
} from "firebase/auth";
import { Database, get } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Book {
  id: number;
  title: string;
  isFavorite: boolean;
}

export interface Note {
  id: number;
  bookId: number;
  title: string;
  content: string;
  fontSize: number;
  font: string;
  color: string;
}

const firebaseConfig = {
  apiKey: "AIzaSyDFHL6xsKy7W61Wz_A0o4YRRPFdBS-k8yM",
  authDomain: "abacopad.firebaseapp.com",
  databaseURL: "https://abacopad-default-rtdb.firebaseio.com",
  projectId: "abacopad",
  storageBucket: "abacopad.firebasestorage.app",
  messagingSenderId: "774777031569",
  appId: "1:774777031569:web:9794b57f58527ad767e830",
  measurementId: "G-7HNTC3D498",
};
function App() {
  const Stack = createNativeStackNavigator();

  let app: FirebaseApp = getApps()[0];
  let auth: Auth;
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigationRef.current?.navigate("Bookshelf");
      } else {
        navigationRef.current?.navigate("Welcome");
      }
    });
  }

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigationRef.current?.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [user, setUser] = useState<User | null>(null);

  const signIn = async (email: string, password: string) => {
    console.log("signing in");
    console.log(email, password);
    console.log(auth);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      navigationRef.current?.reset({
        index: 0,
        routes: [{ name: "Bookshelf" }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async (email: string, password: string) => {
    console.log("creating user");
    console.log(email, password);
    console.log(auth);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      navigationRef.current?.reset({
        index: 0,
        routes: [{ name: "Bookshelf" }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: "BOOK 1", isFavorite: false },
    { id: 2, title: "BOOK 2", isFavorite: false },
    { id: 3, title: "BOOK 3", isFavorite: false },
  ]);
  const [newBookTitle, setNewBookTitle] = useState("");
  const [bookText, setBookText] = useState("");

  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [font, setFont] = useState("Arial");
  const [color, setColor] = useState("#000000");

  const handleCreateNote = (bookId: number) => {
    if (noteTitle.trim()) {
      const newNote: Note = {
        id: notes.length + 1,
        bookId,
        title: noteTitle.trim(),
        content: noteContent,
        fontSize,
        font,
        color,
      };
      setNotes([...notes, newNote]);
      setNoteTitle("");
      setNoteContent("");
      setFontSize(16);
      setFont("Arial");
      setColor("#000000");
    }
  };

  const handleUpdateNote = () => {
    if (editingNote && noteTitle.trim()) {
      setNotes(
        notes.map((note) =>
          note.id === editingNote.id
            ? {
                ...note,
                title: noteTitle.trim(),
                content: noteContent,
                fontSize,
                font,
                color,
              }
            : note
        )
      );
      setEditingNote(null);
      setNoteTitle("");
      setNoteContent("");
      setFontSize(16);
      setFont("Arial");
      setColor("#000000");
    }
  };

  const handleUpdateBook = (bookId: number, newTitle: string) => {
    setBooks(
      books.map((book) =>
        book.id === bookId ? { ...book, title: newTitle } : book
      )
    );
  };

  const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <View className="min-h-screen bg-[#232324] flex items-center justify-center p-6">
      <View className="w-full max-w-[452px] min-h-[801px] bg-[#232324] border border-black/10 shadow-2xl rounded-[10px] p-6 flex flex-col items-center justify-center">
        {children}
      </View>
    </View>
  );

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome">
          {({ navigation }) => (
            <Layout>
              <WelcomePage
                navigation={navigation}
                onStart={signIn}
                onRegister={() => navigation.navigate("Register")}
              />
            </Layout>
          )}
        </Stack.Screen>

        <Stack.Screen name="Register">
          {({ navigation }) => (
            <Layout>
              <RegisterPage navigation={navigation} onCreate={createUser} />
            </Layout>
          )}
        </Stack.Screen>

        <Stack.Screen name="AdminSetup">
          {({ navigation }) => (
            <Layout>
              <AdminSetupPage navigation={navigation} />
            </Layout>
          )}
        </Stack.Screen>

        <Stack.Screen name="Bookshelf">
          {({ navigation }) => (
            <Layout>
              <BookshelfPage
                title="AbacoPad"
                books={books}
                onSelectBook={(book) =>
                  navigation.navigate("BookNotes", {
                    bookId: book.id,
                    bookTitle: book.title,
                  })
                }
                onToggleFavorite={(id) =>
                  setBooks(
                    books.map((book) =>
                      book.id === id
                        ? { ...book, isFavorite: !book.isFavorite }
                        : book
                    )
                  )
                }
                onEditBook={(book) =>
                  navigation.navigate("EditBook", {
                    bookId: book.id,
                    bookTitle: book.title,
                  })
                }
                onDeleteBook={(id) =>
                  setBooks(books.filter((book) => book.id !== id))
                }
                onNewBook={() => navigation.navigate("NewBook")}
                onLogout={logout}
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
                  if (newBookTitle.trim()) {
                    const newBook: Book = {
                      id: books.length + 1,
                      title: newBookTitle.trim(),
                      isFavorite: false,
                    };
                    setBooks([...books, newBook]);
                    setNewBookTitle("");
                  }
                  navigation.navigate("Bookshelf");
                }}
                onCancel={() => {
                  setNewBookTitle("");
                  navigation.navigate("Bookshelf");
                }}
              />
            </Layout>
          )}
        </Stack.Screen>

        <Stack.Screen name="EditBook">
          {({ route, navigation }) => {
            const { bookId, bookTitle } = route.params as {
              bookId: number;
              bookTitle: string;
            };
            const [editedTitle, setEditedTitle] = useState(bookTitle);
            return (
              <Layout>
                <EditBookPage
                  bookTitle={editedTitle}
                  setBookTitle={setEditedTitle}
                  onSave={() => {
                    handleUpdateBook(bookId, editedTitle);
                    navigation.goBack();
                  }}
                  onCancel={() => navigation.goBack()}
                />
              </Layout>
            );
          }}
        </Stack.Screen>

        <Stack.Screen name="BookNotes">
          {({ route, navigation }) => {
            const { bookId, bookTitle } = route.params as {
              bookId: number;
              bookTitle: string;
            };
            const bookNotes = notes.filter((note) => note.bookId === bookId);
            return (
              <Layout>
                <BookNotesPage
                  bookId={bookId}
                  bookTitle={bookTitle}
                  notes={bookNotes}
                  onNewNote={() =>
                    navigation.navigate("NewNote", { bookId, bookTitle })
                  }
                  onEditNote={(note) => {
                    setEditingNote(note);
                    setNoteTitle(note.title);
                    setNoteContent(note.content);
                    setFontSize(note.fontSize);
                    setFont(note.font);
                    setColor(note.color);
                    navigation.navigate("EditNote", { bookId, bookTitle });
                  }}
                  onDeleteNote={(id) =>
                    setNotes(notes.filter((note) => note.id !== id))
                  }
                  onBack={() => navigation.goBack()}
                />
              </Layout>
            );
          }}
        </Stack.Screen>

        <Stack.Screen name="NewNote">
          {({ route, navigation }) => {
            const { bookId, bookTitle } = route.params as {
              bookId: number;
              bookTitle: string;
            };
            return (
              <Layout>
                <NoteFormPage
                  isEditing={false}
                  noteTitle={noteTitle}
                  setNoteTitle={setNoteTitle}
                  noteContent={noteContent}
                  setNoteContent={setNoteContent}
                  onEditSettings={() =>
                    navigation.navigate("NoteSettings", { bookId, bookTitle })
                  }
                  onSave={() => {
                    handleCreateNote(bookId);
                    navigation.navigate("BookNotes", { bookId, bookTitle });
                  }}
                  onCancel={() => {
                    setNoteTitle("");
                    setNoteContent("");
                    navigation.goBack();
                  }}
                />
              </Layout>
            );
          }}
        </Stack.Screen>

        <Stack.Screen name="EditNote">
          {({ route, navigation }) => {
            const { bookId, bookTitle } = route.params as {
              bookId: number;
              bookTitle: string;
            };
            return (
              <Layout>
                <NoteFormPage
                  isEditing={true}
                  noteTitle={noteTitle}
                  setNoteTitle={setNoteTitle}
                  noteContent={noteContent}
                  setNoteContent={setNoteContent}
                  onEditSettings={() =>
                    navigation.navigate("NoteSettings", { bookId, bookTitle })
                  }
                  onSave={() => {
                    handleUpdateNote();
                    navigation.navigate("BookNotes", { bookId, bookTitle });
                  }}
                  onCancel={() => {
                    setNoteTitle("");
                    setNoteContent("");
                    setEditingNote(null);
                    navigation.goBack();
                  }}
                />
              </Layout>
            );
          }}
        </Stack.Screen>

        <Stack.Screen name="NoteSettings">
          {({ route, navigation }) => {
            const { bookId, bookTitle } = route.params as {
              bookId: number;
              bookTitle: string;
            };
            return (
              <Layout>
                <NoteSettingsPage
                  fontSize={fontSize}
                  setFontSize={setFontSize}
                  fontFamily={font}
                  setFontFamily={setFont}
                  color={color}
                  setColor={setColor}
                  onSave={() => navigation.goBack()}
                  onCancel={() => navigation.goBack()}
                />
              </Layout>
            );
          }}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
