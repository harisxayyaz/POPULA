import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import LeadDialog from "./_components/LeadDialog";
import LeadDetailsDialog from "./_components/LeadDetailsDialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

// Define the Lead type
export type Lead = {
  id: string;
  leadname: string;
  company: string;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  country: string;
  phone: string;
};

// Table columns definition
export const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: "leadname",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Lead Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Phone Number
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "country",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Country
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "delete",
    header: "Actions",
    cell: ({ row }) => <LeadActions lead={row.original} />,
  },
];

// Actions Component
const LeadActions = ({ lead }: { lead: Lead }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      // Send DELETE request to the API with the lead ID
      const response = await fetch(
        `https://popula-backend-efc1.onrender.com/api/lead/leads/${lead.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming the token is saved in localStorage
          },
        }
      );

      // If the request fails, throw an error
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete the lead.");
      }

      // Reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting lead:", error.message);
      } else {
        console.error("Error deleting lead:", error);
      }
    } finally {
      setOpen(false); // Close the confirmation dialog
    }
  };

  return (
    <div className="flex space-x-2">
      <LeadDetailsDialog lead={lead} />
      <LeadDialog
        lead={lead}
        onSave={(updatedLead) => console.log("Saved Lead:", updatedLead)}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <h3 className="text-lg font-semibold">Delete Lead</h3>
            <p>Are you sure you want to delete this lead?</p>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
