import React from "react";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MessageCircleMore, Paperclip } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  task: Task;
}

const TaskItem = ({ task }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
    transition,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task: task,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <li
        style={style}
        ref={setNodeRef}
        className="list-none w-full rounded-md min-h-[147px] h-[147px] border-2 border-blue-400 bg-blue-100 relative"
      ></li>
    );
  }

  return (
    <li
      {...attributes}
      {...listeners}
      style={style}
      ref={setNodeRef}
      className="list-none p-2 w-full h-[147px] bg-white rounded-md shadow"
    >
      <div className="w-full flex justify-between items-center">
        <h4 className="font-semibold">{task.title}</h4>
      </div>
      <div className="w-full flex flex-wrap gap-1 mb-2">
        {["Ongoing", "Completed", "Pending"].map((status) => (
          <Badge key={status}>{status}</Badge>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">Task Description</p>
      <Separator className="my-2" />
      <div className="w-full flex justify-between items-center">
        <div className="relative w-full flex -space-x-4 overflow-hidden">
          {Array.from({ length: 3 }).map((_, index) => (
            <Avatar key={index} className="">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ))}
          <Avatar className="">
            <AvatarImage src="https://github.com/" />
            <AvatarFallback>+2</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full flex justify-end items-center">
          <div className="flex items-center text-muted-foreground gap-1">
            <Paperclip className="size-4" />
            <span className="text-sm">2</span>
            <MessageCircleMore className="size-4" />
            <span className="text-sm">6</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default React.memo(TaskItem);
