"use client";
import Navbar from "@/components/Navbar";
import { Lead as ColumnLead, columns } from "./columns"; // Renaming the imported Lead
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";

// Define the local LeadData interface for API response
interface LeadData {
  name: string;
  _id: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  country: string;
  status: string;
}

// Fetch leads from the API and map them to match the DataTable columns
async function fetchLeads(): Promise<ColumnLead[]> {
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:5000/api/lead", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch leads");
  }

  const data = await response.json();

  return data.map((lead: LeadData) => ({
    id: lead._id,
    leadname: lead.name || "N/A",
    company: "Unknown", // Default value if company data isn't available
    status: lead.status || "pending",
    email: lead.email,
    country: lead.country || "Unknown",
    phone: lead.phoneNumber,
  }));
}

export default function LeadManager() {
  const [leads, setLeads] = useState<ColumnLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const data = await fetchLeads();
        setLeads(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadLeads();
  }, []);

  if (loading) {
    return (
      <div className="max-h-screen w-full overflow-y-scroll p-4">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-h-screen w-full overflow-y-scroll p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-h-screen w-full overflow-y-scroll p-4">
      <Navbar title="Lead Manager" description="Lead Management" />
      <DataTable columns={columns} data={leads} />
    </div>
  );
}
