// components/BookshelfPage.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Plus, Heart, Edit3, Trash2, LogOutIcon } from "lucide-react-native";
import { Book } from "../App";

interface BookshelfPageProps {
  title: string;
  books: Book[];
  onSelectBook: (book: Book) => void;
  onToggleFavorite: (id: number) => void;
  onEditBook: (book: Book) => void;
  onDeleteBook: (id: number) => void;
  onNewBook: () => void;
  onLogout: () => void;
}

const BookshelfPage: React.FC<BookshelfPageProps> = ({
  title,
  books,
  onSelectBook,
  onToggleFavorite,
  onEditBook,
  onDeleteBook,
  onNewBook,
  onLogout,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: 1 }} />
        <Text style={styles.title}>title</Text>
        <View style={{ width: 1 }} />
      </View>
      <TextInput
        value={""}
        onChangeText={() => {}}
        placeholder="Enter book notes here..."
        className="w-full h-[180px] bg-white rounded-[10px] px-4 text-black text-lg"
        multiline
      />
      <View style={{ height: 12 }} />
      {books.map((book) => (
        <TouchableOpacity
          key={book.id}
          style={styles.bookItem}
          onPress={() => onSelectBook(book)}
        >
          <Text style={styles.bookTitle}>{book.title}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => onToggleFavorite(book.id)}>
              <Heart
                size={20}
                color={book.isFavorite ? "#00FFD4" : "#79747E"}
                fill={book.isFavorite ? "#00FFD4" : "none"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onEditBook(book)}>
              <Edit3 size={20} color="#79747E" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDeleteBook(book.id)}>
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
