// components/LawLibrarySection.jsx
"use client";

import Footer from "@/components/Website/Footer";
import Navbar from "@/components/Website/Navbar";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

const categories = [
  "Commercial",
  "Criminal Law",
  "Family Law",
  "Real Estate",
  "Civil Law",
];

const laws = [
  {
    id: 1,
    category: "Commercial",
    title: "القانون المدني المصري - المادة 147",
    subtitle: "العقود والالتزامات / القانون المدني المصري",
    description:
      "العقد شريعة المتعاقدين، فلا يجوز نقضه ولا تعديله إلا باتفاق الطرفين أو للأسباب التي يقررها القانون.",
  },
  {
    id: 2,
    category: "Criminal Law",
    title: "قانون العقوبات - المادة 302",
    subtitle: "القانون الجنائي",
    description:
      "كل من أسند لغيره واقعة تستوجب عقابه أو احتقاره يعاقب وفقاً للقانون.",
  },
  {
    id: 3,
    category: "Family Law",
    title: "قانون الأسرة - المادة 18",
    subtitle: "الأحوال الشخصية",
    description:
      "تلتزم الدولة بحماية الأسرة ودعم استقرارها والمحافظة على قيمها.",
  },
];

export default function LawLibrarySection() {
  const [activeCategory, setActiveCategory] =
    useState("Commercial");

  const [showSearch, setShowSearch] = useState(false);

  const [search, setSearch] = useState("");

  // CATEGORY FILTER
  const categoryFiltered = laws.filter(
    (law) => law.category === activeCategory
  );

  // SEARCH FILTER
  const searchResults = useMemo(() => {
    if (!search.trim()) return [];

    return laws.filter((law) =>
      `${law.title} ${law.subtitle} ${law.description}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
   <>
   <Navbar/>
     <section className="bg-black px-4 py-20 text-white md:px-10">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h1 className="text-4xl font-semibold md:text-5xl">
            Law Library
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Home /{" "}
            <span className="text-yellow-400">
              Law Library
            </span>
          </p>
        </motion.div>

        {/* TOP SECTION */}
        <div className="mt-28 flex flex-col justify-between gap-10 lg:flex-row lg:items-start">
          {/* LEFT */}
          <div className="max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-3xl font-light leading-tight md:text-5xl"
            >
              Search And Browse Laws,
              <br />
              Articles, And Legal References.
            </motion.h2>

            {/* CATEGORY BUTTONS */}
            <div className="mt-10 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setShowSearch(false);
                  }}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-yellow-400 text-black"
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* SEARCH BUTTON */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black transition hover:bg-yellow-400"
          >
            <Search size={20} />
          </button>
        </div>

        {/* SEARCH BAR */}
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-14"
          >
            <div className="relative">
              <Search
                size={18}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                placeholder="Search laws, articles..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="h-16 w-full rounded-full border border-white/10 bg-[#111] px-14 text-white outline-none transition-all placeholder:text-gray-500 focus:border-yellow-400"
              />
            </div>
          </motion.div>
        )}

        {/* RESULTS */}
        <div
          className="
            mt-20
            max-h-150
            overflow-y-auto
            pr-3
            custom-scrollbar
          "
        >
          <div className="space-y-16">
            {(search.trim()
              ? searchResults
              : categoryFiltered
            ).map((law, index) => (
              <motion.div
                key={law.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h3 className="text-3xl font-medium leading-relaxed md:text-4xl">
                  {law.title}
                </h3>

                <p className="mt-3 text-sm text-yellow-400">
                  {law.subtitle}
                </p>

                <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-gray-300">
                  {law.description}
                </p>
              </motion.div>
            ))}

            {/* NO RESULTS */}
            {search.trim() &&
              searchResults.length === 0 && (
                <div className="py-20 text-center text-gray-500">
                  No laws found.
                </div>
              )}
          </div>
        </div>
      </div>
    </section>
   <Footer/>
   </>
  );
}