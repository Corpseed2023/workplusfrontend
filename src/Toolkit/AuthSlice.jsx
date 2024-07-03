import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { postQuery } from "../API/PostQuery"

export const authDataFun = createAsyncThunk("auth-user", async (data) => {
  const userApiRes = await postQuery(
    `${process.env.REACT_APP_BASE_URL}login`,
    data
  )
  return userApiRes
})

export const forgotPassword = createAsyncThunk("forgotPass", async (data) => {
  const response = await postQuery(
    `${process.env.REACT_APP_BASE_URL}forgotPassword?email=${data?.email}&password=${data?.password}`
  )
  return response.data
})

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: {},
    loading: false,
    error: false,
    isAuth: false,
    forgotLoading: "",
  },
  reducers: {
    logoutFun: (state, action) => {
      state.isAuth = false
      state.currentUser = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authDataFun.pending, (state, action) => {
      state.loading = true
      state.error = false
    })
    builder.addCase(authDataFun.fulfilled, (state, action) => {
      state.currentUser = action.payload
      state.loading = false
      state.isAuth = true
      state.error = false
    })
    builder.addCase(authDataFun.rejected, (state, action) => {
      state.loading = false
      state.error = true
    })
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.forgotLoading = "pending"
    })
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.forgotLoading = "success"
    })
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.forgotLoading = "rejected"
    })
  },
})

export const { logoutFun } = AuthSlice.actions
export default AuthSlice.reducer
