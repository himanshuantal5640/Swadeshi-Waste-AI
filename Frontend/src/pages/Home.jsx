// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

export default function Home() {
  const { theme } = useTheme();

  // Scroll reveal animation settings
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" }
    })
  };

  return (
    <main
      className={`pt-24 min-h-screen transition-colors duration-300 
      ${theme === "dark" ? "bg-[#07121a] text-white" : "bg-gray-50 text-black"}`}
    >
        {/* Floating Icons */}
      <motion.div
        className="absolute top-12 left-10 text-blue-300 text-7xl opacity-20 pointer-events-none"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      >
        📞
      </motion.div>

      <motion.div
        className="absolute bottom-16 right-12 text-purple-300 text-8xl opacity-20 pointer-events-none"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 13, repeat: Infinity }}
      >
        ✉️
      </motion.div>

      <motion.div
        className="absolute top-1/2 right-1/4 text-cyan-400 text-6xl opacity-10 pointer-events-none"
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      >
        💬
      </motion.div>
      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className={`text-4xl font-extrabold mb-4 
          ${theme === "dark" ? "text-green-300" : "text-green-700"}`}
        >
          Welcome to EcoVision 🌿
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className={`text-lg max-w-2xl mx-auto
          ${theme === "dark" ? "text-green-200" : "text-gray-600"}`}
        >
          Transform Waste into Value, learn how to dispose responsibly, chat with our AI eco-expert,
          and explore tools for sustainable living.
        </motion.p>
      </section>

      {/* MAIN ACTION BUTTONS */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          {/* Waste Analyzer */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Link
              to="/waste-to-value"
              className={`block text-center py-6 rounded-xl font-semibold shadow-lg transition 
                ${theme === "dark"
                  ? "bg-[#0f1c17] text-green-200 hover:bg-[#133022]"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
            >
              🧪 Waste To Value Generator
            </Link>
          </motion.div>

          {/* Features */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Link
              to="/features"
              className={`block text-center py-6 rounded-xl font-semibold shadow-lg transition 
                ${theme === "dark"
                  ? "bg-[#0f1c17] text-green-200 hover:bg-[#133022]"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
            >
              ✨ Features
            </Link>
          </motion.div>

          {/* Chat Assistant */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Link
              to="/chat"
              className={`block text-center py-6 rounded-xl font-semibold shadow-lg transition 
                ${theme === "dark"
                  ? "bg-[#0f1c17] text-green-200 hover:bg-[#133022]"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
            >
              💬 Eco Chat Assistant
            </Link>
          </motion.div>

        </div>
      </section>

      {/* EXTRA CARDS SECTION */}
      <section className="max-w-6xl mx-auto px-6 mt-20">
        <h2
          className={`text-3xl font-bold text-center mb-10 
          ${theme === "dark" ? "text-green-300" : "text-green-700"}`}
        >
          Explore More Tools 🍃
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Compost Tips Card */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={`p-8 rounded-xl shadow-lg border transition
              ${theme === "dark" ? "bg-[#0e1a15] border-green-900" : "bg-white border-gray-200"}
            `}
          >
            <h3
              className={`text-2xl font-bold mb-4 
              ${theme === "dark" ? "text-green-300" : "text-green-700"}`}
            >
              🌱 Compost Tips
            </h3>
            <p
              className={`${theme === "dark" ? "text-green-200" : "text-gray-600"}`}
            >
              Learn how to turn kitchen waste into nutrient-rich compost.
              Understand what items can and cannot be composted.
            </p>
          </motion.div>

          {/* Recycling Guide Card */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className={`p-8 rounded-xl shadow-lg border transition
              ${theme === "dark" ? "bg-[#0e1a15] border-green-900" : "bg-white border-gray-200"}
            `}
          >
            <h3
              className={`text-2xl font-bold mb-4 
              ${theme === "dark" ? "text-green-300" : "text-green-700"}`}
            >
              ♻️ Recycling Guide
            </h3>
            <p
              className={`${theme === "dark" ? "text-green-200" : "text-gray-600"}`}
            >
              Find out which materials can be recycled and how to prepare items
              for recycling to reduce contamination.
            </p>
          </motion.div>

        </div>
      </section>

      {/* AI ECO EXPERT SECTION */}
      <section className="mt-24">
        <h2
          className={`text-3xl font-bold text-center mb-8
          ${theme === "dark" ? "text-green-300" : "text-green-700"}`}
        >
          Talk to AI Eco Expert 🌿
        </h2>

        <p
          className={`text-center max-w-3xl mx-auto mb-12 text-lg
          ${theme === "dark" ? "text-green-200" : "text-gray-600"}`}
        >
          Get answers about waste disposal, composting, recycling, and sustainable practices —
          all powered by our intelligent eco-friendly AI assistant.
        </p>

        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0px 12px 30px rgba(0, 200, 120, 0.3)" }}
            transition={{ duration: 0.3 }}
            className={`rounded-2xl overflow-hidden shadow-xl cursor-pointer border
              ${theme === "dark" ? "bg-[#0f1714] border-green-900" : "bg-white border-gray-200"}
            `}
          >
            <Link to="/chat">

              {/* IMAGE */}
              <div className="w-full h-80 overflow-hidden">
                <img
                  src="eco.jpg"
                  alt="Eco AI"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-8">
                <h3
                  className={`text-2xl font-bold mb-4
                  ${theme === "dark" ? "text-green-300" : "text-green-700"}`}
                >
                  Chat With Our Eco Expert
                </h3>

                <p
                  className={`text-lg mb-6
                  ${theme === "dark" ? "text-green-200" : "text-gray-600"}`}
                >
                  Your personal AI assistant for all environmental questions. Ask anything about
                  waste decomposition, recycling, eco hacks, and more.
                </p>

                <button
                  className={`px-6 py-3 rounded-lg font-semibold
                  ${theme === "dark"
                    ? "bg-green-600 hover:bg-green-500 text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  Start Chat
                </button>
              </div>

            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}