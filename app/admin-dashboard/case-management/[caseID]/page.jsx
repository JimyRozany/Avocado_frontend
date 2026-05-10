"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import ActionMenu from "@/components/Admin/CaseDetails/ActionMenu";
import CaseSummary from "@/components/Admin/CaseDetails/CaseSummary";
import SessionsPanel from "@/components/Admin/CaseDetails/Sessionspanel";
import DocumentsPanel from "@/components/Admin/CaseDetails/DocumentsPanel";
import RequestClosureModal from "@/components/Admin/CaseDetails/RequestClosureModal";
import SessionUpdateModal from "@/components/Admin/CaseDetails/SessionUpdateModal";
import ClientLawyerModal from "@/components/Admin/CaseDetails/Clientlawyermodal";
import CreateCaseModal from "@/components/Admin/CaseDetails/CreateCaseModal";

const steps = ["Case Created", "Lawyer Assigned", "In Progress", "Closed"];

export default function CaseDetails() {
    const {caseID} = useParams()
  const [activeStep] = useState(2); // 0-indexed, "In Progress"
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showClientLawyerModal, setShowClientLawyerModal] = useState(false);
  const [showClosureModal, setShowClosureModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDocUploadModal, setShowDocUploadModal] = useState(false);

  return (
    <div className="">
      {/* Top bar */}

      <div className="px-6 pb-2">
        {/* Header */}


        {/* Progress Steps */}
        <div className="mt-6 mb-8">
          <div className="relative flex items-center justify-between w-[80%] mx-auto">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200" />
            <div
              className="absolute top-4 left-0 h-0.5 bg-amber-400 transition-all duration-700"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((step, i) => (
              <div key={step} className="relative flex flex-col items-center gap-2 z-10">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    i <= activeStep
                      ? "border-amber-400 bg-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {i < activeStep && (
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                  )}
                  {i === activeStep && (
                    <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </motion.div>
                <span className={`text-xs font-medium whitespace-nowrap ${i <= activeStep ? "text-gray-800" : "text-gray-400"}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mb-5 relative">
          <div className="relative">
            <button
              onClick={() => setShowActionMenu((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Action
            </button>
            <ActionMenu
              open={showActionMenu}
              onClose={() => setShowActionMenu(false)}
              onClientLawyer={() => { setShowClientLawyerModal(true); setShowActionMenu(false); }}
              onForceClose={() => { setShowClosureModal(true); setShowActionMenu(false); }}
            />
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gray-900 hover:bg-gray-700 transition shadow-sm"
          >
            <span className="text-lg leading-none">+</span>
            Create
          </button>
        </div>

        {/* Three-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 pb-10">
          <CaseSummary />
          <DocumentsPanel onUpload={() => setShowDocUploadModal(true)} />
          <SessionsPanel onUpload={() => setShowSessionModal(true)} />
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showClientLawyerModal && (
          <ClientLawyerModal onClose={() => setShowClientLawyerModal(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showClosureModal && (
          <RequestClosureModal onClose={() => setShowClosureModal(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(showSessionModal || showDocUploadModal) && (
          <SessionUpdateModal
            mode={showDocUploadModal ? "document" : "session"}
            onClose={() => { setShowSessionModal(false); setShowDocUploadModal(false); }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCreateModal && (
          <CreateCaseModal onClose={()=>setShowCreateModal(false)}/>
        )}
      </AnimatePresence>
    </div>
  );
}