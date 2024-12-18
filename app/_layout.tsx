// app/_layout.tsx
import { useEffect } from 'react';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ActivityIndicator, View, Text } from 'react-native';

// Initial layout navigation with auth check
function InitialLayout() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // Check if user is authenticated and handle navigation
      const inAuthGroup = segments[0] === 'auth';

      if (!user && !inAuthGroup) {
        // Redirect to login if user is not authenticated
        router.replace('/auth/login');
      } else if (user && inAuthGroup) {
        // Redirect to home if user is authenticated and trying to access auth pages
        router.replace('/(tabs)');
      }
    }
  }, [user, segments, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return <Slot />;
}

// Root layout component
export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}

// Error Boundary
export function ErrorBoundary(props: { error: Error }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>An error occurred: {props.error.message}</Text>
    </View>
  );
}

// Define default settings
export const unstable_settings = {
  initialRouteName: '(auth)',
};