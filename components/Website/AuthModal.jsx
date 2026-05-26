"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HiX, HiChevronDown } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, RegisterUser } from "@/lib/UserAuth";
import { ClipLoader } from "react-spinners";

export default function AuthDrawer({ open, onClose, type }) {
  const { loading } = useSelector((state) => state.UserRTK);
  const dispatch = useDispatch();

  const [roleOpen, setRoleOpen] = useState(false);
  const roleRef = useRef(null);

  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    taype: "user",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const roles = ["user", "avocato"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (roleRef.current && !roleRef.current.contains(event.target)) {
        setRoleOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRegister = async (e) => {
    if (loading) {
      return;
    }

    e.preventDefault();

    const data = {
      name: registerData.fullName,
      email: registerData.email,
      mobile: registerData.phone,
      password: registerData.password,
      type: registerData.taype,
    };
    const result = await dispatch(RegisterUser(data));
    if (RegisterUser.fulfilled.match(result)) {
      onClose();
    }
  };

  const handleLogin = async (e) => {
    if (loading) {
      return;
    }

    e.preventDefault();

    const result = await dispatch(LoginUser(loginData));

    if (LoginUser.fulfilled.match(result)) {
      onClose();
    }
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
                  className="text-3xl text-white/70 hover:text-white transition"
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
                    className="rounded-full bg-white/20 px-6 py-4 outline-none placeholder:text-white/50 backdrop-blur-md"
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
                      className="rounded-full bg-white/20 px-6 py-4 outline-none placeholder:text-white/50 backdrop-blur-md"
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
                      className="rounded-full bg-white/20 px-6 py-4 outline-none placeholder:text-white/50 backdrop-blur-md"
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
                    className="rounded-full bg-white/20 px-6 py-4 outline-none placeholder:text-white/50 backdrop-blur-md"
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      })
                    }
                  />

                  {/* CUSTOM DROPDOWN */}
                  <div className="relative" ref={roleRef}>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setRoleOpen(!roleOpen)}
                      className="w-full rounded-full bg-white/20 px-6 py-4 backdrop-blur-md flex items-center justify-between"
                    >
                      <span className="capitalize text-white/90">
                        {registerData.taype}
                      </span>

                      <motion.div
                        animate={{ rotate: roleOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <HiChevronDown className="text-xl text-white/70" />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {roleOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                          className="absolute left-0 mt-3 w-full overflow-hidden rounded-3xl border border-white/10 bg-black/70 backdrop-blur-xl"
                        >
                          {roles.map((role, index) => (
                            <motion.button
                              key={index}
                              type="button"
                              whileHover={{
                                backgroundColor:
                                  "rgba(255,255,255,0.08)",
                              }}
                              onClick={() => {
                                setRegisterData({
                                  ...registerData,
                                  taype: role,
                                });

                                setRoleOpen(false);
                              }}
                              className={`w-full px-6 py-4 text-left capitalize transition ${
                                registerData.taype === role
                                  ? "text-white"
                                  : "text-white/60"
                              }`}
                            >
                              {role}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 w-fit rounded-full bg-white px-8 py-3 text-black font-semibold cursor-pointer"
                  >
                    {loading ? (
                      <ClipLoader
                        size={20}
                        color="#000"
                        className="relative top-1"
                      />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </form>
              ) : (
                /* LOGIN */
                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                  <input
                    type="email"
                    placeholder="Email"
                    className="rounded-full bg-white/20 px-6 py-4 outline-none placeholder:text-white/50 backdrop-blur-md"
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
                    className="rounded-full bg-white/20 px-6 py-4 outline-none placeholder:text-white/50 backdrop-blur-md"
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        password: e.target.value,
                      })
                    }
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 w-fit rounded-full cursor-pointer bg-white px-8 py-3 text-black font-semibold"
                  >
                    {loading ? (
                      <ClipLoader
                        size={20}
                        color="#000"
                        className="relative top-1"
                      />
                    ) : (
                      "Login"
                    )}
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