import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useMemo } from "react";
import TaskItem from "./TaskItem";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  tasks: Task[];
  createTask: () => void;
}

const TasksList = ({ tasks, createTask }: Props) => {
  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  return (
    <div className="w-full flex flex-col gap-4 px-4 py-2">
      <Button type="button" onClick={createTask}>
        <Plus />
        <span>Add Task</span>
      </Button>
      <ol className="list-none flex flex-col gap-3 flex-1 overflow-y-auto pr-1 pb-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-blue-100 [&::-webkit-scrollbar-thumb]:bg-blue-300">
        <SortableContext
          items={tasksIds}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </SortableContext>
      </ol>
    </div>
  );
};

export default React.memo(TasksList);
