import { AlignJustify, Columns2, Grid2x2, Rows2 } from "lucide-react";
import KanbanBoard from "../components/KanbanBoard";
import { Button } from "@/components/ui/button";
import { JSX } from "react";
import { cn } from "@/lib/utils";
export default function Home() {
  type Button = {
    icon: JSX.Element;
    label: string;
    isActive?: boolean;
  };

  const buttons: Button[] = [
    {
      icon: <AlignJustify />,
      label: "List",
      isActive: true,
    },
    {
      icon: <Grid2x2 />,
      label: "Grid",
    },
    {
      icon: <Rows2 />,
      label: "Dynamic",
    },
    {
      icon: <Columns2 />,
      label: "Columns",
    },
  ];

  return (
    <div className="font-[family-name:var(--font-geist-sans)] p-4 bg-[#F9FBFC] min-h-screen h-screen overflow-hidden relative">
      <div className="size-full flex flex-col gap-4">
        <header className="w-full flex justify-between items-center">
          <h2>All Projects</h2>
          <div className="w-fit flex border rounded-full border-gray-400 divide-x divide-gray-400 overflow-hidden">
            {buttons.map((button, index) => (
              <Button
                variant={"ghost"}
                key={index}
                className={cn(
                  "flex items-center justify-center rounded-none",
                  button.isActive ? "bg-gray-100" : ""
                )}
              >
                {button.icon}
                {button.label}
              </Button>
            ))}
          </div>
        </header>
        <div className="w-full flex gap-4 overflow-x-auto overflow-y-hidden">
          <KanbanBoard />
        </div>
      </div>
    </div>
  );
}
