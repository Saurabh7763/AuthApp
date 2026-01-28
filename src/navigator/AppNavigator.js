import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../features/auth/authSelectors'
import SignIn from '../screens/SignIn'
import WelcomeScreen from '../screens/WelcomeScreen'
import Login from '../screens/Login'

const Stack = createNativeStackNavigator()

export default function AppNavigator() {
  const isAuthenticated = useSelector(selectIsAuth)

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        ) : (
             <>
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Login" component={Login}/>
            </>
        )}
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}
