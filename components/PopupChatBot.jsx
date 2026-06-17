"use client";

import React, { useEffect, useRef, useState } from "react";
import BotSmall from "../public/Images/Support/whiteChatBot.svg";
import chatBotChat from "../public/Images/Support/AVOCHAT.png";
import SendIcon from "../public/Images/Support/SendIcon.svg";
import Attachment from "../public/Images/Support/Attachment.svg";
import { FiMinusCircle } from "react-icons/fi";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiCircle } from "react-icons/fi";
import { useSelector } from "react-redux";

const PopupChatBot = () => {
  const [showChat, setShowChat] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { token, loading } = useSelector((state) => state.UserRTK);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "مرحباً، أنا المساعد القانوني المصري. كيف يمكنني مساعدتك؟",
    },
  ]);

  const [input, setInput] = useState("");
  const [loadingChat, setLoadingChat] = useState(false);
  const [user, setUser] = useState();
  const messagesEndRef = useRef(null);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async (customMessage = null) => {
    const messageText = customMessage || input;

    if (!messageText.trim()) return;

    const userMessage = {
      role: "user",
      content: messageText,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoadingChat(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          history: messages.slice(-10),
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "حدث خطأ أثناء الاتصال بالخادم",
        },
      ]);
    }

    setLoadingChat(false);
  };
  return (
    <div dir="ltr">
      {/* Overlay */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setShowChat(false)}
          />
        )}
      </AnimatePresence>

      {/* Draggable Wrapper */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
        drag
        dragMomentum={false}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          setTimeout(() => setIsDragging(false), 0);
        }}
      >
        {/* Chat Popup */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 80, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="mb-4 w-90 h-145  bg-white rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.25)] relative"
            >
              {/* Header */}
              <div className="bg-linear-to-r from-black to-black py-5 drop-shadow-xl px-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center backdrop-blur-sm">
                    <Image src={chatBotChat} alt="bot" className="w-7 h-7" />
                  </div>

                  <div>
                    <h2 className="text-white text-lg font-semibold">
                      AVOCHAT
                    </h2>

                    <div className="flex items-center gap-1 mt-1">
                      <FiCircle className="text-[#3BFF3B] text-[10px] fill-[#3BFF3B]" />

                      <span className="text-xs text-[#3BFF3B]">Online</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowChat(false)}
                  className=" rounded-full  transition flex items-center cursor-pointer justify-center"
                >
                  <FiMinusCircle className="text-white text-2xl" />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="h-107.5 overflow-y-auto px-4 py-5 pb-10 bg-white">
                {messages.map((msg, index) => (
                  <div key={index}>
                    {msg.role === "assistant" ? (
                      <div className="flex flex-col items-start gap-2 mb-5">
                        <div className="flex items-center gap-2 text-[#262626] font-semibold">
                          <Image src={chatBotChat} alt="" className="w-7 h-7" />
                          <p>AVOCHAT</p>
                        </div>

                        <div className="bg-[#F5F5F5] max-w-[80%] px-4 py-3 rounded-2xl rounded-bl-sm">
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">
                            {msg.content}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-end mb-5">
                        <div className="bg-black max-w-[80%] px-4 py-3 rounded-2xl rounded-br-sm">
                          <p className="text-sm text-white whitespace-pre-wrap">
                            {msg.content}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {loadingChat && (
                  <div className="flex flex-col items-start gap-2 mb-5">
                    <div className="bg-[#F5F5F5] px-4 py-3 rounded-2xl">
                      <p className="text-sm">جاري الكتابة ...</p>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Bottom Input */}
              <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-100 px-4 py-3">
                {/* Quick Actions */}
                <div className="flex  gap-2 mb-3 overflow-x-auto scrollbar-hide">
                  <button
                    onClick={() =>
                      sendMessage("ما هي إجراءات رفع دعوى مدنية في القانون المصري ؟")
                    }
                    className="whitespace-nowrap cursor-pointer px-4 py-2 rounded-full bg-[#f3f4f8] text-gray-700 text-xs hover:bg-[#e9ebf3] transition"
                  >
                    رفع دعوى مدنية
                  </button>

                  <button
                    onClick={() =>
                      sendMessage(
                        "ما هي حقوق العامل طبقاً لقانون العمل المصري؟",
                      )
                    }
                    className="whitespace-nowrap cursor-pointer px-4 py-2 rounded-full bg-[#f3f4f8] text-gray-700 text-xs hover:bg-[#e9ebf3] transition"
                  >
                    قانون العمل
                  </button>
                </div>

                {/* Input */}
                <div className="flex items-center gap-2">
                  <div className="h-11 rounded-full border flex items-center gap-2 border-gray-200 px-2 flex-1">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !loadingChat) {
                          sendMessage();
                        }
                      }}
                      placeholder="اكتب سؤالك القانوني"
                      className="flex-1 h-11 text-sm px-2 outline-none"
                    />
                  </div>

                  <button
                    disabled={loadingChat}
                    onClick={() => sendMessage()}
                    className="w-11 h-11 rounded-full cursor-pointer bg-linear-to-r from-black to-black flex items-center justify-center shadow-lg"
                  >
                    <Image src={SendIcon} alt="SendIcon" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        {user && (
          <button
            onClick={() => {
              if (isDragging) return;
              setShowChat(!showChat);
            }}
            className="bg-linear-to-r from-white to-white  w-14 h-14 rounded-full flex items-center justify-center  cursor-pointer"
          >
            <Image
              draggable={false}
              src={chatBotChat}
              alt="chatbot"
              className="w-8 h-8"
            />
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default PopupChatBot;
