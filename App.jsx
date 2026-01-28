import { Provider, useDispatch } from 'react-redux'
import { store } from './src/app/store'
import AppNavigator from './src/navigator/AppNavigator'
import { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth'
import { authSuccess, logoutSuccess } from './src/features/auth/authSlice'

function AuthListener() {
  const dispatch = useDispatch()
  const auth = getAuth() 
 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, user => {
    if (user) {
      
      dispatch(
        authSuccess({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      )
    } else {
      dispatch(logoutSuccess())
    }
  })
  return unsubscribe
}, [dispatch])

  return <AppNavigator />
}

export default function App() {
  return (
    <Provider store={store}>
      <AuthListener />
    </Provider>
  )
}
