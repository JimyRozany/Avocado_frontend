"use client";
import CaseActivityChart from "@/components/Admin/Home/ActivityChart";
import NotificationPanel from "@/components/Admin/Home/Notifications";
import StatsCards from "@/components/Admin/Home/StatsCards";
import SubscriptionTransactions from "@/components/Admin/Home/Transactions";
import { GetClient } from "@/lib/ClientManagement";
import { Users, Folder, MessageSquare, Clock } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const stats = [
  {
    label: "Total Users",
    value: "592.323",
    change: "-0.89%",
    icon: Users,
    dark: true,
  },
  {
    label: "Active Cases",
    value: "592.323",
    change: "-0.89%",
    icon: Folder,
    dark: false,
  },
  {
    label: "Open Consultations",
    value: "592.323",
    change: "-0.89%",
    icon: MessageSquare,
    dark: false,
  },
  {
    label: "Pending Approvals",
    value: "592.323",
    change: "-0.89%",
    icon: Clock,
    dark: false,
  },
];

const AdminMain = () => {
  const { loading, ClientData } = useSelector((state) => state.ClientRTK);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetClient());
  }, [dispatch]);
  return (
    <div className="">
      <div className="max-w-7xl mx-auto ">
        {/* Top 4 stat cards */}
        <StatsCards stats={stats} />

        {/* Middle row: Chart + Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4 mb-4">
          <CaseActivityChart />
          <NotificationPanel />
        </div>

        {/* Subscription Transactions table */}
        <SubscriptionTransactions />
      </div>
    </div>
  );
};

export default AdminMain;
