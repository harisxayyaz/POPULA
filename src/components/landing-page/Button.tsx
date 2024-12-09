import React from "react";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      className={`px-10 py-3 bg-[#2A327D] max-h-[50px] min-w-[170px] text-white font-bold rounded hover:bg-white transition hover:border hover:text-[#2A327D] ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
