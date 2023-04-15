import { configureStore } from "@reduxjs/toolkit"
import tasksSlice from "./tasksSlice"
import statusesSlices from "./statusesSlices"

const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    statuses: statusesSlices.reducer,
  },
})

export default store
