import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from '../features/auth/authSelectors'
import { logout } from '../features/auth/authServices'
import { logoutSuccess } from '../features/auth/authSlice'

const WelcomeScreen = () => {
  const dispatch= useDispatch()
  const user= useSelector(selectUser)

  const handleLogout=async()=>{
    try {
      await logout()
      useDispatch(logoutSuccess())
    } catch (error) {
      console.log("Logout error",error)
    }
  }
  
  return (
    <View style={tailwind`flex-1 bg-zinc-600 justify-center items-center`}> 
      <Text style={tailwind`text-white text-3xl font-900`}>Welcome</Text>
      <Text style={tailwind`text-green-500 text-2xl font-900`}>{
        user?.displayName || user?.email || 'User'}!
      </Text>
      <View style={tailwind`mt-10`}>
        <TouchableOpacity 
        style={tailwind` px-8 py-2 bg-red-400 rounded-5`}
        onPress={handleLogout}
        >
          <Text 
           style={tailwind`text-xl font-bold text-white`}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default WelcomeScreen