import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { EllipsisVertical, Plus } from "lucide-react";
import { generateId } from "@/lib/utils";
import TaskItem from "./TaskItem";

interface Props {
  title: string;
}

const ColumnItem = ({ title }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const createTask = () => {
    setTasks((prev) => [
      ...prev,
      {
        id: generateId(),
        title: `Task ${prev.length + 1}`,
      },
    ]);
  };

  return (
    <div className="w-[350px] max-h-full min-w-[350px] flex flex-col gap-4 bg-gray-100 border border-gray-400 p-4 rounded-lg">
      {/* Header */}
      <div className="w-full flex justify-between items-center p-2 border-b border-gray-400">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{title}</h3>
          <Badge
            variant="outline"
            className="rounded-full justify-center size-6 px-0.5 py-0.5"
          >
            {tasks.length}
          </Badge>
        </div>
        <Button size="icon" variant="ghost">
          <EllipsisVertical />
        </Button>
      </div>
      {/* Add Task Button */}
      <Button type="button" onClick={createTask}>
        <Plus />
        <span>Add Task</span>
      </Button>
      {/* Task List */}
      <div
        className=" flex flex-col gap-3 flex-1 overflow-y-auto pr-1 pb-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-blue-100 [&::-webkit-scrollbar-thumb]:bg-blue-300"
      >
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(ColumnItem);
