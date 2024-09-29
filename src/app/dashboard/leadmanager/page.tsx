"use client";
import Navbar from "@/components/Navbar";
import { Lead as ColumnLead, columns } from "./columns"; // Renaming the imported Lead
import { DataTable } from "./data-table";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

// Define the local LeadData interface for API response
interface LeadData {
  name:string,
  id: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  country:string;
  status:string;
}

// The fetched data is transformed to match the `Lead` type
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

  console.log(data);
  

  // Map API response to match the `Lead` structure
  return data.map((lead: LeadData) => ({
    id: lead.id,
    leadname: lead.name || null, // Mock leadname based on email
    company: "Unknown", // Add a mock company
    status: "pending", // Default status
    email: lead.email,
    country: "Unknown", // Add a mock country
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
      } catch (error) {
        setError("Failed to load leads");
      } finally {
        setLoading(false);
      }
    };
    loadLeads();
  }, []);

  if (loading) {
    return (
      <div className="max-h-screen w-full overflow-y-scroll  p-4">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-h-screen w-full overflow-y-scroll  p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-h-screen w-full overflow-y-scroll  p-4">
      <Navbar title="Lead Manager" description="Lead Management"/>
      {/* Use DataTable to display leads */}
      <DataTable columns={columns} data={leads} />
    </div>
  );
}
