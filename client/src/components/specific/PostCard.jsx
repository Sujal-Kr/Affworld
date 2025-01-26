import { Bookmark, Dot, Ellipsis, Heart, MessageCircle, Share2, User } from "lucide-react";
import React from "react";

const PostCard = ({ image, content, user }) => {
  return (
    <div className="rounded-2xl bg-white">
      <div className="flex p-3 items-center gap-5">
        <User
          className="bg-slate-50 p-2 rounded-full text-slate-600"
          size={40}
        />
        <div className="flex-1 text-gray-400 ">
          <h3 className="text-xs">{user?.name}</h3>
          <h5 className="text-xs">{user?.email}</h5>
        </div>
        <Ellipsis />
      </div>
      <div className="p-3">
        <p>{content}</p>
      </div>

      <img src={image?.url} alt="" className="w-full object-cover h-80" />
      <div className="flex p-3 text-slate-700">
        <div className="flex-1 flex gap-4">
          <div className="hover:text-red-500 flex items-center gap-2 ">
            <Heart />
            <span>{Math.floor(Math.random()* 1000)}</span>
          </div>
          <div className="hover:text-sky-500 flex items-center gap-2">
            <MessageCircle />
            <span>{Math.floor(Math.random() * 100)}</span>
          </div>
          <Share2 className="hover:text-green-400" />
        </div>
        <Bookmark className="hover:text-yellow-400" />
      </div>
    </div>
  );
};

export default PostCard;
