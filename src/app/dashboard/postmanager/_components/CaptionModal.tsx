import { useState } from "react";
import { useAppDispatch } from "@/redux/store/hooks";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { setCaptionRedux } from "@/redux/features/business/businessSlice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CaptionModal() {
  // States to track the inputs
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false); // State to track dialog open/close
  const dispatch = useAppDispatch();

  // Handle Generate button click
  const handleGenerate = async () => {
    try {
      const response = await fetch(
        "https://924d-2407-d000-a-993d-41c3-2766-562b-d8f3.ngrok-free.app/generate-caption",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // This tells the server you're sending JSON
          },
          body: JSON.stringify({
            product: product, // Use product state variable
            description: description, // Use description state variable
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate caption");
      }

      const data = await response.json();
      console.log("Generated caption:", data.ad_caption);
      dispatch(setCaptionRedux(data.ad_caption));

      // Close the modal after dispatch
      setOpen(false);
    } catch (error) {
      console.error("Error generating caption:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Generate Caption
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Caption</DialogTitle>
          <DialogDescription>What's on your mind?</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 items-center">
          <div>
            <Label htmlFor="product" className="sr-only">
              Product
            </Label>
            <Input
              id="product"
              placeholder="Enter Product Name"
              value={product}
              onChange={(e) => setProduct(e.target.value)} // Update product state
            />
          </div>
          <div>
            <Label htmlFor="description" className="sr-only">
              Description
            </Label>
            <Input
              id="description"
              placeholder="Enter Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)} // Update description state
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="button" variant="secondary" onClick={handleGenerate}>
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
