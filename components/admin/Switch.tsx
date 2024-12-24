import React from "react";
import { Switch as UiSwitch } from "../ui/switch";

type Props = {
  name: string;
  label: string;
  checked?: boolean;
};
const Switch = ({ name, label, checked }: Props) => {
  return (
    <div className="flex items-center space-x-4">
      <label htmlFor={name}>{label}*</label>
      <UiSwitch id={name} name={name} checked={checked} value="true" />
    </div>
  );
};

export default Switch;
