"use client";
import CaseTable from "@/components/Admin/CaseManagement/CaseTable";
import StatsCards from "@/components/Admin/Home/StatsCards";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  Clock,
  Eye,
  Folder,
  Shield,
  Trash2,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { GetClient } from "@/lib/ClientManagement";

const STATUS_FILTERS = [
  "ALL",
  "CLOSED",
  "PENDING",
  "FLAGGED",
  "ACTIVE",
  "SUSPENDED",
];

const statusConfig = {
  CLOSED: "bg-green-50 text-green-600 border border-green-200",
  PENDING: "bg-yellow-50 text-yellow-600 border border-yellow-200",
  FLAGGED: "bg-red-50 text-red-500 border border-red-200",
  ACTIVE: "bg-blue-50 text-blue-600 border border-blue-200",
  SUSPENDED: "bg-gray-100 text-gray-500 border border-gray-200",
};

const INITIAL_CASES = [
  {
    id: "C-10231",
    title: "Commercial contract dispute",
    client: "Bahr Adam",
    lawyer: "Bahr Adam",
    status: "CLOSED",
    created: "02 Jun 2025",
    updated: "25 Jun 2025",
  },
  {
    id: "C-10232",
    title: "Commercial contract dispute",
    client: "Bahr Adam",
    lawyer: "Bahr Adam",
    status: "PENDING",
    created: "02 Jun 2025",
    updated: "25 Jun 2025",
  },
  {
    id: "C-10233",
    title: "Commercial contract dispute",
    client: "Bahr Adam",
    lawyer: "Bahr Adam",
    status: "FLAGGED",
    created: "02 Jun 2025",
    updated: "25 Jun 2025",
  },
  {
    id: "C-10234",
    title: "Commercial contract dispute",
    client: "Bahr Adam",
    lawyer: "Bahr Adam",
    status: "ACTIVE",
    created: "02 Jun 2025",
    updated: "25 Jun 2025",
  },
  {
    id: "C-10235",
    title: "Commercial contract dispute",
    client: "Bahr Adam",
    lawyer: "Bahr Adam",
    status: "SUSPENDED",
    created: "02 Jun 2025",
    updated: "25 Jun 2025",
  },
  {
    id: "C-10236",
    title: "Commercial contract dispute",
    client: "Bahr Adam",
    lawyer: "Bahr Adam",
    status: "CLOSED",
    created: "02 Jun 2025",
    updated: "25 Jun 2025",
  },
  {
    id: "C-10237",
    title: "Commercial contract dispute",
    client: "Bahr Adam",
    lawyer: "Bahr Adam",
    status: "CLOSED",
    created: "02 Jun 2025",
    updated: "25 Jun 2025",
  },
];

const CASE_COLUMNS = [
  "Name",
  "Email",
  "Total Cases",
  "Rating",
  "Status",
  "Created Date",
  "Last Update",
  "Actions",
];

const CASE_STATS = [
  {
    label: "Total Lawyers",
    value: "592.323",
    change: "-0.89%",
    icon: Folder,
    dark: true,
  },
  {
    label: "Active Lawyers",
    value: "592.323",
    change: "-0.89%",
    icon: Clock,
    dark: false,
  },
  {
    label: "Pending Verification",
    value: "592.323",
    change: "-0.89%",
    icon: Activity,
    dark: false,
  },
  {
    label: "Suspended Accounts",
    value: "592.323",
    change: "-0.89%",
    icon: Shield,
    dark: false,
  },
];

const Case = () => {
  const { ClientDataDetails, loading, ClientData } = useSelector(
    (state) => state.ClientRTK,
  );
  const router = useRouter();
  const getItems = (row, actions) => [
    {
      label: "View Details",
      icon: Eye,
      color: "text-gray-700",
      hover: "hover:bg-gray-50",
      action: () => {
        router.push(`/admin-dashboard/client-management/${row.id}`);
        actions.closeMenu();
      },
    },
    {
      label: "Send Warning",
      icon: AlertTriangle,
      color: "text-orange-500",
      hover: "hover:bg-orange-50",
      action: () => {
        actions.showToast(`Warning sent for ${row.id}`, "info");
        actions.closeMenu();
      },
    },
    {
      label: "Delete Account",
      icon: Trash2,
      color: "text-red-500",
      hover: "hover:bg-red-50",
      action: () => actions.handleDelete(row.id),
    },
  ];
  const dispatch = useDispatch();
  console.log(ClientData.data);

  useEffect(() => {
    dispatch(GetClient());
  }, [dispatch]);
  return (
    <div>
      {/* Top 4 stat cards */}
      <StatsCards stats={CASE_STATS} />
      <CaseTable
        STATUS_FILTERS={STATUS_FILTERS}
        getItems={getItems}
        statusConfig={statusConfig}
        INITIAL_CASES={ClientData.data}
        CASE_COLUMNS={CASE_COLUMNS}
        type="client"
      />
    </div>
  );
};

export default Case;
