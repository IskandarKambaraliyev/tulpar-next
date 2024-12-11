"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Link from "next/link";
import { Grip, Square, SquareCheck, SquareDot } from "lucide-react";
import Button from "@/components/Button";
import { cn } from "@/lib/utils";

type Service = {
  id: string;
  title: string;
  order: number;
  image: string;
  slug: string;
};

type Props = {
  initial: Service[];
};

type SelectedType = string[] | null;

const Reorder = ({ initial }: Props) => {
  const [services, setServices] = useState(initial);
  const [selected, setSelected] = useState<SelectedType>(null);
  const [delLoading, setDelLoading] = useState(false);

  const onDragEnd = async (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(services);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update the order field
    const updatedServices = items.map((item, index) => ({
      ...item,
      order: index,
    }));

    setServices(updatedServices);

    const reducedServices = updatedServices.map((service) => ({
      id: service.id,
      order: service.order,
    }));

    try {
      await fetch("/api/update/service-order", {
        method: "POST",
        body: JSON.stringify({ services: reducedServices }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  function handleSelectClick() {
    if (selected?.length !== services.length) {
      setSelected(services.map((service) => service.id));
    } else {
      setSelected(null);
    }
  }

  function handleSelect(id: string) {
    if (selected?.includes(id)) {
      // If the service is already selected, remove it
      setSelected(selected.filter((item) => item !== id));
    } else {
      // If the service is not selected, add it to the array
      setSelected([...(selected || []), id]);
    }
  }

  const handleDelete = async () => {
    if (!selected || selected.length === 0) {
      console.warn("No services selected for deletion");
      return;
    }

    // console.log(selected);
    try {
      setDelLoading(true);
      await fetch("/api/delete/services", {
        method: "POST",
        body: JSON.stringify({ services: selected }),
        headers: { "Content-Type": "application/json" },
      });

      setServices((prev) =>
        prev.filter((service) => !selected.includes(service.id))
      );
      setSelected(null);
    } catch (error) {
      console.error("Error deleting services:", error);
    } finally {
      setDelLoading(false);
    }
  };

  return (
    <>
      <div className="sticky z-header-1 top-20 left-0 bg-white border-b border-gray-100 py-4">
        <div className="container flex items-center gap-4">
          <CheckButton
            selected={selected !== null && selected.length > 0}
            allSelected={
              selected !== null && selected.length === services.length
            }
            onClick={handleSelectClick}
          />

          <div className="flex-1 flex items-center gap-4 justify-between">
            <Button
              color="red"
              disabled={selected === null || selected.length === 0}
              loading={delLoading}
              onClick={handleDelete}
            >
              {selected === null || selected.length === 0
                ? "Delete"
                : `Delete (${selected.length})`}
            </Button>

            <Button
              color="blue"
              href="/admin/services/add?redirect=/admin/services"
            >
              Add service
            </Button>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="services">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-col space-y-1"
              >
                {services.map((service, index) => (
                  <Draggable
                    key={service.id}
                    draggableId={service.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={cn(
                          "flex items-center gap-4 p-2 border border-gray-200 rounded-lg bg-gray-50",
                          {
                            "border-gray-300 shadow-md": snapshot.isDragging,
                            "bg-white": selected?.includes(service.id),
                          }
                        )}
                      >
                        <button
                          className="size-6"
                          onClick={() => handleSelect(service.id)}
                          title={
                            selected?.includes(service.id)
                              ? "Deselect"
                              : "Select"
                          }
                        >
                          {selected?.includes(service.id) ? (
                            <SquareCheck className="size-full" />
                          ) : (
                            <Square className="size-full" />
                          )}
                        </button>
                        <Link
                          href={`/admin/services/${service.slug}`}
                          className="flex-1 hover:text-main-blue"
                          title={`${service.title} - Click to open`}
                        >
                          {service.title}
                        </Link>
                        <div
                          {...provided.dragHandleProps}
                          className="size-8 flex-center rounded bg-gray-100"
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
    </>
  );
};

export default Reorder;

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
