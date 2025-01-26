import React from "react";
import TaskCard from "../specific/TaskCard";
const Column = ({ tasks, status ,handler}) => {
  return (
    <div>
      {tasks.map((task) => (
        status == task.status ? (
          <TaskCard
            key={task._id}
            _id={task._id}
            title={task.title}
            content={task.content}
            status={task.status}
            handler={handler}
          />
      ) : null 
      ))}
    </div>
  );
};

export default Column;
