"use client";
import { Lead as ColumnLead, columns } from "./columns"; // Renaming the imported Lead
import { DataTable } from "./data-table";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

// Define the local LeadData interface for API response
interface LeadData {
  id: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
}

// The fetched data is transformed to match the `Lead` type
async function fetchLeads(): Promise<ColumnLead[]> {
  const response = await fetch("https://popula-backend.onrender.com/api/leads");
  if (!response.ok) {
    throw new Error("Failed to fetch leads");
  }
  const data = await response.json();

  // Map API response to match the `Lead` structure
  return data.map((lead: LeadData) => ({
    id: lead.id,
    leadname: lead.email.split("@")[0], // Mock leadname based on email
    company: "Unknown", // Add a mock company
    status: "pending", // Default status
    email: lead.email,
    country: "Unknown", // Add a mock country
    phone: lead.phoneNumber,
  }));
}

export default function LeadManager() {
  const router = useRouter();
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

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-10 p-4">
      <div className="flex justify-between ">
        <div>
          <h1 className=" text-sm text-[#707EAE]">Pages / Leads</h1>
          <h1 className="text-3xl font-bold text-[#2B3674]">Leads Manager</h1>
        </div>
        <div className="flex bg-white p-2 rounded-full h-13 gap-3 items-center">
          <input
            type="search"
            placeholder="search"
            className="rounded-full bg-[#f4f7fe] p-2 pl-6 4 placeholder-[#8F9BBA]"
          />
          <img src="/notifications.svg" alt="" className=" w-5 h-5" />
          <img src="/moon.svg" alt="" className=" w-4 h-4" />
          <img src="/info.svg" alt="" className=" w-5 h-5" />
          <img
            src="/Profile.svg"
            alt=""
            className=" w-8 h-8 cursor-pointer"
            onClick={handleLogout}
          />
        </div>
      </div>
      {/* Use DataTable to display leads */}
      <DataTable columns={columns} data={leads} />
    </div>
  );
}
