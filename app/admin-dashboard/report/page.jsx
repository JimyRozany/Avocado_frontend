"use client"
import CaseActivityChart from "@/components/Admin/Home/ActivityChart";
import CasesCreatedChart from "@/components/Admin/Home/CasesCreatedChart";
import EarningsChart from "@/components/Admin/Home/EarningsChart";
import StatsCards from "@/components/Admin/Home/StatsCards";
import { getCaseChart, getOverView } from "@/lib/Home";
import { Clock, Folder, MessageSquare, Users } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const Report = () => {
    const { DataOverView, loading , CaseChatData } = useSelector((state) => state.HomeRTK);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOverView());
    dispatch(getCaseChart())
  }, [dispatch]);

  const stats = [
    {
      label: "Total Users",
      value: DataOverView?.totalUsers ?? 0,
      icon: Users,
      dark: true,
    },
    {
      label: "Active Cases",
      value: DataOverView?.activeCases ?? 0,
      icon: Folder,
      dark: false,
    },
    {
      label: "Closed Cases",
      value: DataOverView?.closedCases ?? 0,
      icon: MessageSquare,
      dark: false,
    },
    {
      label: "Pending Approvals",
      value: DataOverView?.pendingApprovals ?? 0,
      icon: Clock,
      dark: false,
    },
  ];
  return (
    <div>
      {/* Top 4 stat cards */}
      <StatsCards stats={stats} />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <CaseActivityChart CaseChatData={CaseChatData}/>
        </div>

        <div>
          <CasesCreatedChart />
        </div>
      </div>
      <EarningsChart />
    </div>
  );
};

export default Report;
