import { Image, User } from "lucide-react";
import React, { useState } from "react";
import { useFeed } from "../hooks/api";
import PostCard from "../components/specific/PostCard";
import Post from "../components/modal/Post";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../constants/config";
import { useSelector } from "react-redux";

const Feed = () => {
  const { data, setData, loading } = useFeed();
  const [isPost, setIsPost] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleCreatePost = async (post) => {
    const id = toast.loading("Loading...");
    try {
      const { data } = await axios.post(`${server}/api/feed`, post, {
        withCredentials: true,
      });
      if (data.success) {
        toast.success("Posted", { id });
        setData((prev) => [{ ...data.post, user: { ...user } }, ...prev]);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message, { id });
    } finally {
      setIsPost(false);
    }
  };

  return (
    <div className="  flex justify-center bg-slate-50">
      <div className="w-full max-w-xl  my-4 ">
        <div className="flex gap-3 py-5 px-3 items-center bg-white rounded-2xl ">
          <User
            className="bg-slate-50 p-2 rounded-full text-slate-600"
            size={40}
          />
          <input
            type="text"
            placeholder="Whats on your mind?"
            className="flex-1 rounded-2xl bg-slate-50 p-2 outline-indigo-400"
          />
          <Image className="cursor-pointer" onClick={() => setIsPost(true)} />
        </div>
        <div className="flex flex-col gap-8 py-10">
          {loading ? (
            <div>Loading Feed</div>
          ) : data.length ? (
            data?.map(({ _id, content, image, user }) => (
              <PostCard key={_id} content={content} image={image} user={user} />
            ))
          ) : (
            <div className="text-center py-10 text-xs text-gray-500 font-semibold">
              No Feed to show
            </div>
          )}
        </div>
      </div>
      {isPost && (
        <Post onCreate={handleCreatePost} onClose={() => setIsPost(false)} />
      )}
    </div>
  );
};

export default Feed;
