"use client";
import { Lead, columns } from "./columns";
import { DataTable } from "./data-table";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

async function getData(): Promise<Lead[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      leadname: "John Doe",
      company: "Acme Corp",
      status: "pending",
      email: "john.doe@example.com",
      country: "USA",
      phone: "+1-555-1234",
    },
    {
      id: "2",
      leadname: "Jane Smith",
      company: "Beta LLC",
      status: "processing",
      email: "jane.smith@example.com",
      country: "Canada",
      phone: "+1-555-5678",
    },
    {
      id: "3",
      leadname: "Alice Johnson",
      company: "Gamma Inc",
      status: "success",
      email: "alice.johnson@example.com",
      country: "UK",
      phone: "+44-20-7946-0958",
    },
    {
      id: "4",
      leadname: "Bob Brown",
      company: "Delta Co",
      status: "failed",
      email: "bob.brown@example.com",
      country: "Australia",
      phone: "+61-2-9876-5432",
    },
    {
      id: "5",
      leadname: "Charlie Davis",
      company: "Epsilon Ltd",
      status: "pending",
      email: "charlie.davis@example.com",
      country: "Germany",
      phone: "+49-30-123456",
    },
    {
      id: "6",
      leadname: "Dana Lee",
      company: "Zeta GmbH",
      status: "processing",
      email: "dana.lee@example.com",
      country: "France",
      phone: "+33-1-70-18-99-16",
    },
    {
      id: "7",
      leadname: "Eve Williams",
      company: "Eta Enterprises",
      status: "success",
      email: "eve.williams@example.com",
      country: "Italy",
      phone: "+39-06-1234567",
    },
    {
      id: "8",
      leadname: "Frank Miller",
      company: "Theta Solutions",
      status: "failed",
      email: "frank.miller@example.com",
      country: "Spain",
      phone: "+34-91-123-4567",
    },
    {
      id: "9",
      leadname: "Grace Wilson",
      company: "Iota Technologies",
      status: "pending",
      email: "grace.wilson@example.com",
      country: "Netherlands",
      phone: "+31-20-1234567",
    },
    {
      id: "10",
      leadname: "Henry Clark",
      company: "Kappa Group",
      status: "processing",
      email: "henry.clark@example.com",
      country: "Sweden",
      phone: "+46-8-1234567",
    },
    {
      id: "11",
      leadname: "Isabella Moore",
      company: "Lambda Services",
      status: "pending",
      email: "isabella.moore@example.com",
      country: "Italy",
      phone: "+39-02-1234567",
    },
    {
      id: "12",
      leadname: "James Taylor",
      company: "Mu Corp",
      status: "processing",
      email: "james.taylor@example.com",
      country: "USA",
      phone: "+1-212-555-6789",
    },
    {
      id: "13",
      leadname: "Katherine Brown",
      company: "Nu Solutions",
      status: "success",
      email: "katherine.brown@example.com",
      country: "Canada",
      phone: "+1-416-555-7890",
    },
    {
      id: "14",
      leadname: "Liam Wilson",
      company: "Xi Technologies",
      status: "failed",
      email: "liam.wilson@example.com",
      country: "Australia",
      phone: "+61-3-1234-5678",
    },
    {
      id: "15",
      leadname: "Mia Anderson",
      company: "Omicron Enterprises",
      status: "pending",
      email: "mia.anderson@example.com",
      country: "Germany",
      phone: "+49-40-987654",
    },
    {
      id: "16",
      leadname: "Noah Martin",
      company: "Pi Inc",
      status: "processing",
      email: "noah.martin@example.com",
      country: "France",
      phone: "+33-1-45-67-89-01",
    },
    {
      id: "17",
      leadname: "Olivia Scott",
      company: "Rho Solutions",
      status: "success",
      email: "olivia.scott@example.com",
      country: "UK",
      phone: "+44-20-7946-0959",
    },
    {
      id: "18",
      leadname: "Paul Harris",
      company: "Sigma Corp",
      status: "failed",
      email: "paul.harris@example.com",
      country: "Spain",
      phone: "+34-91-234-5678",
    },
    {
      id: "19",
      leadname: "Quinn Adams",
      company: "Tau LLC",
      status: "pending",
      email: "quinn.adams@example.com",
      country: "Netherlands",
      phone: "+31-10-1234567",
    },
    {
      id: "20",
      leadname: "Rebecca Lewis",
      company: "Upsilon Ltd",
      status: "processing",
      email: "rebecca.lewis@example.com",
      country: "Sweden",
      phone: "+46-20-7654321",
    },
    {
      id: "21",
      leadname: "Samuel Lee",
      company: "Phi Enterprises",
      status: "success",
      email: "samuel.lee@example.com",
      country: "USA",
      phone: "+1-323-555-9876",
    },
    {
      id: "22",
      leadname: "Tina White",
      company: "Chi Group",
      status: "failed",
      email: "tina.white@example.com",
      country: "Canada",
      phone: "+1-403-555-1234",
    },
    {
      id: "23",
      leadname: "Victor King",
      company: "Psi Co",
      status: "pending",
      email: "victor.king@example.com",
      country: "UK",
      phone: "+44-161-123-4567",
    },
    {
      id: "24",
      leadname: "Wendy Hall",
      company: "Omega Ltd",
      status: "processing",
      email: "wendy.hall@example.com",
      country: "Australia",
      phone: "+61-7-5555-1234",
    },
    {
      id: "25",
      leadname: "Xander Young",
      company: "Alpha Technologies",
      status: "success",
      email: "xander.young@example.com",
      country: "Germany",
      phone: "+49-30-555555",
    },
    {
      id: "26",
      leadname: "Yara Gonzalez",
      company: "Beta Solutions",
      status: "failed",
      email: "yara.gonzalez@example.com",
      country: "France",
      phone: "+33-4-76-55-99-88",
    },
    {
      id: "27",
      leadname: "Zachary Evans",
      company: "Gamma Enterprises",
      status: "pending",
      email: "zachary.evans@example.com",
      country: "Italy",
      phone: "+39-06-6543210",
    },
    {
      id: "28",
      leadname: "Alyssa Carter",
      company: "Delta Ltd",
      status: "processing",
      email: "alyssa.carter@example.com",
      country: "Spain",
      phone: "+34-91-876-5432",
    },
    {
      id: "29",
      leadname: "Benjamin Robinson",
      company: "Epsilon Technologies",
      status: "success",
      email: "benjamin.robinson@example.com",
      country: "Netherlands",
      phone: "+31-20-9876543",
    },
    {
      id: "30",
      leadname: "Clara Martinez",
      company: "Zeta Inc",
      status: "failed",
      email: "clara.martinez@example.com",
      country: "Sweden",
      phone: "+46-40-1234567",
    },
  ];
  
}

export default async function leadmanager() {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };
  const data = await getData();

  return (
    <div className="container mx-auto py-10 p-4">
      <div className="flex justify-between ">
        <div>
          <h1 className=" text-sm text-[#707EAE]">Pages / Leads</h1>
          <h1 className="text-3xl font-bold text-[#2B3674]">
            Leads Manager
          </h1>
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
      <DataTable columns={columns} data={data} />
    </div>
  );
}
