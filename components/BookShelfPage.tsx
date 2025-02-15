// components/BookshelfPage.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ArrowLeft, Plus, Heart, Edit3, Trash2 } from "lucide-react-native";
import { Book } from "../App";

interface BookshelfPageProps {
  books: Book[];
  onSelectBook: (book: Book) => void; // New: tapping a book
  onToggleFavorite: (id: number) => void;
  onEditBook: (book: Book) => void;
  onDeleteBook: (id: number) => void;
  onNewBook: () => void;
  onBack: () => void;
}

const BookshelfPage: React.FC<BookshelfPageProps> = ({
  books,
  onSelectBook,
  onToggleFavorite,
  onEditBook,
  onDeleteBook,
  onNewBook,
  onBack,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>AbacoPad</Text>
        <View style={{ width: 24 }} />
      </View>
      <Text style={styles.subtitle}>Your Books</Text>
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
