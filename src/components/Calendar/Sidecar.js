import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Sidecar = () => {
  const [sortedArr, setSortedArr] = useState([]);
  const { id } = useParams();
  const targetDate = "2023-11-29"; // Change this to the desired date

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4005/studentRoute/update-student/" + id
        );

        if (res.status === 200) {
          // Filter tasks for the target date
          const tasksForTargetDate = res.data.task.filter(
            (task) => task.TaskTime === targetDate
          );

          // Sort tasks based on time
          const sortedTasks = tasksForTargetDate.sort((a, b) =>
            a.TaskTime.localeCompare(b.TaskTime)
          );

          setSortedArr(sortedTasks);
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please check the console for details.");
      }
    };

    fetchData();
  }, [id, targetDate]);

  return (
    <div className="sideCar">
      {sortedArr.map((task, index) => (
        <React.Fragment key={index}>
          <Link className="dotH"></Link>
          <div className="lineH"></div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Sidecar;
