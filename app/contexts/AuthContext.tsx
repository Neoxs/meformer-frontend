// app/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import { useRouter } from 'expo-router'
import { Platform } from 'react-native'

// Types
type User = {
  email: string
  token: string
  role?: string
  profile?: {
    firstName?: string
    lastName?: string
  }
} | null

type AuthContextType = {
  user: User
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (userData: SignUpData) => Promise<void>
  signOut: () => Promise<void>
}

type SignUpData = {
  email: string
  password: string
  role: string
  profile: {
    firstName: string
    lastName: string
  }
}

// Storage Helper
const storage = {
  async getItem(key: string) {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key)
    } else {
      return await SecureStore.getItemAsync(key)
    }
  },

  async setItem(key: string, value: string) {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value)
    } else {
      await SecureStore.setItemAsync(key, value)
    }
  },

  async removeItem(key: string) {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key)
    } else {
      await SecureStore.deleteItemAsync(key)
    }
  },
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if user is logged in on app start
  useEffect(() => {
    checkAuthStatus()
  }, [])

  async function checkAuthStatus() {
    try {
      const token = await storage.getItem('userToken')
      const userEmail = await storage.getItem('userEmail')
      const userDataString = await storage.getItem('userData')

      console.log('token : ', token)
      console.log('email : ', userEmail)

      if (token && userEmail && userDataString) {
        const userData = JSON.parse(userDataString)
        setUser({
          email: userEmail,
          token,
          ...userData,
        })
      }
    } catch (error) {
      console.error('Error checking auth status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    console.log('from inside')
    try {
      setIsLoading(true)
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Sign in failed')
      }

      // Store user data
      await storage.setItem('userToken', data.token)
      await storage.setItem('userEmail', email)
      await storage.setItem(
        'userData',
        JSON.stringify({
          role: data.role,
          profile: data.profile,
        })
      )

      // Update state
      setUser({
        email,
        token: data.token,
        role: data.role,
        profile: data.profile,
      })

      // Navigate to home
      router.replace('/(tabs)')
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error('An error occurred during sign in')
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (userData: SignUpData) => {
    try {
      setIsLoading(true)
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Sign up failed')
      }

      // Store user data
      await storage.setItem('userToken', data.token)
      await storage.setItem('userEmail', userData.email)
      await storage.setItem(
        'userData',
        JSON.stringify({
          role: data.role,
          profile: data.profile,
        })
      )

      // Update state
      setUser({
        email: userData.email,
        token: data.token,
        role: data.role,
        profile: data.profile,
      })

      // Navigate to home
      router.replace('/(tabs)')
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error('An error occurred during sign up')
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setIsLoading(true)
      // Clear stored data
      await storage.removeItem('userToken');
      await storage.removeItem('userEmail');
      await storage.removeItem('userData');

      // Update state
      setUser(null)

      // Navigate to login
      router.replace('/auth/login')
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Context provider value
  const value: AuthContextType = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
