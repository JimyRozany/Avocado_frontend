"use client"
import CaseActivityChart from "@/components/Admin/Home/ActivityChart";
import CasesCreatedChart from "@/components/Admin/Home/CasesCreatedChart";
import EarningsChart from "@/components/Admin/Home/EarningsChart";
import StatsCards from "@/components/Admin/Home/StatsCards";
import { getCaseChart } from "@/lib/Home";
import { GetLawyerOverview, GetLawyerOverviewSepcial } from "@/lib/LawyerManagement";
import { Activity, Clock, Folder, MessageSquare, Shield, Users } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Report = () => {  
  const { OverviewData } = useSelector((state) => state.LawyerRTK);
  const { CaseChatData } = useSelector(
    (state) => state.HomeRTK,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetLawyerOverviewSepcial());
    dispatch(getCaseChart());
  }, [dispatch]);

  const stats = [
    {
      label: "Total Cases",
      value: OverviewData?.data?.totalCases ?? 0,
      icon: Folder,
      dark: true,
    },
    {
      label: "Pending",
      value: OverviewData?.data?.pendingCases ?? 0,
      icon: Clock,
      dark: false,
    },
    {
      label: "Active",
      value: OverviewData?.data?.activeCases ?? 0,
      icon: Activity,
      dark: false,
    },
    {
      label: "Closed",
      value: OverviewData?.data?.closedCases ?? 0,
      icon: Shield,
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
