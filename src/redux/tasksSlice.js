import { createSlice } from "@reduxjs/toolkit"
const initialState = { data: [], loading: false }
const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    getTasks: (state, action) => {
      state.data = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export default tasksSlice
