import { View, Text, StyleSheet } from 'react-native'

export default function ExploreScreen() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    link: {
      marginTop: 15,
      paddingVertical: 15,
    },
    linkText: {
      fontSize: 14,
      color: '#2e78b7',
    },
  })
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Courses</Text>
    </View>
  )
}
