// app/(tabs)/index.tsx
import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  Image,
  FlatList
} from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { getRandomCourses } from '../utils/mockData';

export default function HomeScreen() {
  const { user } = useAuth();
  const [featuredCourses, setFeaturedCourses] = useState(getRandomCourses(3));
  const [inProgressCourses, setInProgressCourses] = useState(getRandomCourses(2));

  const renderCourseCard = ({ item }) => (
    <Link href={`/course/${item.id}`} asChild>
      <TouchableOpacity style={styles.courseCard}>
        <View style={styles.courseImageContainer}>
          <FontAwesome5 name="book-open" size={30} color="#007AFF" />
        </View>
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle} numberOfLines={2}>{item.title}</Text>
          <View style={styles.courseMetadata}>
            <Text style={styles.instructorName}>{item.instructor}</Text>
            <View style={styles.durationContainer}>
              <FontAwesome5 name="clock" size={12} color="#666" />
              <Text style={styles.duration}>{item.duration}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  const renderProgressCourse = ({ item }) => (
    <Link href={`/course/${item.id}`} asChild>
      <TouchableOpacity style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <FontAwesome5 name="book" size={16} color="#007AFF" />
          <Text style={styles.progressTitle} numberOfLines={1}>{item.title}</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '60%' }]} />
        </View>
        <Text style={styles.progressText}>60% Complete</Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <View style={styles.welcomeHeader}>
          <Text style={styles.welcomeText}>
            Welcome back,{'\n'}
            <Text style={styles.userName}>{user?.profile?.firstName || 'Student'}!</Text>
          </Text>
          <View style={styles.avatarContainer}>
            <FontAwesome5 name="user-circle" size={40} color="#007AFF" />
          </View>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <FontAwesome5 name="book-reader" size={20} color="#007AFF" />
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Courses{'\n'}In Progress</Text>
        </View>
        <View style={styles.statCard}>
          <FontAwesome5 name="check-circle" size={20} color="#4CAF50" />
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Courses{'\n'}Completed</Text>
        </View>
        <View style={styles.statCard}>
          <FontAwesome5 name="clock" size={20} color="#FF9800" />
          <Text style={styles.statNumber}>12h</Text>
          <Text style={styles.statLabel}>Learning{'\n'}Time</Text>
        </View>
      </View>

      {/* Continue Learning */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Continue Learning</Text>
        <FlatList
          data={inProgressCourses}
          renderItem={renderProgressCourse}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.progressList}
        />
      </View>

      {/* Featured Courses */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Courses</Text>
          <Link href="/courses" asChild>
            <TouchableOpacity>
              <Text style={styles.seeAllButton}>See All</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <FlatList
          data={featuredCourses}
          renderItem={renderCourseCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.courseList}
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome5 name="search" size={20} color="#007AFF" />
          <Text style={styles.actionText}>Find Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome5 name="bookmark" size={20} color="#007AFF" />
          <Text style={styles.actionText}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome5 name="certificate" size={20} color="#007AFF" />
          <Text style={styles.actionText}>Certificates</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  welcomeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: '#333',
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllButton: {
    color: '#007AFF',
    fontSize: 14,
  },
  courseList: {
    paddingRight: 20,
  },
  courseCard: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseImageContainer: {
    height: 120,
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseInfo: {
    padding: 15,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  courseMetadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  instructorName: {
    fontSize: 12,
    color: '#666',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  progressList: {
    paddingRight: 20,
  },
  progressCard: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
    flex: 1,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    marginVertical: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 8,
    fontSize: 12,
    color: '#007AFF',
  },
});