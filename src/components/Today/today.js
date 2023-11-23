import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import "../Today/today.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Implement from "../Calendar/implement";

const Today = () => {
  const { id } = useParams();

  useEffect(() => {
    const dotElements = document.querySelectorAll(".dot");
    dotElements.forEach((dot) => {
      const nValue = dot.getAttribute("data-n");
      dot.setAttribute("data-content", nValue + "_____");
    });
    console.log("present");

    const lineElements = document.querySelectorAll(".line");

    lineElements.forEach((line) => {
      const nValue = line.getAttribute("data-n");

      line.setAttribute("data-content", nValue);
    });
  }, []);

  const [sortedArr, setSortedArr] = useState([]);

  useEffect(() => {
    axios
      .get("https://bend1.onrender.com/studentRoute/update-student/" + id)
      .then((res) => {
        if (res.status === 200) {
          const today = new Date().toDateString();
          const tasksForToday = res.data.task.filter(
            (task) => task.TaskDate === today
          );

          // Sort the array by task time
          const sortedTasks = tasksForToday
            .filter(
              (task) => task.TaskTime !== undefined && task.TaskTime !== null
            ) // Filter out tasks without valid taskTime
            .sort((a, b) => {
              // Convert taskTime to strings before comparison
              const timeA = String(a.TaskTime);
              const timeB = String(b.TaskTime);

              return timeA.localeCompare(timeB);
            });

          setSortedArr(sortedTasks);
          console.log(res.data.task);
        } else {
          console.error("Failed to fetch tasks:", res.status);
        }
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  }, [id]);

  const navigate = useNavigate();

  const handleDeleteTask = (taskId) => {
    axios
      .delete(
        "https://bend1.onrender.com/studentRoute/delete-task/" +
          id +
          "/" +
          taskId
      )
      .then((res) => {
        if (res.status === 200) {
          // Update the sortedArr state after deleting the task
          setSortedArr((prevArr) =>
            prevArr.filter((task) => task._id !== taskId)
          );
          window.location.reload();
        } else {
          Promise.reject();
        }
      })
      .catch((err) => alert(err));
  };

  const handleEditTask = (taskId) => {
    navigate("/home/" + id + "/" + taskId);

    document.getElementById("implement").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="containers" id="today">
      <h1 className="todayText">Today</h1>
      {sortedArr.map((task, index) => (
        <React.Fragment key={index}>
          <div className="dot" data-n={""}>
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
              onClick={() => {
                handleEditTask(task.taskId);
              }}
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
