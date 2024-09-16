'use client'
import { createOrUpdateAccount } from '@/lib/actions/account.actions'
import { useUser } from '@stackframe/stack'
import { useRouter } from 'next/navigation'
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react'

const AuthContext = createContext<any>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const GetDetails = async () => {
      try {
        const user = useUser()
        if (user && user?.primaryEmail) {
          const userData = await createOrUpdateAccount(
            user?.id,
            '',
            user?.primaryEmail,
          )
          setUser(userData)
        }
      } catch (error) {
        console.error('Error fetching user details:', error)
      }
    }

    GetDetails()
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
