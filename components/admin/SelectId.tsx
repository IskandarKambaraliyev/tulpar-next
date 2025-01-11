import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type Props = {
  label: string;
  list:
    | []
    | {
        id: string;
        title?: string;
        name?: string;
      }[];
};
const SelectId = ({ label, list }: Props) => {
  const [selected, setSelected] = useState<string>(""); // Store selected IDs as a string

  const handleSelect = (id: string) => {
    setSelected((prev) => {
      const ids = prev.split(",").filter((item) => item); // Split string into an array of IDs
      if (ids.includes(id)) {
        // Remove the ID if already selected
        return ids.filter((item) => item !== id).join(",");
      } else {
        // Add the ID if not selected
        return [...ids, id].join(",");
      }
    });
  };
  return (
    <div className="flex flex-col space-y-1">
      <p>{label}</p>

      <ul className="w-full flex flex-col max-h-[20rem] h-fit overflow-y-auto bg-gray-100 rounded-lg divide-y divide-gray-200">
        {list.length > 0 &&
          list.map((item) => (
            <li key={item.id}>
              <SelectButton
                item={item}
                active={selected.includes(item.id)}
                onClick={() => handleSelect(item.id)}
              />
            </li>
          ))}
      </ul>

      <input type="hidden" name="list" value={selected} />
    </div>
  );
};

export default SelectId;

const SelectButton = ({
  item,
  active,
  onClick,
}: {
  item: { id: string; title?: string; name?: string };
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("flex items-center gap-2 py-1 px-2 w-full", {
        "bg-main-dark-blue text-white": active,
        "hover:bg-gray-200": !active,
      })}
    >
      <span className="flex-1 text-left">{item.title ?? item.name}</span>
      <div className="size-4">
        {active && <CheckIcon className="size-full" />}
      </div>
    </button>
  );
};
