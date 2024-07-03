import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getQuery } from "../API/GetQuery"
import { postQuery } from "../API/PostQuery"
import { deleteQuery } from "../API/DeleteQuery"
import { putQuery } from "../API/PutQuery"
import { userPutQuery } from "../API/UserPutQuery"

export const allUsersFun = createAsyncThunk("all-users-data", async () => {
  const getUsersData = await getQuery(
    `${process.env.REACT_APP_BASE_URL}allUsersList`
  )
  return getUsersData?.data
})

export const createUserFun = createAsyncThunk(
  "create-all-users",
  async (data) => {
    const createUser = await postQuery(
      `${process.env.REACT_APP_BASE_URL}createUser`,
      data
    )
    return createUser?.data
  }
)

export const editUserFun = createAsyncThunk("edituser", async (data) => {
  const response = await userPutQuery(
    `${process.env.REACT_APP_BASE_URL}editUser?userId=${data?.id}`,
    data
  )
  return response.data
})

export const deleteUserFun = createAsyncThunk(
  "delete-all-users",
  async ({ id }) => {
    const deleteUser = await deleteQuery(
      `${process.env.REACT_APP_BASE_URL}deleteUser?userId=${id}`
    )
    return deleteUser?.data
  }
)

export const getCurrentUserFun = createAsyncThunk(
  "geycurrentuser",
  async (email) => {
    const getSingleUser = await getQuery(
      `${process.env.REACT_APP_BASE_URL}userDetails?usernameMail=${email}`
    )
    return getSingleUser
  }
)
export const deleteUsers = createAsyncThunk("deleteUsersIn", async (data) => {
  const response = await deleteQuery(
    `${process.env.REACT_APP_BASE_URL}deleteUsers`,
    data
  )
  return response.data
})

export const AllUsersSlice = createSlice({
  name: "alluser",
  initialState: {
    allUsers: [],
    userLoading: false,
    userError: false,
    createNewUser: false,
    newuserLoading: false,
    newUserError: false,
    deleteUser: false,
    deluserLoading: false,
    delUserError: false,
    singleUser: {},
    singleUserLoading: false,
    singleUserError: false,
    multiUserDeleteLoading: "",
    multiUserDeleteError: "",
  },
  extraReducers: (builder) => {
    builder.addCase(allUsersFun.pending, (state, action) => {
      state.userLoading = true
      state.userError = false
    })
    builder.addCase(allUsersFun.fulfilled, (state, action) => {
      state.allUsers = action.payload
      state.userLoading = false
      state.userError = false
    })
    builder.addCase(allUsersFun.rejected, (state, action) => {
      state.userLoading = false
      state.userError = true
    })

    builder.addCase(createUserFun.pending, (state, action) => {
      state.newuserLoading = true
      state.newUserError = false
    })
    builder.addCase(createUserFun.fulfilled, (state, action) => {
      state.createNewUser = true
      state.newuserLoading = false
      state.newUserError = false
    })
    builder.addCase(createUserFun.rejected, (state, action) => {
      state.newuserLoading = false
      state.newUserError = true
    })

    builder.addCase(deleteUserFun.pending, (state, action) => {
      state.deluserLoading = true
      state.delUserError = false
    })
    builder.addCase(deleteUserFun.fulfilled, (state, action) => {
      state.deleteUser = action.payload
      state.deluserLoading = false
      state.delUserError = false
    })
    builder.addCase(deleteUserFun.rejected, (state, action) => {
      state.deluserLoading = false
      state.delUserError = true
    })
    builder.addCase(getCurrentUserFun.pending, (state, action) => {
      state.singleUserLoading = true
      state.singleUserError = false
    })
    builder.addCase(getCurrentUserFun.fulfilled, (state, action) => {
      state.singleUser = action.payload
      state.singleUserLoading = false
      state.singleUserError = false
    })
    builder.addCase(getCurrentUserFun.rejected, (state, action) => {
      state.singleUserLoading = false
      state.singleUserError = true
    })

    builder.addCase(deleteUsers.pending, (state, action) => {
      state.multiUserDeleteLoading = "pending"
    })
    builder.addCase(deleteUsers.fulfilled, (state, action) => {
      state.multiUserDeleteLoading = "success"
      state.multiUserDeleteError = ""
    })
    builder.addCase(deleteUsers.rejected, (state, action) => {
      state.multiUserDeleteLoading = "rejected"
      state.multiUserDeleteError = "error"
    })
  },
})

export default AllUsersSlice.reducer
