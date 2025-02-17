"use client";
import React, { useMemo, useState, useCallback } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import ColumnItem from "./ColumnItem";
import { generateId } from "@/lib/utils";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskItem from "./TaskItem";
import { nanoid } from "nanoid";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dragColumn, setDragColumn] = useState<Column | null>(null);
  const [dragTask, setDragTask] = useState<Task | null>(null);

  // Memoized column IDs
  const columnIds = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  // Memoized sensors
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Create a new column
  const createColumn = useCallback(() => {
    setColumns((prev) => [
      ...prev,
      {
        id: generateId(),
        title: `Column ${prev.length + 1}`,
        tasks: [],
      },
    ]);
  }, []);

  // Create a new task in a specific column
  const createTask = useCallback(
    (columnId: string, columnTitle: string) => {
      const taskCount = tasks.filter(
        (task) => task.columnId === columnId
      ).length;
      const newTask = {
        id: nanoid(),
        title: `${columnTitle} Task ${taskCount + 1}`,
        columnId: columnId,
      };
      setTasks((prev) => [...prev, newTask]);
    },
    [tasks]
  );

  // Remove a column
  const removeColumn = useCallback((id: string) => {
    setColumns((prev) => prev.filter((column) => column.id !== id));
    const newTasks = tasks.filter((task) => task.columnId !== id);
    setTasks(newTasks);
  }, []);

  // Handle drag start
  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setDragColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setDragTask(event.active.data.current.task);
      return;
    }
  };

  // Handle drag end
  const onDragEnd = (event: DragEndEvent) => {
    setDragColumn(null);
    setDragTask(null);
    console.log(dragTask);
    console.log(dragColumn);
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setColumns((prev) => {
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeId
      );
      const overColumnIndex = columns.findIndex(
        (column) => column.id === overId
      );
      return arrayMove(prev, activeColumnIndex, overColumnIndex);
    });
  };

  // Handle drag over
  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";

    // Handle dragging a task over another task
    if (isActiveTask && isOverTask) {
      setTasks((prev) => {
        const activeTaskIndex = prev.findIndex((task) => task.id === activeId);
        const overTaskIndex = prev.findIndex((task) => task.id === overId);

        if (prev[activeTaskIndex].columnId !== prev[overTaskIndex].columnId) {
          prev[activeTaskIndex].columnId = prev[overTaskIndex].columnId;
        }
        return arrayMove(prev, activeTaskIndex, overTaskIndex);
      });
    }

    // Handle dragging a task over a column
    const isOverColumn = over.data.current?.type === "Column";
    if (isActiveTask && isOverColumn) {
      setTasks((prev) => {
        const activeTaskIndex = prev.findIndex((task) => task.id === activeId);
        prev[activeTaskIndex].columnId = String(overId);
        return arrayMove(prev, activeTaskIndex, activeTaskIndex);
      });
    }
  };
  return (
    <div className="w-full h-full flex justify-start items-start gap-4 overflow-x-auto overflow-y-hidden">
      <DndContext
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        sensors={sensors}
      >
        <SortableContext items={columnIds}>
          {columns.map((column) => (
            <ColumnItem
              key={column.id}
              column={column}
              removeColumn={removeColumn}
              tasks={tasks.filter((task) => task.columnId === column.id)}
              setTasks={setTasks}
              createTask={() => createTask(column.id, column.title)}
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
                <ColumnItem
                  column={dragColumn}
                  removeColumn={removeColumn}
                  tasks={tasks.filter(
                    (task) => task.columnId === dragColumn.id
                  )}
                  setTasks={setTasks}
                  createTask={() => createTask(dragColumn.id, dragColumn.title)}
                />
              )}
              {dragTask && <TaskItem task={dragTask} />}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </div>
  );
};
export default React.memo(KanbanBoard);
