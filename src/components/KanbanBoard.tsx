"use client";
import React, { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import ColumnItem from "./ColumnItem";
import { generateId } from "@/lib/utils";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [dragColumn, setDragColumn] = useState<Column | null>(null);

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
  const columnIds = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  const removeColumn = (id: string) => {
    setColumns((prev) => prev.filter((column) => column.id !== id));
  };

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setDragColumn(event.active.data.current.column);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeColumnIndex = columns.findIndex(
      (column) => column.id === activeId
    );
    const overColumnIndex = columns.findIndex((column) => column.id === overId);
    let newColumns = [...columns];
    newColumns = arrayMove(newColumns, activeColumnIndex, overColumnIndex);
    setColumns(newColumns);
  }

  return (
    <div className="w-full h-full flex justify-start items-start gap-4 overflow-x-auto overflow-y-hidden">
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <SortableContext items={columnIds}>
          {columns.map((column, _) => (
            <ColumnItem
							//you need to specify the key to match with the items you pass to the SortableContext
							//very important point to not break the animation
              key={column.id}
              column={column}
              removeColumn={removeColumn}
            />
          ))}
        </SortableContext>
        <Button
          onClick={createColumn}
          type="button"
          className="w-[350px] min-w-[350px]"
        >
          <Plus />
          <span>Add Column</span>
        </Button>
        {typeof window === "object" &&
          createPortal(
            <DragOverlay>
              {dragColumn && (
                <ColumnItem column={dragColumn} removeColumn={removeColumn} />
              )}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </div>
  );
};
export default KanbanBoard;
