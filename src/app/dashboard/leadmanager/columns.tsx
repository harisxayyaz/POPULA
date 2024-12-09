import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import LeadDialog from "./_components/LeadDialog";
import LeadDetailsDialog from "./_components/LeadDetailsDialog";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Lead = {
  id: string;
  leadname: string;
  company: string;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  country: string;
  phone: string;
};

export const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: "leadname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Lead Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "country",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Country
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "delete",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <LeadDetailsDialog lead={row.original} />
        <LeadDialog
          lead={row.original}
          onSave={(updatedLead) => console.log("Saved Lead:", updatedLead)}
        />
        <Button variant="outline" onClick={() => handleDelete(row.original)}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    ),
  },
];

// Example functions for handling view, edit, and delete actions
const handleView = (lead:Lead) => {
  console.log("Viewing lead:", lead);
};

const handleEdit = (lead: Lead) => {
  console.log("Editing lead:", lead);
};

const handleDelete = (lead: Lead) => {
  console.log("Deleting lead:", lead);
};
