"use client"
import { DndContext } from "@dnd-kit/core";
import React from "react";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <DndContext>{children}</DndContext>
    </>
  );
};

export default MainLayout;
