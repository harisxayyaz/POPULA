"use client"
import { useEffect, useState } from "react";
import { LineChartComponent } from "./LineChart";

const NetRevenue = () => {
  const [netRevenue, setNetRevenue] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNetRevenue = async () => {
      try {
        const response = await fetch("/api/revenue");
        if (!response.ok) {
          throw new Error("Failed to fetch revenue data");
        }

        const data = await response.json();
        setNetRevenue(data.netRevenue);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNetRevenue();
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Net Revenue</h1>
      {loading && <p>Loading revenue data...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {netRevenue !== null && (
        <p className="text-xl font-medium">
          Total:{" "}
          <span className="text-green-500">${netRevenue.toFixed(2)}</span>
        </p>
      )}
    </div>
  );
};

export default NetRevenue;
