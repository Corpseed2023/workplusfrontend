import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getQuery } from "../API/GetQuery"
import { putQuery } from "../API/PutQuery"
import { userPutQuery } from "../API/UserPutQuery"
import { deleteQuery } from "../API/DeleteQuery"

export const allGapFun = createAsyncThunk(
  "all-gap-data",
  async ({ userMailId, date }) => {
    const allGapRes = await getQuery(
      `${process.env.REACT_APP_BASE_URL}gapActivity?email=${userMailId}&date=${date}`
    )
    return allGapRes?.data
  }
)

export const editGaptimeReson = createAsyncThunk(
  "editGapReason",
  async (resp) => {
    const response = await userPutQuery(
      `${process.env.REACT_APP_BASE_URL}editReason?userEmail=${resp.email}&lastOfflineId=${resp?.lastOfflineId}&lastOnlineId=${resp?.lastOnlineId}&date=${resp?.date}`,
      resp?.data
    )
    return response
  }
)

export const deleteGapActivity = createAsyncThunk(
  "deleteGapActivity",
  async (data) => {
    const response = await deleteQuery(
      `${process.env.REACT_APP_BASE_URL}deleteGap?userEmail=${data?.email}&lastOfflineId=${data?.lastOfflineId}&lastOnlineId=${data?.lastOnlineId}&date=${data?.date}`,
      data.data
    )
    return response
  }
)

export const AllGapSlice = createSlice({
  name: "gap",
  initialState: {
    allGapData: [],
    gapLoading: false,
    gapError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(allGapFun.pending, (state, action) => {
      state.gapLoading = true
      state.gapError = false
    })
    builder.addCase(allGapFun.fulfilled, (state, action) => {
      state.allGapData = action.payload
      state.gapLoading = false
      state.gapError = false
    })
    builder.addCase(allGapFun.rejected, (state, action) => {
      state.gapLoading = false
      state.gapError = true
    })
  },
})

export default AllGapSlice.reducer
