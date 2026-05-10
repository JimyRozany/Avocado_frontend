"use client";

import { useState, useRef, Activity } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LawyerSummaryCard from "@/components/Admin/LawyerDetails/Lawyersummarycard";
import WarningsHistoryCard from "@/components/Admin/LawyerDetails/Warningshistorycard";
import NotificationSettingsCard from "@/components/Admin/LawyerDetails/Notificationsettingscard";
import SubscriptionInfoCard from "@/components/Admin/LawyerDetails/Subscriptioninfocard";
import DocumentsCard from "@/components/Admin/LawyerDetails/Documentscard";
import ReviewsListCard from "@/components/Admin/LawyerDetails/Reviewslistcard";
import { useParams } from "next/navigation";
import StatsCards from "@/components/Admin/Home/StatsCards";
import { Clock, Folder, Shield } from "lucide-react";

const getMockClientData = (id) => ({
  avatarUrl: "", // or a real URL
  summary: {
    fullName: "James A. Hartwell",
    email: "james.hartwell@lawfirm.com",
    bio: "Experienced litigation attorney specializing in corporate law and dispute resolution with over a decade of practice in federal and state courts.",
    phone: "+1 (555) 012-3456",
    barNumber: "BAR-2024-0091",
    yearsExp: "12",
    specialty: "Corporate Litigation",
    officeLocation: "New York, NY",
    accountStatus: "Active",
  },
  subscription: {
    planName: "Professional",
    planBadge: "Pro",
    status: "Active",
    startDate: "2024-01-01",
    expiryDate: "2025-01-01",
    accountSetting: "Auto-renew enabled",
  },
  documents: [
    { name: "Bar_Certificate_2024.pdf", size: "1.2 MB", date: "12 Jun 2025" },
    { name: "License_Renewal.pdf", size: "890 KB", date: "10 Jun 2025" },
    { name: "Insurance_Policy.pdf", size: "2.1 MB", date: "08 Jun 2025" },
    { name: "Court_Credentials.pdf", size: "540 KB", date: "05 Jun 2025" },
  ],
  warnings: [
    { id: "WRN-1021", reason: "Late response to client inquiry exceeding 48 hours", sentBy: "Admin", date: "12 Jun 2025", status: "Resolved" },
    { id: "WRN-1022", reason: "Late response to urgent case update", sentBy: "Admin", date: "12 Jun 2025", status: "Active" },
    { id: "WRN-1023", reason: "Late response to document submission deadline", sentBy: "Admin", date: "12 Jun 2025", status: "Resolved" },
  ],
  reviews: [
    { clientName: "Bahr Adam", rating: 4.5, comment: "Very professional and thorough in every aspect of my case.", caseId: "C-10231", date: "12 Jun 2025" },
    { clientName: "Sarah Miller", rating: 5, comment: "Exceptional service, would highly recommend to anyone.", caseId: "C-10198", date: "08 Jun 2025" },
    { clientName: "Omar Hassan", rating: 4, comment: "Good communication throughout the legal process.", caseId: "C-10150", date: "01 Jun 2025" },
  ],
  notifications: {
    emailNotifications: true,
    newCaseCreated: true,
    messages: true,
    reviews: false,
    paymentReceived: false,
    systemAlerts: false,
  },
});

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

export default function ClientProfile() {
    const {clientID} = useParams()
     const data = getMockClientData(clientID);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(data);
  const [tempData, setTempData] = useState(data);

  const handleEdit = () => {
    setTempData(formData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setFormData(tempData);
    setIsEditing(false);
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

  const handleNotificationChange = (key, value) => {
    setTempData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
  };

  const handleImageChange = (newImage) => {
    setTempData((prev) => ({ ...prev, avatarUrl: newImage }));
  };

  const handleDocumentUpload = (newDoc) => {
    setTempData((prev) => ({
      ...prev,
      documents: [...(prev.documents || []), newDoc],
    }));
  };

  const handleDocumentDelete = (index) => {
    setTempData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  const currentData = isEditing ? tempData : formData;

  return (
    <div className=" font-['Instrument_Sans',sans-serif]">
      {/* Top Bar */}
      <StatsCards stats={CASE_STATS} />
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
            />
            <WarningsHistoryCard warnings={currentData.warnings} />
            <NotificationSettingsCard
              notifications={currentData.notifications}
              isEditing={isEditing}
              onChange={handleNotificationChange}
            />
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
            <DocumentsCard
              documents={currentData.documents}
              isEditing={isEditing}
              onUpload={handleDocumentUpload}
              onDelete={handleDocumentDelete}
            />
            <ReviewsListCard reviews={currentData.reviews} />
          </div>
        </div>
      </div>
    </div>
  );
}
