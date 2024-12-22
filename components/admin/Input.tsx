import React from "react";

type Props = {
  name: string;
  placeholder: string;
  defaultValue?: string;
};
const Input = ({ name, placeholder, defaultValue }: Props) => {
  return (
    <input
      name={name}
      placeholder={placeholder}
      defaultValue={defaultValue}
      required
      className="px-4 py-3 ring-1 ring-gray-200 bg-gray-100 focus-within:bg-white focus-within:ring-black rounded-2xl outline-none"
    />
  );
};

export default Input;
