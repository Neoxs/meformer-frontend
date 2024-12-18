// app/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import { useRouter } from 'expo-router'

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
      const token =
        'eyJhbGciOiJIUzI1NiJ9.eyJsYXN0UmVmcmVzaFRpbWUiOjE3MzQ1MjAzNzQxNzUsInhzcmZUb2tlbiI6ImpxdDQ2cDhwcW00MDQ4ZHJrcTNpaHZuOW9hIiwianRpIjoiNzBiMmRkNTItYjQxZS00NDRmLWFmZTctZWY1MTg1YWIyNzhjIiwic3ViIjoiN2E4YTg1OTUtMDY1NS00MTZmLTg1YTMtMDkyM2Q0ZGJhZWU0IiwiaWF0IjoxNzM0NTIwMzc0LCJleHAiOjE3MzQ3Nzk1NzR9.LJlD3sYaaMmH0vhPvcF5HRqSz4VYHpFBSDreOFdgYnc'
      const userEmail = 'test@test.com'
      const userDataString = {
        firstName: 'John',
        lastName: 'Doe',
        grade: '10',
      }

      console.log('token : ', token)

      if (token && userEmail && userDataString) {
        const userData = userDataString
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
      await SecureStore.setItemAsync('userToken', data.token)
      await SecureStore.setItemAsync('userEmail', email)
      await SecureStore.setItemAsync(
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
      await SecureStore.setItemAsync('userToken', data.token)
      await SecureStore.setItemAsync('userEmail', userData.email)
      await SecureStore.setItemAsync(
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
      await SecureStore.deleteItemAsync('userToken')
      await SecureStore.deleteItemAsync('userEmail')
      await SecureStore.deleteItemAsync('userData')

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
