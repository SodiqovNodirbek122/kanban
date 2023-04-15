import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Column from "./Column"
import AddEditTaskModal from "./modals/AddEditTaskModal"

function Home() {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)

  const loading = useSelector((state) => state.tasks.loading)
  const columns = useSelector((state) => state.statuses.data)
  return (
    <div
      className={`scrollbar-hide h-screen flex overflow-x-scroll gap-6 ${
        loading && "animate-pulse"
      }`}
    >
      {columns.map((col, index) => (
        <Column key={index} colIndex={col} />
      ))}
      <div
        onClick={() => {
          setIsAddTaskModalOpen(true)
        }}
        className=" flex justify-center items-center font-bold text-2xl hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] mb-2   mx-5 pt-[20px] min-w-[280px] mt-5 text-[#828FA3] rounded-lg "
      >
        + New Task
      </div>
      {isAddTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          type="create"
        />
      )}
    </div>
  )
}

export default Home
