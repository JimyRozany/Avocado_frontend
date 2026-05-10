"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HiX } from "react-icons/hi";
import { useState } from "react";

export default function AuthDrawer({ open, onClose, type }) {
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(registerData);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(loginData);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* OVERLAY */}
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-linear-to-r from-black to-transparent z-90"
          />

          {/* DRAWER */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed left-0 top-0 z-100 h-screen w-full max-w-125 bg-transparent text-white"
          >
            <div className="flex h-full flex-col px-8 py-10">
              {/* TOP */}
              <div className="mb-14 flex items-center justify-between mt-auto">
                <div>
                  <h2 className="text-4xl font-light">
                    {type === "register" ? "Registration" : "Login"}
                  </h2>

                  <p className="mt-2 text-sm text-white/40">
                    {type === "register"
                      ? "Register now and get full access."
                      : "Login to continue."}
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="text-3xl text-white/70 hover:text-white"
                >
                  <HiX />
                </button>
              </div>

              {/* REGISTER */}
              {type === "register" ? (
                <form onSubmit={handleRegister} className="flex flex-col gap-5">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="rounded-full bg-white/20 px-6 py-4 outline-none"
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        fullName: e.target.value,
                      })
                    }
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="email"
                      placeholder="Email"
                      className="rounded-full bg-white/20 px-6 py-4 outline-none"
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                    />

                    <input
                      type="text"
                      placeholder="Phone"
                      className="rounded-full bg-white/20 px-6 py-4 outline-none"
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>

                  <input
                    type="password"
                    placeholder="Password"
                    className="rounded-full bg-white/20 px-6 py-4 outline-none"
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      })
                    }
                  />

                  <button
                    type="submit"
                    className="mt-4 w-fit rounded-full bg-white px-8 py-3 text-black font-semibold"
                  >
                    Submit
                  </button>
                </form>
              ) : (
                /* LOGIN */
                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                  <input
                    type="email"
                    placeholder="Email"
                    className="rounded-full bg-white/20 px-6 py-4 outline-none"
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        email: e.target.value,
                      })
                    }
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    className="rounded-full bg-white/20 px-6 py-4 outline-none"
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        password: e.target.value,
                      })
                    }
                  />

                  <button
                    type="submit"
                    className="mt-4 w-fit rounded-full bg-white px-8 py-3 text-black font-semibold"
                  >
                    Login
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
