import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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

type LeadDetailsDialogProps = {
  lead: Lead;
};

const LeadDetailsDialog: React.FC<LeadDetailsDialogProps> = ({ lead }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2" variant="outline">
          <FontAwesomeIcon icon={faEye} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lead Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <strong>Name:</strong> {lead.leadname}
          </p>
          <p>
            <strong>Email:</strong> {lead.email}
          </p>
          <p>
            <strong>Phone:</strong> {lead.phone}
          </p>
          <p>
            <strong>Company:</strong> {lead.company}
          </p>
          <p>
            <strong>Country:</strong> {lead.country}
          </p>
          <p>
            <strong>Status:</strong> {lead.status}
          </p>
        </div>
        <DialogFooter>
          <Button variant="secondary">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailsDialog;
