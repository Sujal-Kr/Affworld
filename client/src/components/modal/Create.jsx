import { Text, User } from "lucide-react";
import React from "react";

const Create = ({ onCreate, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault(); 
    const formdata = new FormData(e.target);
    const task = {
      title: formdata.get("title"),
      content: formdata.get("content"),
    };
    e.target.reset();
    onCreate(task);
  };

  return (
    <div className="fixed w-full h-full bg-black/30 left-0 top-0 grid place-content-center z-50">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-lg flex flex-col gap-6 w-full max-w-lg shadow-lg"
      >
        <h2 className="text-xl font-semibold text-gray-800">Create Task</h2>

        
        <div className="rounded-lg flex gap-2 px-3 items-center border-2 border-gray-300 focus-within:border-indigo-500">
          <Text className="text-gray-500" />
          <input
            type="text"
            name="title"
            className="outline-none p-2 w-full text-gray-800"
            placeholder="Enter task title"
            required
          />
        </div>

        <textarea
          name="content"
          className="resize-none h-40 rounded-lg border-2 border-gray-300 p-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Enter task description"
          required
        ></textarea>

        <div className="flex gap-4 justify-end">
          <button
            type="submit"
            className="text-white bg-indigo-500 px-6 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition"
          >
            Create
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-indigo-500 bg-gray-100 px-6 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
