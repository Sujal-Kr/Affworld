import React, { useState } from "react";
import { useTasks } from "../hooks/api";
import TaskCard from "../components/specific/TaskCard";
import Confirm from "../components/modal/Confirm";
import axios from "axios";
import { server } from "../constants/config";
import Create from "../components/modal/Create";
import toast from "react-hot-toast";

const Tasks = () => {
  const { tasks, setTasks, loading } = useTasks();
  const [isDelete, setIsDelete] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [currId, setCurrId] = useState(-1);

  const handleOpenDeleteDailog = (_id) => {
    setCurrId(_id);
    setIsDelete(true);
  };

  const handleCloseDeleteDailog = () => {
    setIsDelete(false);
  };

  const handleDeleteTask = async () => {
    try {
      const { data } = await axios.delete(`${server}/api/tasks/${currId}`, {
        withCredentials: true,
      });
      setTasks((prev) => prev.filter((task) => task._id !== currId));
      if (data.success) {
        toast.success(data.message);
        handleCloseDeleteDailog();
      }
    } catch (err) {
      toast.error("Failed to delete task.");
    }
  };

  const handleCreateTask = async (task) => {
    try {
      const { data } = await axios.post(`${server}/api/tasks/`, task, {
        withCredentials: true,
      });
      if (data.success) {
        setTasks((prev) => [...prev, data.task]);
        toast.success(data.message);
        setIsCreate(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDropTask = async (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");

    try {
      const { data } = await axios.patch(
        `${server}/api/tasks/${taskId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      if (data.success) {
        setTasks((prev) =>
          prev.map((task) =>
            task._id === taskId ? { ...task, status: newStatus } : task
          )
        );
        toast.success(`Task moved to ${newStatus}`);
      }
    } catch (err) {
      toast.error("Failed to update task status.");
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-10 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center pb-6">
        <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
        <button
          className="text-white bg-indigo-500 px-6 py-2 rounded-lg shadow hover:bg-indigo-600 transition"
          onClick={() => setIsCreate(true)}
        >
          + New Task
        </button>
      </div>

      <hr className="mb-8 border-gray-200" />

      {/* Task Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {["Pending", "Completed", "Done"].map((status) => (
          <div
            key={status}
            className="flex flex-col gap-3 bg-gray-100 p-4 rounded-lg "
            onDrop={(e) => handleDropTask(e, status)}
            onDragOver={allowDrop}
          >
            <h2 className="text-lg font-semibold text-gray-700">{status}</h2>
            {tasks
              .filter((task) => task.status === status)
              .map(({ _id, title, content }) => (
                <div
                  key={_id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, _id)}
                >
                  <TaskCard
                    key={_id}
                    title={title}
                    content={content}
                    status={status}
                    handler={handleOpenDeleteDailog}
                  />
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {isDelete && (
        <Confirm
          onDelete={handleDeleteTask}
          onCancel={handleCloseDeleteDailog}
        />
      )}

      {/* Create Task Modal */}
      {isCreate && (
        <Create
          onCreate={handleCreateTask}
          onClose={() => setIsCreate(false)}
        />
      )}
    </div>
  );
};

export default Tasks;
