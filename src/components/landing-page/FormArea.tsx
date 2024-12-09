import React from "react";
import Button from "./Button";

const FormArea = () => {
  return (
    <div>
      <div className="flex flex-col mx-[5%] md:flex-row items-center justify-evenly w-full px-12 py-0 md:space-x-1 mt-20">
        {/* Text Section */}
        <div className="pl-[2%] md:w-[60%] w-full text-left space-y-4">
          <h2 className="font-bold">Effortlessly Create Forms</h2>
          <h4 className="">
            Boost your lead acquisition efforts with our advanced form builder.
            Create and customize forms to collect important customer information
            and attract new leads. Utilize our ready-to-use templates for quick
            setup and efficient data collection. Enhance your lead generation
            process and achieve better results with minimal effort.
          </h4>
          <div className="flex mr-[20%] pt-5">
            <Button text="Try Now!" />
          </div>
        </div>
        {/* Image Section */}
        <div className="w-full md:w-[70%]  flex justify-end mt-6 md:mt-0">
          <img
            src="/formarea.svg" // Replace with your image URL
            alt="Social Area"
            className="w-full h-[50%] h-auto rounded"
          />
        </div>
      </div>
      <div className="w-full text-center">
        {/* Image with responsive width */}
        <img
          src="/postergen.svg"
          alt="Satisfaction"
          className="w-full h-auto mt-[120]"
        />
      </div>
    </div>
  );
};

export default FormArea;
