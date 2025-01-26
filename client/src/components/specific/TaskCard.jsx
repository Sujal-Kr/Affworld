import { Trash } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const TaskCard = ({ _id, title, status, content, handler }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div draggable className="cursor-pointer rounded-lg shadow-md p-6 w-full flex flex-col gap-4 bg-white hover:shadow-xl transition duration-300">
      {/* Status Badge */}
      <div
        className={`px-3 py-1 rounded-full text-sm font-medium self-start ${
          status === "Pending"
            ? "text-yellow-600 bg-yellow-100"
            : "text-green-600 bg-green-100"
        }`}
      >
        {status}
      </div>

      {/* Title and Content */}
      <div className="flex flex-col gap-2">
        <h5 className="text-lg font-semibold text-gray-800">{title}</h5>
        <p className="text-sm text-gray-600">{content}</p>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-500">~ {user?.name || "Unknown"}</span>
        <button
          onClick={() => handler(_id)}
          className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white transition duration-200"
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
