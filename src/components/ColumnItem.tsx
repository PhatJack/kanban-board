import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { EllipsisVertical, Plus, Trash2 } from "lucide-react";
import { generateId } from "@/lib/utils";
import TaskItem from "./TaskItem";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  column: Column;
  removeColumn: (id: string) => void;
}

const ColumnItem = ({ column, removeColumn }: Props) => {
  // const [tasks, setTasks] = useState<Task[]>([]);

  // const createTask = () => {
  //   setTasks((prev) => [
  //     ...prev,
  //     {
  //       id: generateId(),
  //       title: `${column?.title} Task ${prev.length + 1}`,
  //     },
  //   ]);
  // };

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column: column,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-[350px] h-[500px] border-2 border-blue-400 bg-blue-100 rounded-lg"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-[350px] max-h-full h-[500px] min-w-[350px] flex flex-col gap-4 bg-gray-100 border border-gray-400 p-4 rounded-lg"
    >
      {/* Header */}
      <div
        {...attributes}
        {...listeners}
        className="w-full flex justify-between items-center p-2 border-b border-gray-400"
      >
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{column?.title}</h3>
          {/* <Badge
            variant="outline"
            className="rounded-full justify-center size-6 px-0.5 py-0.5"
          >
            {tasks.length}
          </Badge> */}
        </div>
        <Button
          type="button"
          onClick={() => removeColumn(column.id)}
          size="icon"
          variant="destructive"
        >
          <Trash2 />
        </Button>
      </div>
      {/* Add Task Button */}
      {/* <Button type="button" onClick={createTask}>
        <Plus />
        <span>Add Task</span>
      </Button> */}
      {/* Task List */}
      {/* <div className=" flex flex-col gap-3 flex-1 overflow-y-auto pr-1 pb-1 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-blue-100 [&::-webkit-scrollbar-thumb]:bg-blue-300">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div> */}
    </div>
  );
};

export default React.memo(ColumnItem);
