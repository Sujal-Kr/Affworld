import axios from "axios";
import { Activity, LogOut } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { userNotExists } from "../../redux/slices/auth";
import { links } from "../../constants/data";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  if (["/login", "/signup", "/resetpassword"].includes(pathname)) {
    return null;
  }
  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${server}/api/users/logout`, {
        withCredentials: true,
      });
      if (data.success) {
        toast.success("user logged out successfully");
        dispatch(userNotExists());
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex px-3 md:px-8 py-4 justify-between items-center">
      <Link to='/' className=" flex gap-2 font-semibold">
        <Activity />
        <span>Action Board</span>
      </Link>
      <div className="nav-list flex  md:gap-8 gap-3">
        {links?.map(({ url, title, icon: Icon }) => (
          <Link to={url} className="flex gap-3 ">
            {<Icon />}
            {title}
          </Link>
        ))}
      </div>
      {!user ? (
        <Link
          to="/login"
          className="px-8 py-2 rounded-2xl shadow-xl bg-indigo-500 text-white"
        >
          Login
        </Link>
      ) : (
        <div className="flex gap-3 items-center">
          <span className="font-semibold text-sm text-gray-400">
            {user?.name}
          </span>
          <LogOut size={16} onClick={handleLogout} />
        </div>
      )}
    </div>
  );
};

export default Header;
