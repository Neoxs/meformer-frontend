import { View, Text, FlatList, StyleSheet } from 'react-native'

const mockCourses = [
  { id: '1', title: 'Mathematics', subject: 'Algebra' },
  { id: '2', title: 'Physics', subject: 'Mechanics' },
  { id: '3', title: 'Chemistry', subject: 'Organic Chemistry' },
]

export default function CoursesScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={mockCourses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.courseCard}>
            <Text style={styles.courseTitle}>{item.title}</Text>
            <Text style={styles.courseSubject}>{item.subject}</Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  courseCard: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseSubject: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
