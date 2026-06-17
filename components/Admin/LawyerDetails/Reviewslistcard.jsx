"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg
        key={s}
        className={`w-3 h-3 ${s <= Math.round(rating) ? "text-amber-400" : "text-stone-200"}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

export default function ReviewsListCard({ reviews = [] }) {
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : 0;
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <motion.div
      layout
      className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-stone-800 tracking-tight">
            Reviews List
          </h2>
          <p className="text-xs text-stone-400 mt-0.5">
            {reviews.length} client reviews
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full">
          <svg
            className="w-3.5 h-3.5 text-amber-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-xs font-bold text-amber-700">{avgRating}</span>
        </div>
      </div>

      <div className="overflow-x-auto -mx-2">
        <table className="w-full min-w-120 text-sm">
          <thead>
            <tr className="border-b border-stone-100">
              {["Client Name", "Rating", "Comment", "Date"].map((h) => (
                <th
                  key={h}
                  className="text-left py-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-stone-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reviews.map((r, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="border-b border-stone-50 hover:bg-stone-50/60 transition-colors"
              >
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#c8a96e]/20 flex items-center justify-center shrink-0 overflow-hidden">
                      {r?.reviewer?.image ? (
                        <Image
                          src={r?.reviewer?.image}
                          alt={r?.reviewer?.name || "User"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[10px] font-bold text-[#c8a96e]">
                          {r?.reviewer?.name?.charAt(0) || "?"}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-stone-700 whitespace-nowrap">
                      {r?.reviewer?.name}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-stone-700">
                      {r?.rating}
                    </span>
                    <StarRating rating={r?.rating} />
                  </div>
                </td>
                <td className="py-3 px-3 max-w-35">
                  <span
                    className="block truncate text-xs text-stone-500"
                    title={r?.comment}
                  >
                    {r?.comment}
                  </span>
                </td>
                <td className="py-3 px-3 text-xs text-stone-400 whitespace-nowrap">
                  {formatDate(r?.created_at)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
