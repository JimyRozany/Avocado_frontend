"use client";
import CaseTable from "@/components/Admin/CaseManagement/CaseTable";
import StatsCards from "@/components/Admin/Home/StatsCards";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  Clock,
  Eye,
  Folder,
  Shield,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  ActiveClient,
  DeleteClient,
  GetClient,
  GetClientOverviewAll,
  GetMyClient,
} from "@/lib/ClientManagement";
import { ClipLoader } from "react-spinners";
import { AnimatePresence, motion } from "framer-motion";
import {
  CreateWarning,
  GetLawyerOverviewSepcial,
} from "@/lib/LawyerManagement";

const STATUS_FILTERS = [
  "ALL",
  "CLOSED",
  "PENDING",
  "FLAGGED",
  "ACTIVE",
  "SUSPENDED",
];

const statusConfig = {
  ACTIVE: "bg-green-100 text-green-700",
  INACTIVE: "bg-red-100 text-red-700",
};

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

const Case = () => {
  const { ClientDataDetails, loading, ClientData, OverviewDataAll } =
    useSelector((state) => state.ClientRTK);
  const { loadingWarning, OverviewData } = useSelector(
    (state) => state.LawyerRTK,
  );
    const [user, setuser] = useState("");

useEffect(() => {
  setuser(JSON.parse(localStorage.getItem("user")) || "");
}, []);
  const [warningOpen, setWarningOpen] = useState(false);
  const [warningText, setWarningText] = useState("");
  const [selectedLawyerId, setSelectedLawyerId] = useState(null);
  const router = useRouter();
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

  const getItems = (row, actions) => {
    const items = [
      {
        label: "View Details",
        icon: Eye,
        color: "text-gray-700",
        hover: "hover:bg-gray-50",
        action: () => {
          router.push(`/lawyer-dashboard/client-management/${row.id}`);
          actions.closeMenu();
        },
      },
      {
        label: "Send Warning",
        icon: AlertTriangle,
        color: "text-yellow-700",
        hover: "hover:bg-orange-50",
        action: () => {
          setSelectedLawyerId(row.id);
          setWarningOpen(true);
          actions.closeMenu();
        },
      },
    ];

    const isNotActive = row.is_active;

    if (isNotActive == 0) {
      items.splice(3, 0, {
        label: "Activate Client",
        icon: Shield,
        color: "text-green-700",
        hover: "hover:bg-green-50",
        action: async () => {
          const result = await dispatch(ActiveClient(row.id));

          if (ActiveClient.fulfilled.match(result)) {
            actions.showToast("Activated successfully", "success");
            actions.closeMenu();
          }
        },
      });
    }

    return items;
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetMyClient(user?.id));
    dispatch(GetLawyerOverviewSepcial());
  }, [dispatch]);

  const HandleWarning = async () => {
    if (loadingWarning) {
      return;
    }
    const data = {
      user_id: selectedLawyerId,
      reason: warningText,
    };
    const result = await dispatch(CreateWarning(data));
    if (CreateWarning.fulfilled.match(result)) {
      setWarningOpen(false);
      setWarningText("");
    }
  };

  return (
    <>
      <div>
        {/* Top 4 stat cards */}
        <StatsCards stats={stats} />
        <CaseTable
          STATUS_FILTERS={STATUS_FILTERS}
          getItems={getItems}
          statusConfig={statusConfig}
          INITIAL_CASES={ClientData.clients}
          CASE_COLUMNS={CASE_COLUMNS}
          type="client"
          active="lawyer"
        />
      </div>
      <AnimatePresence>
        {warningOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={() => {
              setWarningOpen(false);
              setWarningText("");
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-130 rounded-2xl bg-white shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="px-5 py-4 bg-gray-50">
                <h2 className="text-lg font-semibold text-gray-800">
                  Send Warning
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Write a clear reason before sending the warning
                </p>
              </div>

              {/* Body */}
              <div className="p-5">
                <label className="text-sm text-gray-600 mb-2 block">
                  Warning reason
                </label>

                <textarea
                  className="w-full h-28 resize-none rounded-xl border border-gray-200 p-3 text-sm outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition"
                  placeholder="Type the reason here..."
                  value={warningText}
                  onChange={(e) => setWarningText(e.target.value)}
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-2 px-5 py-4 bg-gray-50">
                <button
                  className="px-4 py-2 rounded-lg text-sm bg-white border border-gray-400 hover:bg-gray-100 transition"
                  onClick={() => {
                    setWarningOpen(false);
                    setWarningText("");
                  }}
                >
                  Cancel
                </button>

                <button
                  disabled={!warningText.trim()}
                  className="px-4 py-2 rounded-lg text-sm bg-yellow-500 text-white hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  onClick={() => {
                    HandleWarning();
                  }}
                >
                  {loadingWarning && (
                    <ClipLoader
                      size={16}
                      color="#fff"
                      className="relative top-1 mr-1"
                    />
                  )}
                  Send Warning
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Case;
