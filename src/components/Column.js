import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Task from "./Task"
import tasksSlice from "../redux/tasksSlice"
import axios from "axios"
import { BASE_URL } from "../contants"

function Column({ colIndex }) {
  const dispatch = useDispatch()

  const tasks = useSelector((state) => state.tasks.data)
  const col = tasks.filter((col, i) => col.status === colIndex.title)
  const handleOnDrop = (e) => {
    const { task, status } = JSON.parse(e.dataTransfer.getData("text"))
    if (colIndex.title !== status) {
      dispatch(tasksSlice.actions.setLoading(true))

      axios
        .patch(`${BASE_URL}/tasks/${task.id}`, { status: colIndex.title })
        .then((response) =>
          axios.get(`${BASE_URL}/tasks`).then((res) => {
            dispatch(tasksSlice.actions.getTasks(res.data))
            dispatch(tasksSlice.actions.setLoading(false))
          })
        )
    }
  }

  const handleOnDragOver = (e) => {
    e.preventDefault()
  }

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      className={`scrollbar-hide bg-cyan-100 p-2 rounded-xl min-w-[280px]  mx-4 mt-5 `}
    >
      <p className=" font-semibold flex justify-center items-center  gap-2 text-[#828fa3]">
        {colIndex.title}
      </p>

      {col?.map((task, index) => (
        <Task key={index} task={task} status={colIndex.title} />
      ))}
    </div>
  )
}

export default Column
