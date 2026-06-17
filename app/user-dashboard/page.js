"use client";
import CaseActivityChart from "@/components/Admin/Home/ActivityChart";
import NotificationPanel from "@/components/Admin/Home/Notifications";
import StatsCards from "@/components/Admin/Home/StatsCards";
import SubscriptionTransactions from "@/components/Admin/Home/Transactions";
import { GetClient, GetClientOverview } from "@/lib/ClientManagement";
import { getCaseChart } from "@/lib/Home";
import {
  Users,
  Folder,
  MessageSquare,
  Clock,
  Activity,
  Shield,
} from "lucide-react";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminMain = () => {
  const { loading, ClientData, OverviewData } = useSelector(
    (state) => state.ClientRTK,
  );
  const { CaseChatData } = useSelector((state) => state.HomeRTK);

  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetClient());
    dispatch(GetClientOverview(user.id));
    dispatch(getCaseChart());
  }, [dispatch]);

  const CASE_STATS = [
    {
      label: "Total Cases",
      value: OverviewData?.data?.totalCases || 0,
      icon: Folder,
      change: "0%",
      dark: true,
    },
    {
      label: "Pending",
      value: OverviewData?.data?.pendingCases || 0,
      icon: Clock,
      change: "0%",
      dark: false,
    },
    {
      label: "Active",
      value: OverviewData?.data?.activeCases || 0,
      icon: Activity,
      change: "0%",
      dark: false,
    },
    {
      label: "Closed",
      value: OverviewData?.data?.closedCases || 0,
      icon: Shield,
      change: "0%",
      dark: false,
    },
  ];
  return (
    <div className="">
      <div className="max-w-7xl mx-auto ">
        {/* Top 4 stat cards */}
        <StatsCards stats={CASE_STATS} />

        {/* Middle row: Chart + Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4 mb-4">
          <CaseActivityChart CaseChatData={CaseChatData} />
          <NotificationPanel />
        </div>

        {/* Subscription Transactions table */}
        <SubscriptionTransactions />
      </div>
    </div>
  );
};

export default AdminMain;
