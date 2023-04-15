import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ElipsisMenu from "../ElipsisMenu"
import elipsis from "../../assets/icon-vertical-ellipsis.svg"
import AddEditTaskModal from "./AddEditTaskModal"
import axios from "axios"
import { BASE_URL } from "../../contants"
import tasksSlice from "../../redux/tasksSlice"
import Loading from "../icons/Loading"

function TaskModal({ task, setIsTaskModalOpen }) {
  const dispatch = useDispatch()
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const columns = useSelector((state) => state.statuses.data)

  const [status, setStatus] = useState(task.status)
  const onChange = (e) => {
    setStatus(e.target.value)
    setLoading(true)

    axios
      .patch(`${BASE_URL}/tasks/${task.id}`, { status: e.target.value })
      .then((response) =>
        axios.get(`${BASE_URL}/tasks`).then((res) => {
          dispatch(tasksSlice.actions.getTasks(res.data))
          setLoading(false)
        })
      )
  }

  const onClose = (e) => {
    if (e.target !== e.currentTarget) {
      return
    }

    setIsTaskModalOpen(false)
  }

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)

  const setOpenEditModal = () => {
    setIsAddTaskModalOpen(true)
    setIsElipsisMenuOpen(false)
  }

  const setOpenDeleteModal = () => {
    setLoading(true)
    axios.delete(`${BASE_URL}/tasks/${task.id}`).then((response) =>
      axios.get(`${BASE_URL}/tasks`).then((res) => {
        dispatch(tasksSlice.actions.getTasks(res.data))
        setLoading(false)
        setIsTaskModalOpen(false)
      })
    )
  }
  // return null
  return (
    <div
      onClick={onClose}
      className={` fixed right-0 top-0 px-2 py-4 overflow-scroll scrollbar-hide  z-50 left-0 bottom-0 justify-center items-center flex dropdown `}
    >
      <div className=" scrollbar-hide overflow-y-scroll max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl">
        <div className=" relative flex   justify-between w-full items-center">
          <h1 className=" text-lg">{task.title}</h1>
          {loading && <Loading color={"#635fc7"} />}
          <img
            onClick={() => {
              setIsElipsisMenuOpen((prevState) => !prevState)
            }}
            src={elipsis}
            alt="elipsis"
            className=" cursor-pointer h-6"
          />
          {isElipsisMenuOpen && (
            <ElipsisMenu
              setOpenEditModal={setOpenEditModal}
              setOpenDeleteModal={setOpenDeleteModal}
              type="Task"
            />
          )}
        </div>
        <p className=" text-gray-500 font-[600] tracking-wide text-xs pt-4">
          {task.description}
        </p>
        <div className="mt-4 flex flex-col space-y-3">
          <label className="  text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            className=" select-icon flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
            defaultValue={status}
            onChange={onChange}
          >
            {columns.map((col, index) => (
              <option key={col?.title}>{col?.title}</option>
            ))}
          </select>
        </div>
      </div>

      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          task={task}
          type="edit"
        />
      )}
    </div>
  )
}

export default TaskModal
