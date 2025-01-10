import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Import the shadcn Select components
import { useState } from "react";
import { Alert } from "@/components/ui/alert";
import { faTrash, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Lead = {
  id: string;
  leadname: string;
  company: string;
  status: string;
  email: string;
  country: string;
  phone: string;
};

type LeadDialogProps = {
  lead: Lead;
  onSave: (updatedLead: Lead) => void;
};

const LeadDialog: React.FC<LeadDialogProps> = ({ lead, onSave }) => {
  const [formData, setFormData] = useState<Lead>(lead);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: keyof Lead, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://popula-backend-efc1.onrender.com/api/lead/update/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.leadname,
            company: formData.company,
            status: formData.status,
            email: formData.email,
            country: formData.country,
            phoneNumber: formData.phone,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update lead");
      }

      const updatedLead = await response.json();
      onSave(updatedLead); // Pass updated lead back to parent
      alert("Lead updated successfully");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      setError("An error occurred while updating the lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2" variant="outline">
          <FontAwesomeIcon icon={faEdit} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Lead</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={formData.leadname}
              onChange={(e) => handleChange("leadname", e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Country</label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Status</label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleChange("status", value)}
            >
              <SelectTrigger className="w-full border rounded px-2 py-1">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => setFormData(lead)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button variant="default" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDialog;
