import React, { useEffect, useState } from "react";
import summaryApi from "../../../common";
import STATUS from "../../../common/status";
import MiniCalendar from "../../../components/calendar/MiniCalendar";
import WeeklyRevenue from "./components/WeeklyRevenue";
import TotalSpent from "./components/TotalSpent";
import { IoMdGift } from "react-icons/io";
import {  columnsDataComplex } from "./variables/columnsData";
import { IoMdCloudDownload } from "react-icons/io";
import Widget from "../../../components/widget/Widget";
import CheckTable from "./components/CheckTable";
import DailyTraffic from "./components/DailyTraffic";
import tableDataComplex from "./variables/tableDataComplex.json";
import { Link } from "react-router-dom";

const Dashboard = () => {

  const [allPackage, setAllPackage] = useState([]);
  const [activePackageCount, setActivePackageCount] = useState(0);
  const [inactivePackageCount, setInactivePackageCount] = useState(0);
  const fetchAllPackage = async () => {
    try {
      const response = await fetch(summaryApi.allPackage.url);
      const dataResponse = await response.json();
      console.log("package data", dataResponse);
      const packages = dataResponse?.data || [];
      setAllPackage(packages);
      // Calculate counts

      const activePackages = packages.filter(pack => pack?.status === STATUS.Active);
      const inactivePackages = packages.filter(pack => pack?.status !== STATUS.Active);
      setActivePackageCount(activePackages.length);
      setInactivePackageCount(inactivePackages.length);

    } catch (error) {
      console.error("Error fetching all packages:", error);
    }
  };

  useEffect(() => {
    fetchAllPackage();
  }, []);




  return (
    <div>

      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<IoMdGift className="h-7 w-7 text-yellow-500" />}
          title={"Offers"}
          subtitle={allPackage.length}
        />
        <Widget
          icon={<IoMdGift className="h-6 w-6 text-green-500" />}
          title={"Active Offers"}
          subtitle={activePackageCount}
        />
        <Widget
          icon={<IoMdGift className="h-7 w-7 text-red-500" />}
          title={"Deactivated Offers"}
          subtitle={inactivePackageCount}
        />
        <Link to={"/offers-pdf"}>
         <Widget
          icon={<IoMdCloudDownload className="h-10 w-10 hover:scale-110 hover:text-navy-600" />}
          title={"Download PDF"}
          subtitle={""}
        />
        </Link>
        
        {/*<Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"New Tasks"}
          subtitle={"145"}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Total Projects"}
          subtitle={"$2433"}
        /> */}
      </div>

      {/* Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        <CheckTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />

        {/* Traffic chart & Calendar */}

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          {/* <PieChartCard /> */}
          <div className="grid grid-cols-1 rounded-[10px]">
            <MiniCalendar />
          </div>
        </div>

        {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div> */}
      </div>

    </div>
  );
};

export default Dashboard;
