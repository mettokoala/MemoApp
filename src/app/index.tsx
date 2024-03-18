import { Redirect, router } from 'expo-router'
import { auth } from '../config'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

const Index = (): JSX.Element => {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        router.replace('/memo/list')
      }
    })
  }, [])
  return <Redirect href='auth/log_in' />
}

export default Index
