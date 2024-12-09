import React, { useState } from "react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox"; // Adjust the import path for your Checkbox component

interface CheckboxCardProps {
  imagePath: string;
  title: string;
  checked: boolean; // Prop to control the checkbox state
  onToggle: (newState: boolean) => void; // Callback to notify parent component of state change
}

const CheckboxCard: React.FC<CheckboxCardProps> = ({
  imagePath,
  title,
  checked,
  onToggle,
}) => {
  return (
    <div className="rounded-full border-2 justify-between items-center border-[#e9eaeb] p-2 flex gap-2">
      <Image src={imagePath} width={24} height={24} alt={title} />
      {title}
      <Checkbox
        className="rounded-full bg-[#d9d9d9] border-none w-[20px] h-[20px]"
        checked={checked} // Controlled state
        onCheckedChange={(isChecked) => onToggle(!!isChecked)} // Notify parent of state change
      />
    </div>
  );
};

export default CheckboxCard;
