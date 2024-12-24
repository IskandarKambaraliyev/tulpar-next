import React from "react";

type Props = {
  name: string;
  label: string;
  defaultValue?: string;
};
const Input = ({ name, label, defaultValue }: Props) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={name}>{label}*</label>
      <input
        id={name}
        name={name}
        defaultValue={defaultValue}
        required
        className="px-4 py-3 rounded-lg ring-1 ring-gray-300"
      />
    </div>
  );
};

export default Input;
