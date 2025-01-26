import React from "react";

const Confirm = ({  onDelete, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        {/* Message */}
        <p className="text-gray-800 font-medium text-center mb-6">
          Are you sure you want to delete this item?
        </p>
        
        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 focus:ring-2 focus:ring-red-400 transition"
            onClick={onDelete}
          >
            Yes, Delete
          </button>
          <button
            className="px-6 py-2 bg-gray-100 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 transition"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
