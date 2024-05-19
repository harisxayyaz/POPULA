import React, { useState } from "react";

interface MediaPopupProps {
  onClose: () => void;
  onSelectMedia: (media: File) => void;
}

const MediaPopup: React.FC<MediaPopupProps> = ({ onClose, onSelectMedia }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleNextStep = () => {
    if (selectedFile) {
      setCurrentStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
      onSelectMedia(file);
      // Automatically move to the next step upon selecting a file
      setCurrentStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));
    }
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-[45%] h-[80%] flex flex-col items-center gap-3">
        <div className="w-full flex justify-end">
          <img
            src="cross.svg"
            className="mb-4 cursor-pointer"
            onClick={onClose}
          />
        </div>

        <div className="flex justify-between border-b-2 gap-4 border-gray-200 pl-9 pr-9 pb-3">
          <div className="flex items-center gap-2">
            <h1
              className={
                currentStep === 1
                  ? "bg-[#5D0089] text-white rounded-full w-6 h-6 flex items-center justify-center"
                  : "bg-gray-300 text-gray-500 w-6 h-6 flex items-center justify-center rounded-full"
              }
            >
              1
            </h1>
            <h1
              className={
                currentStep === 1
                  ? "text-lg font-bold"
                  : "text-gray-500 text-lg font-bold"
              }
            >
              Attach Media
            </h1>
          </div>
          <img src="sidearrow.svg" alt="" />
          <div className="flex items-center gap-2">
            <h1
              className={
                currentStep === 2
                  ? "bg-[#5D0089] text-white rounded-full w-6 h-6 flex items-center justify-center"
                  : "bg-gray-300 text-gray-500 w-6 h-6 flex items-center justify-center rounded-full"
              }
            >
              2
            </h1>
            <h1
              className={
                currentStep === 2
                  ? "text-lg font-bold"
                  : "text-gray-500 text-lg font-bold"
              }
            >
              Attach Details
            </h1>
          </div>
          <img src="sidearrow.svg" alt="" />
          <div className="flex items-center gap-2">
            <h1
              className={
                currentStep === 3
                  ? "bg-[#5D0089] text-white rounded-full w-6 h-6 flex items-center justify-center"
                  : "bg-gray-300 text-gray-500 w-6 h-6 flex items-center justify-center rounded-full"
              }
            >
              3
            </h1>
            <h1
              className={
                currentStep === 3
                  ? "text-lg font-bold"
                  : "text-gray-500 text-lg font-bold"
              }
            >
              Select Socials
            </h1>
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-center h-[60%] w-[80%] rounded-2xl border-gray-200 border-2 cursor-pointer"
          onClick={triggerFileInput}
        >
          <div className="flex flex-col justify-center items-center">
            <img
              src="clip.svg"
              alt=""
              className="opacity-50 h-[50px] w-[50px]"
            />
            <h1 className="text-gray-300">Attach Media</h1>
          </div>
        </div>
        <input
          id="fileInput"
          type="file"
          accept=".png,.jpg,.jpeg"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {selectedFile && (
          <div className="mt-2 text-center">
            <p className="text-green-500">File selected: {selectedFile.name}</p>
          </div>
        )}
        {currentStep < 3 && (
          <button
            className={`mt-4 px-4 py-2 rounded ${
              selectedFile || currentStep > 1
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleNextStep}
            disabled={!selectedFile && currentStep === 1}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default MediaPopup;
