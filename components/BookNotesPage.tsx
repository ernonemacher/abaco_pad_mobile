// components/BookNotesPage.tsx
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { ArrowLeft, Plus, Edit3, Trash2 } from 'lucide-react-native';
import { Note } from '@/App';

interface BookNotesPageProps {
  bookId: number;
  bookTitle: string;
  notes: Note[];
  onNewNote: () => void;
  onEditNote: (note: Note) => void;
  onDeleteNote: (id: number) => void;
  onBack: () => void;
}

const BookNotesPage: React.FC<BookNotesPageProps> = ({
  bookId,
  bookTitle,
  notes,
  onNewNote,
  onEditNote,
  onDeleteNote,
  onBack,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>{bookTitle}</Text>
        <View style={{ width: 24 }} />
      </View>
      <Text style={styles.subtitle}>Notes</Text>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <Text
              style={[
                styles.noteTitle,
                { fontSize: item.fontSize, fontFamily: item.font, color: item.color },
              ]}
            >
              {item.title}
            </Text>
            <View style={styles.noteActions}>
              <TouchableOpacity onPress={() => onEditNote(item)}>
                <Edit3 size={20} color="#79747E" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onDeleteNote(item.id)}>
                <Trash2 size={20} color="#79747E" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.newNoteButton} onPress={onNewNote}>
        <Plus size={24} color="#79747E" />
        <Text style={styles.newNoteText}>New Note</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: { color: '#00FFD4', fontSize: 36, fontWeight: '400' },
  subtitle: { color: '#fff', fontSize: 20, marginBottom: 16, textAlign: 'center' },
  noteItem: {
    backgroundColor: '#2F2E2E',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  noteTitle: { color: '#fff', fontSize: 18 },
  noteActions: { flexDirection: 'row', gap: 12 },
  newNoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2F2E2E',
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
  },
  newNoteText: { color: '#fff', fontSize: 18, marginLeft: 8 },
});

export default BookNotesPage;
