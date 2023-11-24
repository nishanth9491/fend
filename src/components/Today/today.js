import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Implement from "../Calendar/implement";
import "../Today/today.css";

const Today = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortedArr, setSortedArr] = useState([]);
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    console.log(currentTime);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://bend1.onrender.com/studentRoute/update-student/${id}`
        );
        if (res.status === 200) {
          const today = new Date().toDateString();
          const tasksForToday = res.data.task.filter(
            (task) => task.TaskDate === today
          );

          const sortedTasks = tasksForToday
            .filter((task) => task.TaskTime != null)
            .sort((a, b) =>
              String(a.TaskTime).localeCompare(String(b.TaskTime))
            );

          setSortedArr(sortedTasks);
          setLoading(false);
        } else {
          setError(`Failed to fetch tasks: ${res.status}`);
          setLoading(false);
        }
      } catch (err) {
        setError(`Error fetching tasks: ${err.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDeleteTask = async (taskId) => {
    try {
      const res = await axios.delete(
        `https://bend1.onrender.com/studentRoute/delete-task/${id}/${taskId}`
      );
      if (res.status === 200) {
        setSortedArr((prevArr) =>
          prevArr.filter((task) => task._id !== taskId)
        );
      } else {
        setError(`Failed to delete task: ${res.status}`);
      }
    } catch (err) {
      setError(`Error deleting task: ${err.message}`);
    }
  };

  const handleEditTask = (taskId) => {
    navigate(`/home/${id}/${taskId}`);
    document.getElementById("implement").scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="containers" id="today">
      <h1 className="todayText">Today</h1>
      {sortedArr.map((task, index) => (
        <React.Fragment key={index}>
          <div
            className={`dot ${currentTime > task.TaskTime ? "late" : ""}`}
            data-n={""}
          >
            <div className="innerdi">{task.TaskTime}</div>
          </div>
          <div className="line" data-n={""}>
            <div className="innerdiv">
              {task.TaskName} {task.TaskDuration}mins..
            </div>
            <button
              className="btn-delt"
              onClick={() => handleDeleteTask(task.taskId)}
            >
              Delete
            </button>
            <button
              className="btn-edit"
              onClick={() => handleEditTask(task.taskId)}
            >
              Edit
            </button>
          </div>
        </React.Fragment>
      ))}
      <div className="dot" data-n={""}>
        <div className="innerdi"></div>
      </div>
    </div>
  );
};

export default Today;
