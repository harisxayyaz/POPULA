import Navbar from "@/components/Navbar";
import { LineChartComponent } from "./_components/LineChart";
import NetRevenue from "./_components/NetRevenue";
import { PieChartComponent } from "./_components/PieChart";
import { BarChartComponent } from "./_components/BarChart";

const NetRevenuePage = () => {
  return (
    <div className="p-6 max-h-screen space-y-4 w-full overflow-y-scroll">
        <Navbar title="Admin" description="Analytics"/>
      {/* <NetRevenue /> */}
      <div className="flex justify-center gap-4 mt-8">
        <LineChartComponent />

        <PieChartComponent />
      </div>
      <BarChartComponent/>

      <div>Hello</div>
    </div>
  );
};

export default NetRevenuePage;
