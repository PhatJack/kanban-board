import React from "react";

interface Props {
  task: Task;
}

const TaskItem = ({ task }: Props) => {
  return (
    <div className="p-2 w-full h-fit bg-white rounded-md shadow">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-500">Task Description</p>
    </div>
  );
};

export default React.memo(TaskItem);
