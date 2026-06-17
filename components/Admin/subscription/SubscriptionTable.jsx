"use client";

import { motion } from "framer-motion";
import {
  Filter,
  Download,
  Plus,
} from "lucide-react";

import ActionDropdown from "./ActionDropdown";

const subscriptions = [
  {
    id: "S-10231",
    price: "500 EG",
    cycle: "Monthly",
    lawyer: "Bahr Adam",
    created: "02 Jun 2025",
    updated: "25 Jun 2025",
    status: "Closed",
  },
  {
    id: "S-10232",
    price: "500 EG",
    cycle: "Monthly",
    lawyer: "Bahr Adam",
    created: "02 Jun 2025",
    updated: "25 Jun 2025",
    status: "Pending",
  },
  {
    id: "S-10233",
    price: "500 EG",
    cycle: "Monthly",
    lawyer: "Bahr Adam",
    created: "02 Jun 2025",
    updated: "25 Jun 2025",
    status: "Flagged",
  },
  {
    id: "S-10234",
    price: "500 EG",
    cycle: "Monthly",
    lawyer: "Bahr Adam",
    created: "02 Jun 2025",
    updated: "25 Jun 2025",
    status: "Active",
  },
  {
    id: "S-10235",
    price: "500 EG",
    cycle: "Monthly",
    lawyer: "Bahr Adam",
    created: "02 Jun 2025",
    updated: "25 Jun 2025",
    status: "Suspended",
  },
];

function StatusBadge({ status }) {
  const styles = {
    Closed:
      "bg-green-50 text-green-600 border-green-200",
    Pending:
      "bg-yellow-50 text-yellow-600 border-yellow-200",
    Flagged:
      "bg-red-50 text-red-600 border-red-200",
    Active:
      "bg-blue-50 text-blue-600 border-blue-200",
    Suspended:
      "bg-gray-50 text-gray-500 border-gray-200",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        min-w-[95px]
        px-4
        py-1.5
        rounded-full
        border
        text-[11px]
        font-semibold
        uppercase
        tracking-wide
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}

export default function SubscriptionTable() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl">
      {/* Header */}
      <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100">
        <div>
          <h2 className="text-[18px] font-semibold text-gray-900">
            Subscription Plans
          </h2>

          <p className="text-[13px] text-gray-400 mt-1">
            See insights on how your subscriptions has
            grown and changed over time
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="h-9 px-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700">
            <Filter size={15} />
            Filter
          </button>

          <button className="h-9 px-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700">
            <Download size={15} />
            Export
          </button>

          <button className="h-9 px-4 rounded-lg bg-gray-900 text-white hover:bg-black flex items-center gap-2 text-sm">
            <Plus size={15} />
            Create
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto overflow-y-visible">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500">
                Plan Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500">
                Billing Cycle
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500">
                Lawyers
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500">
                Created Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500">
                Last Update
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {subscriptions.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="px-6 py-5 font-medium">
                  {item.id}
                </td>

                <td className="px-6 py-5">
                  {item.price}
                </td>

                <td className="px-6 py-5">
                  {item.cycle}
                </td>

                <td className="px-6 py-5">
                  {item.lawyer}
                </td>

                <td className="px-6 py-5">
                  {item.created}
                </td>

                <td className="px-6 py-5">
                  {item.updated}
                </td>

                <td className="px-6 py-5">
                  <StatusBadge
                    status={item.status}
                  />
                </td>

                <td className="px-6 py-5">
                  <ActionDropdown />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}