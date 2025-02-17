// components/BookshelfPage.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { Plus, Heart, Trash2, LogOutIcon } from "lucide-react-native";
import {
  Database,
  ref,
  set,
  onValue,
  DatabaseReference,
  remove,
  get,
} from "firebase/database";
import { Book } from "../App";

interface BookshelfPageProps {
  title: string;
  database: Database;
  path: string;
  navigation: any;
  onLogout: () => void;
}

const BookshelfPage: React.FC<BookshelfPageProps> = ({
  title,
  database,
  path,
  navigation,
  onLogout,
}) => {
  const [currentBook, setCurrentBook] = useState<Book>({
    title: "",
    content: "",
    isFavorite: false,
    fontSize: 16,
    font: "Arial",
    color: "",
    users: [],
    books: [],
  });
  const [content, setContent] = useState<string>("");

  path += title + "/";
  const bookRef = ref(database, path);

  const fetchBooks = async () => {
    get(bookRef).then((snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCurrentBook(data);
        setContent(data.content);
        if (!data.books) {
          console.log("no books inside: " + title);
          data.books = [];
          setCurrentBook(data);
        }
      } else {
        console.log("creating new book: " + title);
        persistBookData(bookRef, currentBook);
      }
    });

    onValue(bookRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setCurrentBook(data);
        if (!data.books) {
          console.log("no books inside: " + title);
          data.books = [];
          setCurrentBook(data);
        }
      } else {
        console.log("creating new book: " + title);
        persistBookData(bookRef, currentBook);
      }
    });
  };

  const persistBookData = async (ref: DatabaseReference, book: Book) => {
    set(ref, {
      title: book.title,
      content: book.content,
      isFavorite: book.isFavorite,
      fontSize: book.fontSize,
      font: book.font,
      color: book.color,
      users: book.users,
      books: book.books,
    });

    setCurrentBook(book);
  };

  const onUpdateContent = async (content: string) => {
    setContent(content);
    console.log(path + currentBook.title + "/content");
    const insideBookRef = ref(database, path + "/content");
    set(insideBookRef, content);
  };

  const onToggleFavorite = async (book: Book) => {
    const insideBookRef = ref(database, path + book.title);
    book.isFavorite = !book.isFavorite;
    persistBookData(insideBookRef, book);
  };

  const onDeleteBook = async (bookTitle: string) => {
    const insideBookRef = ref(database, path + bookTitle);
    remove(insideBookRef);
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  function onNewBook() {
    navigation.navigate("NewBookPage", { database, path, navigation });
  }

  function onSelectBook(book: Book) {
    navigation.navigate("Bookshelf", {
      title: book.title,
      database,
      path,
      navigation,
      onLogout,
    });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ height: 36 }} />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ width: 1 }} />
          <Text style={styles.title}>{title}</Text>
          <View style={{ width: 1 }} />
        </View>
        <TextInput
          value={content}
          onChangeText={onUpdateContent}
          placeholder="Enter book notes here..."
          className="w-full h-[180px] bg-white rounded-[10px] px-4 text-black text-lg"
          multiline
        />
        <View style={{ height: 12 }} />
        {currentBook?.books.map((book) => (
          <TouchableOpacity
            key={book.title}
            style={styles.bookItem}
            onPress={() => onSelectBook(book)}
          >
            <Text style={styles.bookTitle}>{book.title}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => onToggleFavorite(book)}>
                <Heart
                  size={20}
                  color={book.isFavorite ? "#00FFD4" : "#79747E"}
                  fill={book.isFavorite ? "#00FFD4" : "none"}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDeleteBook(book.title)}>
                <Trash2 size={20} color="#79747E" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.newBookButton} onPress={onNewBook}>
          <Plus size={24} color="#79747E" />
          <Text style={styles.newBookText}>NEW BOOK</Text>
        </TouchableOpacity>
        <View style={{ height: 12 }} />
        <TouchableOpacity onPress={onLogout}>
          <LogOutIcon size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { width: "100%" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: { color: "#00FFD4", fontSize: 36, fontWeight: "400" },
  subtitle: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 16,
    textAlign: "center",
  },
  bookItem: {
    backgroundColor: "#2F2E2E",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  bookTitle: { color: "#fff", fontSize: 18 },
  actions: { flexDirection: "row", gap: 12 },
  newBookButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2F2E2E",
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
  },
  newBookText: { color: "#fff", fontSize: 18, marginLeft: 8 },
});

export default BookshelfPage;
