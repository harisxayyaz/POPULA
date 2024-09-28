// Modal.tsx
import React, { useEffect, useRef, useState } from "react";
import Cropper from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  photo: File | null;
  onUpload: (resizedImage: File) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, photo, onUpload }) => {
  const [imageURL, setImageURL] = useState<string>("");
  const [crop, setCrop] = useState({ unit: "px", width: 300, height: 300 });
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (photo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result as string);
      };
      reader.readAsDataURL(photo);
    }
  }, [photo]);

  const handleCropComplete = (crop: any) => {
    setCompletedCrop(crop);
  };

  const handleResizeAndUpload = () => {
    if (completedCrop && canvasRef.current) {
      const canvas = canvasRef.current;
      const image = new Image();
      image.src = imageURL;
      image.onload = () => {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = completedCrop.width;
          canvas.height = completedCrop.height;
          ctx.drawImage(
            image,
            completedCrop.x,
            completedCrop.y,
            completedCrop.width,
            completedCrop.height,
            0,
            0,
            completedCrop.width,
            completedCrop.height
          );

          canvas.toBlob((blob) => {
            if (blob) {
              onUpload(
                new File([blob], photo?.name || "resized.png", {
                  type: "image/png",
                })
              );
            }
          }, "image/png");
        }
      };
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl mb-4">Crop Image</h2>
        <Cropper
          src={imageURL}
          crop={crop}
          onCropChange={setCrop}
          onCropComplete={handleCropComplete}
          style={{ containerStyle: { width: "300px", height: "300px" } }} // Set the size to keep the aspect ratio
          aspect={1} // 1:1 aspect ratio
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="bg-gray-300 p-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleResizeAndUpload}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
