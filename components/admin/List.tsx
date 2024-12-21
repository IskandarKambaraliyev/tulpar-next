"use client";

import { useEffect, useState, useRef } from "react";
import { usePreview } from "@/context/PreviewContext";

import {
  DropResult,
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import { Grip, Square, SquareCheck, SquareDot } from "lucide-react";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Button from "../Button";

type Props = {
  data: ({
    id: string;
  } & Partial<{
    slug: string;
    title: string;
    image: string;
    order: number;
  }>)[];
  deleteLink: string;
  previewLink: string;
  updateLink: string;
  childLink: string;
  addLink: string;
};

const List = ({
  data,
  deleteLink,
  previewLink,
  updateLink,
  childLink,
  addLink,
}: Props) => {
  return (
    <>
      <DesktopList
        data={data}
        deleteLink={deleteLink}
        previewLink={previewLink}
        updateLink={updateLink}
        childLink={childLink}
        addLink={addLink}
      />
    </>
  );
};

export default List;

const ListData = ({
  data,
  updateLink,
  deleteLink,
  childLink,
  addLink,
}: Omit<Props, "previewLink">) => {
  const [items, setItems] = useState(data);
  const [selectedItems, setSelectedItems] = useState<string[] | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const previousItems = [...items]; // Save previous state for rollback
    const reorderedItems = Array.from(items);
    const [draggedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, draggedItem);

    const updatedItems = reorderedItems.map((item, index) => ({
      ...item,
      order: index,
    }));

    setItems(updatedItems); // Optimistic update

    const payload = updatedItems.map((item) => ({
      id: item.id,
      order: item.order,
    }));

    try {
      const response = await fetch(updateLink, {
        method: "POST",
        body: JSON.stringify({ items: payload }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Failed to update: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Order update failed:", error);
      setItems(previousItems); // Revert to previous state if API call fails
    }
  };

  function handleSelectAll() {
    if (selectedItems?.length !== items.length) {
      setSelectedItems(items.map((item) => item.id));
    } else {
      setSelectedItems(null);
    }
  }

  function handleSelectItem(id: string) {
    if (selectedItems?.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...(selectedItems || []), id]);
    }
  }

  const handleDelete = async () => {
    if (!selectedItems || selectedItems.length === 0) {
      console.warn("No items selected for deletion");
      return;
    }

    try {
      setIsDeleting(true);
      await fetch(deleteLink, {
        method: "POST",
        body: JSON.stringify({ items: selectedItems }),
        headers: { "Content-Type": "application/json" },
      });

      setItems((prev) =>
        prev.filter((item) => !selectedItems.includes(item.id))
      );
      setSelectedItems(null);
    } catch (error) {
      console.error("Error deleting items:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="w-full flex items-center gap-4">
        <CheckButton
          selected={selectedItems !== null && selectedItems.length > 0}
          allSelected={
            selectedItems !== null && selectedItems.length === items.length
          }
          onClick={handleSelectAll}
        />

        <div className="flex-1 flex items-center gap-4 justify-between">
          <Button
            color="red"
            disabled={selectedItems === null || selectedItems.length === 0}
            loading={isDeleting}
            onClick={handleDelete}
          >
            {selectedItems === null || selectedItems.length === 0
              ? "Delete"
              : `Delete (${selectedItems.length})`}
          </Button>

          <Button color="blue" href={addLink}>
            Add service
          </Button>
        </div>
      </div>
      <div className="w-full">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="dropable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-col space-y-1"
              >
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={cn(
                          "flex items-center gap-4 p-2 border border-gray-200 rounded-lg bg-gray-50",
                          {
                            "border-gray-300 shadow-md": snapshot.isDragging,
                            "bg-white": selectedItems?.includes(item.id),
                          }
                        )}
                      >
                        <button
                          className="size-6"
                          onClick={() => handleSelectItem(item.id)}
                          title={
                            selectedItems?.includes(item.id)
                              ? "Deselect"
                              : "Select"
                          }
                        >
                          {selectedItems?.includes(item.id) ? (
                            <SquareCheck className="size-full" />
                          ) : (
                            <Square className="size-full" />
                          )}
                        </button>
                        <Link
                          href={`${childLink}/${item.slug ?? item.id}`}
                          className="flex-1 hover:text-main-blue"
                          title={`${item.title} - Click to open`}
                        >
                          {item.title}
                        </Link>
                        <div
                          {...provided.dragHandleProps}
                          className="size-8 flex-center rounded bg-gray-100 cursor-grab"
                          title="Drag to reorder"
                        >
                          <Grip className="size-6 text-gray-300" />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

type CheckButtonProps = {
  selected: boolean;
  allSelected: boolean;
  onClick: () => void;
};
const CheckButton = ({ selected, allSelected, onClick }: CheckButtonProps) => {
  return (
    <button className="size-6" onClick={onClick}>
      {!selected ? (
        <Square className="size-full" />
      ) : allSelected ? (
        <SquareCheck className="size-full" />
      ) : (
        <SquareDot className="size-full" />
      )}
    </button>
  );
};

const DesktopList = ({
  data,
  deleteLink,
  previewLink,
  updateLink,
  childLink,
  addLink,
}: Props) => {
  const { preview, previewWidth, setPreviewWidth } = usePreview();
  const resizerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current || preview !== "both") return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = containerRect.right - e.clientX;
      setPreviewWidth(
        Math.min(Math.max(384, newWidth), containerRect.width - 400)
      );
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, setPreviewWidth]);
  return (
    <div
      className={`max-lg:hidden flex-1 grid`}
      style={{
        gridTemplateColumns: `auto ${
          preview === "both" ? previewWidth + "px" : ""
        }`,
      }}
      ref={containerRef}
    >
      {preview !== "only-preview" && (
        <ListData
          data={data}
          deleteLink={deleteLink}
          updateLink={updateLink}
          childLink={childLink}
          addLink={addLink}
        />
      )}

      {preview !== "no-preview" && (
        <div
          className={cn("min-h-full relative", {
            "pointer-events-none": isResizing,
          })}
        >
          {preview === "both" && (
            <div
              ref={resizerRef}
              className={cn(
                "absolute top-0 left-0 h-full w-0.5 hover:w-2 bg-main-red transition-all duration-300 cursor-col-resize",
                {
                  "w-2": isResizing,
                }
              )}
              onMouseDown={() => setIsResizing(true)}
            />
          )}
          <iframe src={previewLink} width="100%" height="100%" />
        </div>
      )}
    </div>
  );
};
