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
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteCase,
  ForceClose,
  GetCase,
  GetOverFlowCase,
} from "@/lib/CaseManagement";
import { GetClientOverview, GetmyCases } from "@/lib/ClientManagement";

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

const CASE_COLUMNS = [
  "Case ID",
  "Case Title",
  "Client Name",
  "Lawyer Name",
  "Category",
  "Status",
  "Created Date",
  "Last Update",
  "Actions",
];

const CaseManagement = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { OverviewData, DataCases } = useSelector((state) => state.ClientRTK);
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
  const router = useRouter();
  const getItems = (row, actions) => [
    {
      label: "View Details",
      icon: Eye,
      color: "text-gray-700",
      hover: "hover:bg-gray-50",
      action: () => {
        router.push(`/user-dashboard/case-management/${row.id}`);
        actions.closeMenu();
      },
    },

    // Only show Force Close if case is not closed
    ...(row.status?.toUpperCase() !== "CLOSED"
      ? [
          {
            label: "Force Close",
            icon: X,
            color: "text-gray-700",
            hover: "hover:bg-gray-50",
            action: async () => {
              const result = await dispatch(ForceClose(row.id));
              if (ForceClose.fulfilled.match(result)) {
                actions.closeMenu();
              }
            },
          },
        ]
      : []),

    {
      label: "Delete Case",
      icon: Trash2,
      color: "text-red-500",
      hover: "hover:bg-red-50",
      action: async () => {
        const result = await dispatch(DeleteCase(row.id));
        if (DeleteCase.fulfilled.match(result)) {
          actions.closeMenu();
        }
      },
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetmyCases(user.id));
    dispatch(GetOverFlowCase());
    dispatch(GetClientOverview(user.id));
  }, [dispatch]);

  return (
    <div>
      {/* Top 4 stat cards */}
      <StatsCards stats={CASE_STATS} />
      <CaseTable
        STATUS_FILTERS={STATUS_FILTERS}
        getItems={getItems}
        statusConfig={statusConfig}
        INITIAL_CASES={DataCases}
        CASE_COLUMNS={CASE_COLUMNS}
        type="case"
      />
    </div>
  );
};

export default CaseManagement;
