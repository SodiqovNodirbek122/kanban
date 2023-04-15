import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../contants"
const initialState = { data: [] }
const statusesSlices = createSlice({
  name: "statuses",
  initialState,
  reducers: {
    getStatuses: (state, action) => {
      state.data = action.payload
    },
  },
})

export default statusesSlices
