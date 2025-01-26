import React, { lazy, Suspense, useEffect } from "react";
import { RouteLoader } from "./components/loader/Loading";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectRoute from "./components/auth/ProtectRoute";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "./constants/config";
import { userExists, userNotExists } from "./redux/slices/auth";
import Header from "./components/layout/Header";


const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Feed = lazy(() => import("./pages/Feed"));
const Tasks = lazy(() => import("./pages/Tasks"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

const App = () => {
  const { user, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
   

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(`${server}/api/users/me`, {
          withCredentials: true,
        });
        
        if (data.success) {
          dispatch(userExists(data.user));
        }
      } catch (err) {
        dispatch(userNotExists());
      }
    };
    getMyProfile();
  }, [dispatch ]);

  if (loader) {
    return <RouteLoader />;
  }
  return (
    <Suspense fallback={<RouteLoader />}>
      <Toaster />
      <Header/>
      <Routes>

        <Route element={<ProtectRoute user={user} redirect="/login"/>}>
          <Route path="/task" element={<Tasks />} />
          <Route path="/" element={<Feed />} />
          
        </Route>

        <Route element={<ProtectRoute user={!user} redirect="/"/>}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Route>

      </Routes>
    </Suspense>
  );
};

export default App;
