import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { useDispatch } from 'react-redux'
import { register } from '../features/auth/authServices'
import { authStart, authSuccess, authFailure } from '../features/auth/authSlice'
import { useNavigation } from '@react-navigation/native'
import Login from './Login'

const SignIn = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [focused, setFocused] = useState(null)

  
  const handlePress = async () => {
    if (!email || !password) return
    if (password !== confirmPassword) {
      return alert('Passwords do not match')
    }

    dispatch(authStart())

    try {
      const userCredential = await register(email, password)
      dispatch(authSuccess(userCredential.user))
    } catch (error) {
      dispatch(authFailure(error.message))
      alert(error.message)
    }
  }

  
  const inputStyle = name =>
    tw`border-b py-2 text-base ${focused === name ? 'border-blue-500' : 'border-gray-400'}`

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1`}>

     
        <View style={tw`bg-zinc-600 h-[35%] rounded-bl-80 rounded-br-30 justify-center px-6`}>
          <Text style={tw`text-white text-3xl font-bold`}>Create Account</Text>
          <Text style={tw`text-gray-300 mt-2 text-base`}>Sign up to get started</Text>
        </View>

        
        <View style={tw`bg-white mx-5 -mt-16 p-6 rounded-3xl shadow-lg`}>

         
          <View style={tw`mb-5`}>
            <Text style={tw`text-gray-600 mb-1`}>Name</Text>
            <TextInput
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
              value={name}
              onChangeText={setName}
              style={[inputStyle('name'), tw`text-gray-600`]}
              placeholder="John Doe"
              placeholderTextColor="#7d7d7d"
            />
          </View>

         
          <View style={tw`mb-5`}>
            <Text style={tw`text-gray-600 mb-1`}>Email</Text>
            <TextInput
              keyboardType="email-address"
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              value={email}
              onChangeText={setEmail}
              style={[inputStyle('email'), tw`text-gray-600`]}
              placeholder="example@email.com"
              placeholderTextColor="#7d7d7d"
            />
          </View>

         
          <View style={tw`mb-5`}>
            <Text style={tw`text-gray-600 mb-1`}>Password</Text>
            <TextInput
              secureTextEntry
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
              value={password}
              onChangeText={setPassword}
              style={[inputStyle('password'), tw`text-gray-600`]}
              placeholder="••••••••"
              placeholderTextColor="#7d7d7d"
            />
          </View>

          
          <View style={tw`mb-8`}>
            <Text style={tw`text-gray-600 mb-1`}>Confirm Password</Text>
            <TextInput
              secureTextEntry
              onFocus={() => setFocused('confirm')}
              onBlur={() => setFocused(null)}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={[inputStyle('confirm'), tw`text-gray-600`]}
              placeholder="••••••••"
              placeholderTextColor="#7d7d7d"
            />
          </View>

          
          <TouchableOpacity
            style={tw`bg-zinc-600 py-4 rounded-xl`}
            onPress={handlePress}
          >
            <Text style={tw`text-white text-center text-base font-semibold`}>Sign Up</Text>
          </TouchableOpacity>

        </View>
          
          <View style={tw`mt-2 items-center`}>
            <Text>Already Have an Account!</Text>
            <TouchableOpacity
              onPress={()=>navigation.navigate('Login')}
            >
              <Text style={tw`text-blue-600 text-xl underline`}>Login</Text>
            </TouchableOpacity>
          </View>
      </View>
    </SafeAreaView>
  )
}

export default SignIn
