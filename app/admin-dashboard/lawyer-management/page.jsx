"use client";
import CaseTable from "@/components/Admin/CaseManagement/CaseTable";
import StatsCards from "@/components/Admin/Home/StatsCards";
import { ActiveLawyer, GetLawyer } from "@/lib/LawyerManagement";
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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

const CASE_COLUMNS = [
  "Name",
  "Email",
  "Active Cases",
  "Rating",
  "Status",
  "Created Date",
  "Last Update",
  "Actions",
];

const Lawyer = () => {
  const { LawyerData } = useSelector((state) => state.LawyerRTK);

  const router = useRouter();
  const dispatch = useDispatch();

  const getItems = (row, actions) => {
    console.log(row);
    
    const items = [
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
        color: "text-yellow-700",
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

    // 👇 يظهر فقط لو الحساب غير مفعل
    const isNotVerified = !row.email_verified_at;
    console.log(row.email_verified_at);
    
    if (isNotVerified) {
      items.splice(3, 0, {
        label: "Active Lawyer",
        icon: Shield,
        color: "text-green-700",
        hover: "hover:bg-green-50",
        action: async () => {
          const result = await dispatch(ActiveLawyer(row.id));

          if (ActiveLawyer.fulfilled.match(result)) {
            actions.showToast("Activated successfully", "success");
            actions.closeMenu();
          }
        },
      });
    }

    return items;
  };

  useEffect(() => {
    dispatch(GetLawyer());
  }, [dispatch]);

  return (
    <div>
      {/* Top 4 stat cards */}
      <StatsCards stats={CASE_STATS} />

      <CaseTable
        STATUS_FILTERS={STATUS_FILTERS}
        statusConfig={statusConfig}
        INITIAL_CASES={LawyerData?.data || []}
        CASE_COLUMNS={CASE_COLUMNS}
        getItems={getItems}
        type="lawyer"
      />
    </div>
  );
};

export default Lawyer;