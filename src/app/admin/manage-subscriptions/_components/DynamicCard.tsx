import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { db } from "../../../../../firebaseConfig"; // Assuming you have a firebase config file.
import { doc, updateDoc } from "firebase/firestore"; // Firebase Firestore functions.

interface DynamicCardProps {
  id: string; // Add an id for the payment plan
  description: string;
  imagePath: string;
  listItems: string[];
  onClick?: () => void;
}

const DynamicCard: React.FC<DynamicCardProps> = ({
  id, // Payment plan ID
  description,
  imagePath,
  listItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editableDescription, setEditableDescription] = useState(description);
  const [editableItems, setEditableItems] = useState(listItems);
  const [loading, setLoading] = useState(false); // Loader state

  const handleDialogOpen = () => setIsOpen(true);
  const handleDialogClose = () => setIsOpen(false);

  const handleItemChange = (index: number, newValue: string) => {
    const updatedItems = [...editableItems];
    updatedItems[index] = newValue;
    setEditableItems(updatedItems);
  };

  // Function to update the payment plan in Firestore
  const updatePaymentPlan = async () => {
    const paymentRef = doc(db, "paymentPlans", id); // Get reference to the plan based on ID
    setLoading(true); // Start loader
    try {
      // Update Firestore document
      await updateDoc(paymentRef, {
        description: editableDescription,
        listItems: editableItems,
      });
      console.log("Payment plan updated successfully!");
      setIsOpen(false); // Close the dialog after saving
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      console.error("Error updating payment plan: ", error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <>
      <div
        className="h-56 cursor-pointer active:border active:border-black flex w-[70%] rounded-lg bg-white overflow-hidden"
        onClick={handleDialogOpen}
      >
        <div className="h-full">
          <Image
            src={imagePath}
            className="h-full w-full object-cover"
            width={170}
            height={371}
            alt="dynamic-card-image"
          />
        </div>
        <div className="bg-white w-full p-4 gap-4 flex flex-col">
          <h1 className="font-semibold">{description}</h1>
          <div>
            <ul className="custom-bullets">
              {listItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Dialog */}
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger />
          <DialogContent>
            <DialogTitle>Edit Plan Details</DialogTitle>
            <div className="space-y-4">
              {/* Editable description */}
              <div className="flex flex-col">
                <label className="font-medium">Description</label>
                <Input
                  value={editableDescription}
                  onChange={(e) => setEditableDescription(e.target.value)}
                  placeholder="Edit description"
                />
              </div>

              {/* Editable list items */}
              <div className="flex flex-col">
                <label className="font-medium">List Items</label>
                {editableItems.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      onChange={(e) => handleItemChange(index, e.target.value)}
                      placeholder={`Item ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Show loader if updating */}
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full border-4 border-t-4 border-gray-200 h-8 w-8"></div>
              </div>
            ) : (
              <div className="flex justify-end gap-4 mt-4">
                <DialogClose asChild>
                  <button
                    onClick={handleDialogClose}
                    className="bg-red-500 text-white py-2 px-4 rounded-md"
                  >
                    Cancel
                  </button>
                </DialogClose>
                <button
                  onClick={updatePaymentPlan} // Update payment plan in Firestore
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                  Save
                </button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default DynamicCard;
