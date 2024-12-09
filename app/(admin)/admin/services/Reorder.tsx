"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Link from "next/link";

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

const Reorder = ({ initial }: Props) => {
  const [services, setServices] = useState(initial);

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
      await fetch("/api/update-services-order", {
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

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="services">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
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
                      className="flex items-center gap-4"
                    >
                      <Link
                        href={`/admin/services/${service.slug}`}
                        className="flex-1"
                      >
                        {service.title}
                      </Link>
                      <div {...provided.dragHandleProps}>Drag here</div>
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
  );
};

export default Reorder;
