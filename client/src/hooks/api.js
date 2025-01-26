import axios from "axios";
import { server } from "../constants/config";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${server}/api/tasks`, {
          withCredentials: true,
        });

        if (data.success) {
          setTasks(data.tasks);
        }
      } catch (err) {
        toast.err(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);
  return { tasks, setTasks, loading };
};

const useFeed = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getFeed = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${server}/api/feed`, {
          withCredentials: true,
        });
        
        if (data.success) {
          setData(data.feed);
        }
      } catch (err) {
        toast.error(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    getFeed();
  }, []);
  return { data, setData, loading };
};
export { useTasks, useFeed };
