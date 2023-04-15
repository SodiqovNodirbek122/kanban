import React, { useState } from "react"
import { useSelector } from "react-redux"
import TaskModal from "./modals/TaskModal"

function Task({ task, status }) {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)

  const handleOnDrag = (e) => {
    e.dataTransfer.setData("text", JSON.stringify({ task, status }))
  }
  return (
    <div>
      <div
        onClick={() => {
          setIsTaskModalOpen(true)
        }}
        draggable
        onDragStart={handleOnDrag}
        className="w-full first:my-5 rounded-lg bg-white   shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-[#635fc7] dark:text-white  cursor-pointer"
      >
        <p className=" font-bold tracking-wide ">{task.title}</p>
      </div>
      {isTaskModalOpen && (
        <TaskModal task={task} setIsTaskModalOpen={setIsTaskModalOpen} />
      )}
    </div>
  )
}

export default Task
