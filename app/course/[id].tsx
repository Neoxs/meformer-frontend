// app/course/[id].tsx
import { useLocalSearchParams, Stack } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { getCourseById } from '../utils/mockData';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams();
  const course = getCourseById(id as string);

  if (!course) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Course not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{
          headerTitle: course.title,
          headerBackTitle: 'Courses',
        }} 
      />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.thumbnailContainer}>
            <FontAwesome5 name="book-open" size={60} color="#007AFF" />
          </View>
          <Text style={styles.title}>{course.title}</Text>
          <Text style={styles.instructor}>by {course.instructor}</Text>
          
          <View style={styles.metadataContainer}>
            <View style={styles.metadataItem}>
              <FontAwesome5 name="clock" size={14} color="#666" />
              <Text style={styles.metadataText}>{course.duration}</Text>
            </View>
            <View style={styles.metadataItem}>
              <FontAwesome5 name="signal" size={14} color="#666" />
              <Text style={styles.metadataText}>{course.level}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About this course</Text>
          <Text style={styles.description}>{course.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Topics covered</Text>
          {course.topics.map((topic: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined, index: Key | null | undefined) => (
            <View key={index} style={styles.topicItem}>
              <FontAwesome5 name="check-circle" size={14} color="#007AFF" />
              <Text style={styles.topicText}>{topic}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Course Content</Text>
          {course.content.map((content: { id: Key | null | undefined; type: string; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; duration: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: any) => (
            <View key={content.id} style={styles.contentItem}>
              <FontAwesome5 
                name={content.type === 'video' ? 'play-circle' : 
                      content.type === 'quiz' ? 'question-circle' : 'file-alt'} 
                size={20} 
                color="#007AFF" 
              />
              <View style={styles.contentInfo}>
                <Text style={styles.contentTitle}>{content.title}</Text>
                {content.duration && (
                  <Text style={styles.contentDuration}>{content.duration}</Text>
                )}
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.enrollButton}>
          <Text style={styles.enrollButtonText}>Enroll Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  thumbnailContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  instructor: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  metadataContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  metadataText: {
    marginLeft: 5,
    color: '#666',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  topicText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#444',
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  contentInfo: {
    marginLeft: 15,
    flex: 1,
  },
  contentTitle: {
    fontSize: 16,
    color: '#333',
  },
  contentDuration: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  enrollButton: {
    margin: 20,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});