// /gap-track/getUserGapData?userMailId=nishu.singh%40corpseed.com&date=2024-06-05


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getQuery } from "../API/GetQuery"

export const allGapFun = createAsyncThunk(
  "all-gap-data",
  async ({ userMailId, date }) => {
    const allGapRes = await getQuery(
      `${process.env.REACT_APP_BASE_URL}gap-track/getUserGapData?userMailId=${userMailId}&date=${date}`
    )
    return allGapRes?.data
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
