"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import ColumnItem from "./ColumnItem";
import { generateId } from "@/lib/utils";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);

  const createColumn = () => {
    setColumns((prev) => [
      ...prev,
      {
        id: generateId(),
        title: `Column ${prev.length + 1}`,
        tasks: [],
      },
    ]);
  };

  const removeColumn = (id: string) => {
    setColumns((prev) => prev.filter((column) => column.id !== id));
  };

  return (
    <div className="w-full h-full flex justify-start items-start gap-4 overflow-x-auto overflow-y-hidden">
      {columns.map((column, index) => (
        <ColumnItem key={index} {...column} removeColumn={removeColumn} />
      ))}
      <Button
        onClick={createColumn}
        type="button"
        className="w-[350px] min-w-[350px]"
      >
        <Plus />
        <span>Add Column</span>
      </Button>
    </div>
  );
};
export default KanbanBoard;
