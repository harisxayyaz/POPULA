"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";

type ViewDialogProps = {
  business: {
    businessName: string;
    domain: string;
    businessEmail: string;
    status: string;
  };
  isOpen: boolean;
  onClose: () => void;
};

const ViewDialog = ({ business, isOpen, onClose }: ViewDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        {/* The Eye icon will trigger the dialog */}
        <button className="text-blue-500 mx-2">
          <FaEye />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <h3 className="text-xl font-semibold">Business Details</h3>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <strong>Business Name: </strong> {business.businessName}
          </div>
          <div>
            <strong>Domain: </strong> {business.domain}
          </div>
          <div>
            <strong>Business Email: </strong> {business.businessEmail}
          </div>
          <div>
            <strong>Status: </strong> {business.status}
          </div>
        </div>

        <DialogFooter>
          <DialogClose className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Close
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDialog;
