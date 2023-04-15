import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Home from "./components/Home"
import axios_init from "./utils/axios_init"
import tasksSlice from "./redux/tasksSlice"
import statusesSlices from "./redux/statusesSlices"

function App() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    setLoading(true)
    axios_init
      .get("/tasks")
      .then((res) => dispatch(tasksSlice.actions.getTasks(res)))
    axios_init
      .get("/statuses")
      .then((res) => dispatch(statusesSlices.actions.getStatuses(res)))
    setLoading(false)
  }
  if (loading) return
  return (
    <div className="overflow-hidden overflow-x-scroll">
      <Home />
    </div>
  )
}

export default App
