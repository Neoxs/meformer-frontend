// app/(tabs)/courses.tsx
import { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { Course } from '../types/course';
import { mockCourses } from '../utils/mockData';


export default function CoursesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(mockCourses);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = mockCourses.filter(course => 
      course.title.toLowerCase().includes(text.toLowerCase()) ||
      course.description.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const renderCourseCard = ({ item }: { item: Course }) => (
    <Link href={`/course/${item.id}`} asChild>
      <TouchableOpacity style={styles.courseCard}>
        <View style={styles.courseImageContainer}>
          <FontAwesome5 name="book-open" size={40} color="#007AFF" />
        </View>
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>{item.title}</Text>
          <Text style={styles.courseDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.courseMetadata}>
            <View style={styles.metadataItem}>
              <FontAwesome5 name="clock" size={12} color="#666" />
              <Text style={styles.metadataText}>{item.duration}</Text>
            </View>
            <View style={styles.metadataItem}>
              <FontAwesome5 name="signal" size={12} color="#666" />
              <Text style={styles.metadataText}>{item.level}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Courses</Text>
        <View style={styles.searchContainer}>
          <FontAwesome5 name="search" size={16} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      <FlatList
        data={filteredCourses}
        renderItem={renderCourseCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.courseList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  courseList: {
    padding: 15,
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  courseDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  courseMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  metadataText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
});