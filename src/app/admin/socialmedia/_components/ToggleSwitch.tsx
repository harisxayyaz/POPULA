import React from "react";

interface ToggleSwitchProps {
  isChecked: boolean; // Determines whether the toggle is on or off
  onChange: () => void; // Handler to trigger when the toggle state changes
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isChecked, onChange }) => {
  return (
    <div>
      <label className="relative inline-block w-[3.5em] h-[2em]">
        {/* Hidden Checkbox */}
        <input
          type="checkbox"
          className="peer opacity-0 w-0 h-0"
          checked={isChecked}
          onChange={onChange}
        />
        {/* Slider */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#f5f5f5] rounded-[30px] transition duration-400 peer-checked:bg-[#9ed99c]"></div>
        {/* Slider Card */}
        <div className="absolute left-[0.3em] bottom-[0.3em] w-[1.4em] h-[1.4em] rounded-full transition-transform duration-400 peer-checked:translate-x-[1.5em]">
          {/* Front Face */}
          <div className="absolute inset-0 bg-[#DC3535] rounded-full transition-transform duration-400 transform peer-checked:rotate-y-180"></div>
          {/* Back Face */}
          <div className="absolute inset-0 bg-[#379237] rounded-full transform rotate-y-180 transition-transform duration-400 peer-checked:rotate-y-0"></div>
        </div>
      </label>
    </div>
  );
};

export default ToggleSwitch;
