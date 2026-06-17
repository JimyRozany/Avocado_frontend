"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LawyerSummaryCard from "@/components/Admin/LawyerDetails/Lawyersummarycard";
import WarningsHistoryCard from "@/components/Admin/LawyerDetails/Warningshistorycard";
import NotificationSettingsCard from "@/components/Admin/LawyerDetails/Notificationsettingscard";
import SubscriptionInfoCard from "@/components/Admin/LawyerDetails/Subscriptioninfocard";
import DocumentsCard from "@/components/Admin/LawyerDetails/Documentscard";
import ReviewsListCard from "@/components/Admin/LawyerDetails/Reviewslistcard";
import { useParams } from "next/navigation";
import StatsCards from "@/components/Admin/Home/StatsCards";
import { Activity, Clock, Folder, Shield } from "lucide-react";
import {
  GetClientDetails,
  GetClientOverview,
  GetWarningUser,
  UpdateClient,
} from "@/lib/ClientManagement";

import { useDispatch, useSelector } from "react-redux";

const mapLawyerData = (apiData) => {
  return {
    avatarUrl: apiData.image || "",
    summary: {
      fullName: apiData.name || "",
      email: apiData.email || "",
      bio: apiData.bio || "",
      phone: apiData.mobile || "",
      barNumber: apiData.bar_association_number || "",
      yearsExp: apiData.years_of_experience || "",
      specialty: apiData.specialty || "",
      officeLocation: apiData.office_location || "",
      accountStatus: apiData.is_active ? "Active" : "Inactive",
    },

    subscription: {
      planName: "Professional",
      planBadge: "Pro",
      status: "Active",
      startDate: "2024-01-01",
      expiryDate: "2025-01-01",
      accountSetting: "Auto-renew enabled",
    },
    warnings: Array.isArray(apiData?.warnings)
      ? apiData?.warnings.map((w, index) => ({
          id: w.id || `WRN-${index + 1000}`,
          warning_id: w.warning_id || `WRN-${index + 1000}`,
          reason: w.reason || w.message || "",
          sentBy: w.sender?.name || w.sentBy || "Admin",
          date: w.created_at
            ? new Date(w.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "",
          status: w.status || "Active",
        }))
      : [],
    reviews: [
      {
        clientName: "Bahr Adam",
        rating: 4.5,
        comment: "Very professional and thorough in every aspect of my case.",
        caseId: "C-10231",
        date: "12 Jun 2025",
      },
      {
        clientName: "Sarah Miller",
        rating: 5,
        comment: "Exceptional service, would highly recommend to anyone.",
        caseId: "C-10198",
        date: "08 Jun 2025",
      },
      {
        clientName: "Omar Hassan",
        rating: 4,
        comment: "Good communication throughout the legal process.",
        caseId: "C-10150",
        date: "01 Jun 2025",
      },
    ],
    notifications: {
      emailNotifications: true,
      newCaseCreated: true,
      messages: true,
      reviews: false,
      paymentReceived: false,
      systemAlerts: false,
    },
  };
};

export default function ClientProfile() {
  const { ClientDataDetails, OverviewData , WarningData, loadingWarning} = useSelector(
    (state) => state.ClientRTK,
  );

  const user = JSON.parse(localStorage.getItem("user"));
  const [avatarFile, setAvatarFile] = useState(null);
  const dispatch = useDispatch();
  const { clientID } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(() =>
    mapLawyerData(ClientDataDetails),
  );
  const [tempData, setTempData] = useState(() =>
    mapLawyerData(ClientDataDetails),
  );

  const overview = OverviewData?.data;
  const CASE_STATS = useMemo(() => {
    if (!overview) return [];

    return [
      {
        label: "Total Cases",
        value: overview.totalCases,
        change: "0%",
        icon: Folder,
        dark: true,
      },
      {
        label: "Pending",
        value: overview.pendingCases,
        change: "0%",
        icon: Clock,
        dark: false,
      },
      {
        label: "Active",
        value: overview.activeCases,
        change: "0%",
        icon: Activity,
        dark: false,
      },
      {
        label: "Closed",
        value: overview.closedCases,
        change: "0%",
        icon: Shield,
        dark: false,
      },
    ];
  }, [overview]);

  useEffect(() => {
    if (ClientDataDetails) {
      const mapped = mapLawyerData({
        ...ClientDataDetails,
        warnings: WarningData?.warnings || [],
      });

      setFormData(mapped);
      setTempData(mapped);
    }
  }, [ClientDataDetails, WarningData?.warnings]);

  useEffect(() => {
    dispatch(GetClientDetails(clientID));
    dispatch(GetClientOverview(clientID));
    // dispatch(GetDocument());
    dispatch(GetWarningUser(clientID));
  }, [dispatch, clientID]);

  const handleEdit = () => {
    setTempData(formData);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      const summary = tempData?.summary;
      formData.append("name", summary.fullName || "");
      formData.append("bar_association_number", summary.barNumber || "");
      formData.append("email", summary.email || "");
      formData.append("mobile", summary.phone || "");
      formData.append("bio", summary.bio || "");
      formData.append("office_location", summary.officeLocation || "");
      formData.append("specialty", summary.specialty || "");
      formData.append("years_of_experience", summary.yearsExp || "");
      formData.append("_method", "PUT" || "");
      // لو عندك صورة (file أو url حسب النظام عندك)
      if (avatarFile instanceof File) {
        formData.append("image", avatarFile);
      }

      // password غالبًا optional — ابعته فقط لو موجود
      if (summary.password) {
        formData.append("password", summary.password);
      }

      await dispatch(
        UpdateClient({
          id: clientID,
          data: formData,
        }),
      );
      setFormData(tempData);
      setIsEditing(false);
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const handleCancel = () => {
    setTempData(formData);
    setIsEditing(false);
  };

  const handleFieldChange = (section, field, value) => {
    setTempData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleImageChange = (file, previewUrl) => {
    setAvatarFile(file);

    setTempData((prev) => ({
      ...prev,
      avatarUrl: previewUrl,
    }));
  };

  const currentData = isEditing ? tempData : formData;

  return (
    <div className=" font-['Instrument_Sans',sans-serif]">
      {/* Top Bar */}
      <StatsCards stats={CASE_STATS} />
      {user?.type !== "admin" && (
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200  py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AnimatePresence mode="wait">
              {!isEditing ? (
                <motion.button
                  key="edit"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.18 }}
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1a] text-white text-sm font-semibold rounded-lg hover:bg-[#2d2d2d] transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Edit Profile
                </motion.button>
              ) : (
                <motion.div
                  key="actions"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center gap-2"
                >
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-5 py-2.5 border border-stone-300 text-stone-600 text-sm font-semibold rounded-lg hover:bg-stone-100 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#c8a96e] text-white text-sm font-semibold rounded-lg hover:bg-[#b8964f] transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Save Changes
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Edit Mode Banner */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="bg-amber-50 border-b border-amber-200 px-8 py-2.5 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <p className="text-sm text-amber-700 font-medium">
                You re currently editing — make your changes and press Save when
                done.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <div className="w-full mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <LawyerSummaryCard
              data={currentData}
              isEditing={isEditing}
              onChange={(field, value) =>
                handleFieldChange("summary", field, value)
              }
              onImageChange={handleImageChange}
              type="client"
            />
            <WarningsHistoryCard warnings={currentData.warnings} />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            <SubscriptionInfoCard
              data={currentData.subscription}
              isEditing={isEditing}
              onChange={(field, value) =>
                handleFieldChange("subscription", field, value)
              }
            />
            {/* <ReviewsListCard reviews={currentData.reviews} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
