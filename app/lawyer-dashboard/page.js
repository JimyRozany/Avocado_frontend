"use client";
import CaseActivityChart from "@/components/Admin/Home/ActivityChart";
import NotificationPanel from "@/components/Admin/Home/Notifications";
import StatsCards from "@/components/Admin/Home/StatsCards";
import SubscriptionTransactions from "@/components/Admin/Home/Transactions";
import { getCaseChart } from "@/lib/Home";
import { GetLawyerOverview, GetLawyerOverviewSepcial } from "@/lib/LawyerManagement";
import { Users, Folder, MessageSquare, Clock, Activity, Shield } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminMain = () => {
  const { CaseChatData } = useSelector(
    (state) => state.HomeRTK,
  );
  const { OverviewData } = useSelector((state) => state.LawyerRTK);

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
    <div className="">
      <div className="max-w-7xl mx-auto ">
        {/* Top 4 stat cards */}
        <StatsCards stats={stats} />

        {/* Middle row: Chart + Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4 mb-4">
          <CaseActivityChart CaseChatData={CaseChatData}/>
          <NotificationPanel />
        </div>

        {/* Subscription Transactions table */}
        <SubscriptionTransactions />
      </div>
    </div>
  );
};

export default AdminMain;
