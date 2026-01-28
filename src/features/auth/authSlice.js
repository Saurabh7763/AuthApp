import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    authStart: state => {
      state.isLoading = true
      state.error = null
    },
    authSuccess: (state, action) => {
      // Only store serializable data
      state.user = {
        uid: action.payload.uid,
        email: action.payload.email,
        displayName: action.payload.displayName || null,
      }
      state.isAuthenticated = true
      state.isLoading = false
    },
    authFailure: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
    logoutSuccess: state => {
      state.user = null
      state.isAuthenticated = false
    },
  },
})


export const {
  authStart,
  authSuccess,
  authFailure,
  logoutSuccess,
} = authSlice.actions

export default authSlice.reducer
