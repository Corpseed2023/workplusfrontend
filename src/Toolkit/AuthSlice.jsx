import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { postQuery } from "../API/PostQuery"
import { getQuery } from "../API/GetQuery"

export const authDataFun = createAsyncThunk("auth-user", async (data) => {
  const userApiRes = await postQuery(
    `${process.env.REACT_APP_BASE_URL}login`,
    data
  )
  return userApiRes
})

export const forgotPassword = createAsyncThunk("forgotPass", async (data) => {
  const response = await postQuery(
    `${process.env.REACT_APP_BASE_URL}forgotPassword?email=${data?.userMailId}&password=${data?.password}`
  )
  return response
})

export const genrateOtp = createAsyncThunk("genrateOtpsadas", async (data) => {
  const response = await getQuery(
    `${process.env.REACT_APP_BASE_URL}generate-otp?userMailId=${data?.userMailId}`
  )
  return response
})

export const validateOtp = createAsyncThunk("validateOtp", async (data) => {
  const response = await postQuery(
    `${process.env.REACT_APP_BASE_URL}validate-otp?userMailId=${data?.userMailId}&otp=${data?.otp}`
  )
  return response
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


    builder.addCase(genrateOtp.pending, (state, action) => {
      state.forgotLoading = "pending"
    })
    builder.addCase(genrateOtp.fulfilled, (state, action) => {
      state.forgotLoading = "success"
    })
    builder.addCase(genrateOtp.rejected, (state, action) => {
      state.forgotLoading = "rejected"
    })

    builder.addCase(validateOtp.pending, (state, action) => {
      state.forgotLoading = "pending"
    })
    builder.addCase(validateOtp.fulfilled, (state, action) => {
      state.forgotLoading = "success"
    })
    builder.addCase(validateOtp.rejected, (state, action) => {
      state.forgotLoading = "rejected"
    })


  },
})

export const { logoutFun } = AuthSlice.actions
export default AuthSlice.reducer
