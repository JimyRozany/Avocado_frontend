"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Footer from "@/components/Website/Footer";
import Navbar from "@/components/Website/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CreateRating, GetLawyer } from "@/lib/LawyerManagement";
import DefaultUser from "../../public/Image/DefaultUser.jpg";
import { CreateCase } from "@/lib/CaseManagement";
import { ClipLoader } from "react-spinners";
export default function LawyersSection() {
  const { LawyerData, loading, LoadingRating } = useSelector(
    (state) => state.LawyerRTK,
  );

  const dispatch = useDispatch();
  const [showRateModal, setShowRateModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [comment, setComment] = useState("");
  const [formData, setFormData] = useState({
    case_number: "",
    title: "",
    type: "",
    court_name: "",
  });
  const user = JSON.parse(localStorage.getItem("user"));
  const [document, setDocument] = useState(null);
  useEffect(() => {
    dispatch(GetLawyer());
  }, [dispatch]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setDocument(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedLawyer) return;

    const data = new FormData();

    data.append("case_number", formData.case_number);
    data.append("title", formData.title);
    data.append("type", formData.type);
    data.append("court_name", formData.court_name);
    data.append("lawyer_id", selectedLawyer?.id);

    if (document) {
      data.append("document", document);
    }

    const result = await dispatch(CreateCase(data));
    if (CreateCase.fulfilled.match(result)) {
      setFormData({
        case_number: "",
        title: "",
        type: "",
        court_name: "",
      });
      setSelectedLawyer(null);
    }
  };

  const HandleRating = async () => {
    if (LoadingRating) {
      return;
    }
    const ratingData = {
      reviewed_id: selectedLawyer?.id,
      rating,
      comment,
    };

    const result = await dispatch(CreateRating(ratingData));
    if (CreateRating.fulfilled.match(result)) {
      setShowRateModal(false);
      setRating(0);
      setComment("");
    }
  };
  return (
    <>
      <Navbar />

      <section className="bg-black px-4 py-20 text-white md:px-10 min-h-screen">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h1 className="text-4xl font-semibold md:text-5xl">
              Find a Lawyer
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              Home / <span className="text-yellow-400">Find a Lawyer</span>
            </p>
          </motion.div>

          {/* Title Row */}
          <div className="mt-24 flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <motion.h2
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="max-w-2xl text-3xl font-light leading-tight md:text-5xl"
            >
              Trusted For Decades...
              <br />
              Engineered For The Digital Age.
            </motion.h2>
          </div>

          {/* Loading */}
          {loading && (
            <div className="mt-20 text-center text-gray-400">
              Loading lawyers...
            </div>
          )}

          {/* Lawyers Grid */}
          <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {LawyerData?.data?.data?.map((lawyer, index) => (
              <motion.div
                key={lawyer.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.2 },
                }}
                onClick={() =>
                  user.type === "client" &&
                  setSelectedLawyer({
                    ...lawyer,
                    image: lawyer.image ? lawyer.image : DefaultUser,
                  })
                }
                className="group cursor-pointer"
              >
                {/* Image */}
                <div className="overflow-hidden rounded-lg bg-[#111]">
                  {lawyer.image ? (
                    <Image
                      src={lawyer.image}
                      alt={lawyer.name}
                      width={400}
                      height={300}
                      className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <Image
                      src={DefaultUser}
                      alt="DefaultUser"
                      width={400}
                      height={300}
                      className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-medium">{lawyer.name}</h3>

                    <p className="mt-1 text-sm text-yellow-400">
                      {lawyer.role}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm">{lawyer.rating || "4.9"}</span>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-gray-400">
                  Click to view lawyer details and book a consultation.
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Popup Modal */}
        <AnimatePresence>
          {selectedLawyer && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedLawyer(null)}
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              />

              {/* Modal */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  y: 50,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  y: 50,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                className="fixed left-1/2 top-1/2 z-60 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-800 bg-[#111] p-6 shadow-2xl"
              >
                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  <input
                    type="text"
                    name="case_number"
                    placeholder="Case Number"
                    value={formData.case_number}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-700 bg-[#1a1a1a] p-3 text-white"
                    required
                  />

                  <input
                    type="text"
                    name="title"
                    placeholder="Case Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-700 bg-[#1a1a1a] p-3 text-white"
                    required
                  />

                  <input
                    type="text"
                    name="type"
                    placeholder="Case Type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-700 bg-[#1a1a1a] p-3 text-white"
                    required
                  />

                  <input
                    type="text"
                    name="court_name"
                    placeholder="Court Name"
                    value={formData.court_name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-700 bg-[#1a1a1a] p-3 text-white"
                    required
                  />

                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full rounded-lg border border-gray-700 bg-[#1a1a1a] p-3 text-white"
                  />

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => {
                        // router.push(`/book-lawyer/${selectedLawyer.id}`);
                      }}
                      className="flex-1 rounded-lg bg-yellow-400 px-4 py-3 font-semibold text-black transition hover:bg-yellow-300"
                    >
                      Book Lawyer
                    </button>

                    <div
                      onClick={() => {
                        setShowRateModal(true);
                      }}
                      className="flex-1 rounded-lg border mx-auto text-center cursor-pointer border-yellow-400 px-4 py-3 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                    >
                      Rate Lawyer
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedLawyer(null)}
                    className="mt-3 w-full rounded-lg border  mx-auto text-center cursor-pointer border-gray-700 px-4 py-3 text-gray-300 transition hover:bg-gray-800"
                  >
                    Close
                  </div>
                </form>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        {showRateModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-70 bg-black/70 backdrop-blur-sm"
              onClick={() => setShowRateModal(false)}
            />

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 50,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                y: 50,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="fixed left-1/2 top-1/2 z-80 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-800 bg-[#111] p-6 shadow-2xl"
            >
              <div className="text-center">
                <Image
                  src={selectedLawyer?.image}
                  alt={selectedLawyer?.name}
                  width={80}
                  height={80}
                  className="mx-auto h-20 w-20 rounded-full object-cover"
                />

                <h2 className="mt-4 text-2xl font-semibold">
                  Rate {selectedLawyer?.name}
                </h2>

                <p className="mt-2 text-sm text-gray-400">
                  Share your experience with this lawyer
                </p>

                <div className="mt-6 flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                    >
                      <Star
                        size={34}
                        fill={star <= rating ? "#FACC15" : "transparent"}
                        className={
                          star <= rating ? "text-yellow-400" : "text-gray-500"
                        }
                      />
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your comment..."
                    rows={4}
                    className="w-full rounded-lg border border-gray-700 bg-[#1a1a1a] p-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <button
                  onClick={() => HandleRating()}
                  className="mt-6 w-full rounded-lg bg-yellow-400 cursor-pointer px-4 py-3 font-semibold text-black transition hover:bg-yellow-300"
                >
                  {LoadingRating && (
                    <ClipLoader
                      size={16}
                      color="#000"
                      className="relative top-1 mr-1"
                    />
                  )}
                  Submit Rating
                </button>

                <button
                  onClick={() => {
                    setShowRateModal(false);
                    setRating(0);
                  }}
                  className="mt-3 w-full rounded-lg border cursor-pointer border-gray-700 px-4 py-3 text-gray-300 transition hover:bg-gray-800"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </section>

      <Footer />
    </>
  );
}
