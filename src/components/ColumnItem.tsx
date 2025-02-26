import React, { memo, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Plus, Trash2 } from "lucide-react";
import { generateId } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TasksList from "./TasksList";

interface Props {
  column: Column;
  removeColumn: (id: string) => void;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  createTask: () => void;
}

const ColumnItem = ({
  column,
  removeColumn,
  tasks,
  setTasks,
  createTask,
}: Props) => {
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

  // using CSS.Translate to prevent size stretched when dragging
  // using CSS.Transform will have a good animation effect but the size will be stretched
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`w-[350px] min-w-[350px] h-full border-2 border-blue-400 bg-blue-100 rounded-lg antialiased`}
      ></div>
    );
  }

  const DeleteButton = memo(() => {
    return (
      <Button
        type="button"
        onClick={() => removeColumn(column.id)}
        size="icon"
        variant="destructive"
      >
        <Trash2 />
      </Button>
    );
  });

  const BadgeTotal = memo(() => {
    return (
      <Badge
        variant="outline"
        className="rounded-full justify-center size-6 px-0.5 py-0.5"
      >
        0
      </Badge>
    );
  });

  return (
    <div
      id="column"
      ref={setNodeRef}
      style={style}
      className="w-[350px] max-h-full min-w-[350px] flex flex-col gap-4 bg-gray-100 border border-gray-400 rounded-lg overflow-x-hidden relative"
    >
      {/* Header */}
      <div
        {...attributes}
        {...listeners}
        className="w-full bg-gray-100 flex justify-between items-center border-b border-gray-400 p-4"
      >
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{column?.title}</h3>
          <BadgeTotal />
        </div>
        <DeleteButton />
      </div>
      {/* Task List */}
      <TasksList tasks={tasks} createTask={createTask} />
    </div>
  );
};

export default React.memo(ColumnItem);
