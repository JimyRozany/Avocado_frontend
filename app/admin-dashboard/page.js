"use client";

import CaseActivityChart from "@/components/Admin/Home/ActivityChart";
import NotificationPanel from "@/components/Admin/Home/Notifications";
import StatsCards from "@/components/Admin/Home/StatsCards";
import SubscriptionTransactions from "@/components/Admin/Home/Transactions";
import { getCaseChart, getOverView } from "@/lib/Home";
import { Users, Folder, MessageSquare, Clock } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminMain = () => {
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
      <div className="max-w-7xl mx-auto">
        <StatsCards stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4 mb-4">
          <CaseActivityChart CaseChatData={CaseChatData}/>
          <NotificationPanel />
        </div>

        <SubscriptionTransactions />
      </div>
    </div>
  );
};

export default AdminMain;
