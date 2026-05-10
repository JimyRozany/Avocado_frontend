"use client";
import CaseTable from "@/components/Admin/CaseManagement/CaseTable";
import StatsCards from "@/components/Admin/Home/StatsCards";
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
import { useRouter } from "next/navigation";
import React from "react";

const CASE_STATS = [
  {
    label: "Total Cases",
    value: "592.323",
    change: "-0.89%",
    icon: Folder,
    dark: true,
  },
  {
    label: "Pending",
    value: "592.323",
    change: "-0.89%",
    icon: Clock,
    dark: false,
  },
  {
    label: "Active",
    value: "592.323",
    change: "-0.89%",
    icon: Activity,
    dark: false,
  },
  {
    label: "Closed",
    value: "592.323",
    change: "-0.89%",
    icon: Shield,
    dark: false,
  },
];

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
    category: "Commercial",
    status: "CLOSED",
    created: "02 Jun 2025",
    updated: "25 Jun 2025",
  },
  {
    id: "C-10232",
    title: "Commercial contract dispute",
    client: "Bahr Adam",
    lawyer: "Bahr Adam",
    category: "Commercial",
    status: "PENDING",
    created: "02 Jun 2025",
    updated: "25 Jun 2025",
  },
  {
    id: "C-10233",
    title: "Commercial contract dispute",
    client: "Bahr Adam",
    lawyer: "Bahr Adam",
    category: "Commercial",
    status: "FLAGGED",
    created: "02 Jun 2025",
    updated: "25 Jun 2025",
  },
  {
    id: "C-10234",
    title: "Commercial contract dispute",
    client: "Bahr Adam",
    lawyer: "Bahr Adam",
    category: "Commercial",
    status: "ACTIVE",
    created: "02 Jun 2025",
    updated: "25 Jun 2025",
  },
  {
    id: "C-10235",
    title: "Commercial contract dispute",
    client: "Bahr Adam",
    lawyer: "Bahr Adam",
    category: "Commercial",
    status: "SUSPENDED",
    created: "02 Jun 2025",
    updated: "25 Jun 2025",
  },
  {
    id: "C-10236",
    title: "Commercial contract dispute",
    client: "Bahr Adam",
    lawyer: "Bahr Adam",
    category: "Commercial",
    status: "CLOSED",
    created: "02 Jun 2025",
    updated: "25 Jun 2025",
  },
  {
    id: "C-10237",
    title: "Commercial contract dispute",
    client: "Bahr Adam",
    lawyer: "Bahr Adam",
    category: "Commercial",
    status: "CLOSED",
    created: "02 Jun 2025",
    updated: "25 Jun 2025",
  },
];

const CASE_COLUMNS = [
  "Name",
  "Specialty",
  "Active Cases",
  "Rating",
  "Subscription",
  "Status",
  "Created Date",
  "Last Update",
  "Actions",
];

const Lawyer = () => {
  const router = useRouter();
  const getItems = (row, actions) => [
    {
      label: "View Details",
      icon: Eye,
      color: "text-gray-700",
      hover: "hover:bg-gray-50",
      action: () => {
        router.push(`/admin-dashboard/lawyer-management/${row.id}`);
        actions.closeMenu();
      },
    },
    {
      label: "Force Close",
      icon: X,
      color: "text-gray-700",
      hover: "hover:bg-gray-50",
      action: () => actions.handleForceClose(row.id),
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
  return (
    <div>
      {/* Top 4 stat cards */}
      <StatsCards stats={CASE_STATS} />
      <CaseTable
        STATUS_FILTERS={STATUS_FILTERS}
        statusConfig={statusConfig}
        INITIAL_CASES={INITIAL_CASES}
        CASE_COLUMNS={CASE_COLUMNS}
        getItems={getItems}
      />
    </div>
  );
};

export default Lawyer;
