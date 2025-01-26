import axios from "axios";
import { Image } from "lucide-react";
import React, { useState } from "react";


const Post = ({ onClose, onCreate }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file ? file.name : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const post = new FormData(e.target);
    post.append("file", selectedFile);
    
    e.target.reset();
    setSelectedFile(null);
    onCreate(post);
  };

  return (
    <div>
      <div className="fixed w-full h-full bg-black/30 left-0 top-0 grid place-content-center z-50">
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white rounded-lg flex flex-col gap-6 w-full max-w-lg shadow-lg"
        >
          <h2 className="text-xl font-semibold text-gray-800">Create Post</h2>

          {/* File Upload */}
          <div className="rounded-lg flex gap-2 px-3 py-2 items-center border-2 border-gray-300 focus-within:border-indigo-500">
            <label htmlFor="file" className="flex gap-2 cursor-pointer">
              <Image className="text-gray-500" />
              {selectedFile || "Upload"}
            </label>
            <input
              id="file"
              type="file"
              accept="image/jpeg"
              name="file"
              className="hidden"
              onChange={handleFileChange} // Handle file selection
              required
            />
          </div>

          {/* Text Area for Content */}
          <textarea
            name="content"
            className="resize-none h-40 rounded-lg border-2 border-gray-300 p-3 text-gray-800 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Enter post content"
            required
          ></textarea>

          {/* Buttons */}
          <div className="flex gap-4 justify-end">
            <button
              type="submit"
              className="text-white bg-indigo-500 px-6 py-2 rounded-lg shadow-md hover:bg-indigo-600 transition"
            >
              Post
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
    </div>
  );
};

export default Post;
