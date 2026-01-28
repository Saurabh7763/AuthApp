import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { login } from '../features/auth/authServices'
import { authStart, authFailure, authSuccess } from '../features/auth/authSlice'
import { useDispatch } from 'react-redux'




const Login = () => {
    const [focused, setFocused]=useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    

    const handleLogin=async()=>{
        if(!email || !password) return

        dispatch(authStart())
       try {
      const userCredential = await login(email, password)
      const user = userCredential.user

      dispatch(
        authSuccess({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || null,
        })
      )
     
      
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
          <Text style={tw`text-white text-2xl font-bold`}>Already Have an Account</Text>
          <Text style={tw`text-gray-300 mt-2 text-base`}>Login to get started</Text>
        </View>

        
        <View style={tw`bg-white mx-5 -mt-16 p-6 rounded-3xl shadow-lg`}>

         
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
          
          <TouchableOpacity
            style={tw`bg-zinc-600 py-4 rounded-xl`}
            onPress={handleLogin}
          >
            <Text style={tw`text-white text-center text-base font-semibold`}>Login</Text>
          </TouchableOpacity>
        
        </View>

        
      </View>
      
    </SafeAreaView>
  )
}

export default Login
