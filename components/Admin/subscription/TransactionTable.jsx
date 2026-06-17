"use client";

import { motion } from "framer-motion";

const transactions = [
  {
    id: "TXN-1001",
    lawyer: "Bahr Adam",
    plan: "Pro",
    amount: "500 EG",
    status: "Closed",
  },
  {
    id: "TXN-1002",
    lawyer: "Bahr Adam",
    plan: "Premium",
    amount: "900 EG",
    status: "Pending",
  },
  {
    id: "TXN-1003",
    lawyer: "Bahr Adam",
    plan: "Basic",
    amount: "300 EG",
    status: "Active",
  },
  {
    id: "TXN-1004",
    lawyer: "Bahr Adam",
    plan: "Pro",
    amount: "500 EG",
    status: "Flagged",
  },
];

function StatusBadge({ status }) {
  const styles = {
    Closed:
      "bg-green-50 text-green-600 border-green-200",

    Pending:
      "bg-yellow-50 text-yellow-600 border-yellow-200",

    Active:
      "bg-blue-50 text-blue-600 border-blue-200",

    Flagged:
      "bg-red-50 text-red-600 border-red-200",

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

export default function TransactionTable() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-[18px] font-semibold text-gray-900">
          Subscription Transactions
        </h2>

        <p className="text-[13px] text-gray-400 mt-1">
          Monitor subscription payments and transaction activity
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500">
                Transaction ID
              </th>

              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500">
                Lawyer
              </th>

              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500">
                Plan
              </th>

              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500">
                Amount
              </th>

              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((item, index) => (
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
                className="
                  border-b
                  border-gray-100
                  hover:bg-gray-50
                  transition-colors
                "
              >
                <td className="px-6 py-5 text-gray-700 font-medium">
                  {item.id}
                </td>

                <td className="px-6 py-5 text-gray-600">
                  {item.lawyer}
                </td>

                <td className="px-6 py-5 text-gray-600">
                  {item.plan}
                </td>

                <td className="px-6 py-5 text-gray-600 font-medium">
                  {item.amount}
                </td>

                <td className="px-6 py-5">
                  <StatusBadge status={item.status} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}