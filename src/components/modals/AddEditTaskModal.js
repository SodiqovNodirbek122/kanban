import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { BASE_URL } from "../../contants"
import tasksSlice from "../../redux/tasksSlice"
import Loading from "../icons/Loading"

function AddEditTaskModal({ type, setIsAddTaskModalOpen, task }) {
  const dispatch = useDispatch()
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState("")
  const [description, setDescription] = useState("")

  const columns = useSelector((state) => state.statuses.data)

  const [status, setStatus] = useState("")

  const onChangeStatus = (e) => {
    setStatus(e.target.value)
  }

  if (type === "edit" && isFirstLoad) {
    setTitle(task.title)
    setStatus(task.status)
    setDescription(task.description)
    setIsFirstLoad(false)
  }

  const onSubmit = (type) => {
    const data = { title, description, status }
    if (type === "edit") {
      setLoading(true)
      axios.put(`${BASE_URL}/tasks/${task.id}`, data).then((response) =>
        axios.get(`${BASE_URL}/tasks`).then((res) => {
          dispatch(tasksSlice.actions.getTasks(res.data))
          setLoading(false)
          setIsAddTaskModalOpen(false)
        })
      )
    } else {
      // console.log(data)
      setLoading(true)
      axios.post(`${BASE_URL}/tasks`, data).then((response) =>
        axios.get(`${BASE_URL}/tasks`).then((res) => {
          dispatch(tasksSlice.actions.getTasks(res.data))
          setLoading(false)
          setIsAddTaskModalOpen(false)
        })
      )
    }
  }

  return (
    <div
      className={` py-6 px-6 absolute overflow-y-scroll  left-0 flex  right-0 bottom-0 top-0 dropdown `}
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return
        }
        setIsAddTaskModalOpen(false)
      }}
    >
      {/* Modal Section */}

      <div
        className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl"
      >
        <h3 className=" text-lg ">
          {type === "edit" ? "Edit" : "Add New"} Task
        </h3>

        {/* Task Name */}

        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Task Name
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            className=" bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0  "
            placeholder=" e.g Take coffee break"
          />
        </div>

        {/* Description */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="  text-sm dark:text-white text-gray-500">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="task-description-input"
            className=" bg-transparent outline-none min-h-[200px] focus:border-0 px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px] "
            placeholder="e.g. It's always good to take a break. This 
            15 minute break will  recharge the batteries 
            a little."
          />
        </div>

        {/* current Status  */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            value={status}
            onChange={onChangeStatus}
            className=" select-icon flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
          >
            {columns.map((column, index) => (
              <option key={index}>{column.title}</option>
            ))}
          </select>
          <button
            onClick={() => {
              onSubmit(type)
            }}
            className=" w-full flex items-center justify-center gap-2 flex-row text-white bg-[#635fc7] py-2 rounded-full "
          >
            {loading && <Loading />}
            <span>{type === "edit" ? " save edit" : "Create task"}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddEditTaskModal
