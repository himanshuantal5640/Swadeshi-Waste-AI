import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import ImageUpload from "../components/ImageUpload";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useNavigate } from "react-router-dom"; // ✅ ADDED

const BACKEND_URL = import.meta.env.VITE_API_BASE.replace("/api", "");

export default function Upload() {
  const { theme } = useTheme();
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const navigate = useNavigate(); // ✅ ADDED

  const handleAnalyze = async () => {
    if (!file) return toast.error("Please upload an image first.");
    const user = auth.currentUser;
    if (!user) return toast.error("Please login.");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("email", user.email);

    setLoading(true);
    setAnalysis(null);

    try {
      const { data } = await api.post("/analyzer/scan", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ IRRELEVANT IMAGE BLOCK
      if (!data.success && data.relevance === "not_relevant") {
        toast.error("Please upload a relevant environmental waste image.");
        setLoading(false);
        return;
      }

      if (data.success) {
        toast.success("Analysis complete!");
        setAnalysis(data); // ✅ MULTI-ITEM RESPONSE STORED
      } else {
        toast.error(data.message || "Analysis failed.");
      }
    } catch (err) {
      toast.error("Server error.");
    }

    setLoading(false);
  };

  return (
    <main className={`pt-24 min-h-screen ${theme === "dark" ? "bg-[#07121a] text-white" : "bg-gray-50 text-black"}`}>
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* ✅ VIEW HISTORY BUTTON ADDED (NO UI CHANGE) */}
        <button
          onClick={() => navigate("/history")}
          className={`rounded-xl p-5 shadow ${theme === "dark" ? "bg-[#0b1a17]" : "bg-white border border-gray-200"}`}
        >
          View History
        </button>

        <h2 className={`text-3xl font-bold mb-8 ${theme === "dark" ? "text-green-300" : "text-green-700"}`}>
          Waste Analyzer
        </h2>

        <div className={`rounded-xl p-6 shadow-xl ${theme === "dark" ? "bg-[#0b1a17]" : "bg-white border border-gray-200"}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <ImageUpload onSelect={(f) => setFile(f)} />

              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="mt-4 rounded-lg border max-h-80 object-cover border-green-900 shadow-lg"
                />
              )}
            </div>

            <div className="flex flex-col gap-4">
              <textarea
                className="input-a2 h-40 resize-none"
                placeholder="Notes (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />

              <button
                onClick={handleAnalyze}
                className={`w-full py-3 rounded-lg text-white shadow-lg ${theme === "dark" ? "bg-green-600" : "bg-green-600"}`}
              >
                {loading ? "Analyzing..." : "Analyze"}
              </button>
            </div>
          </div>
        </div>

        {/* ✅ UPDATED RESULT RENDERING FOR MULTI-ITEM + MULTI-ECO */}
        {analysis && (
          <div className={`rounded-xl mt-10 p-6 shadow-xl ${theme === "dark" ? "bg-[#0b1a17]" : "bg-white border border-gray-200"}`}>
            <h3 className="text-2xl font-bold mb-4">Analysis Result</h3>

            {/* ✅ SHOW BACKEND STORED IMAGE */}
            <img
              src={`${BACKEND_URL}/${analysis.imagePath}`}
              alt="uploaded"
              className="rounded-lg border max-h-80 object-cover border-green-900 shadow-lg mb-4"
            />

            {/* ✅ MULTI-DETECTED ITEMS */}
            {analysis.items?.map((item, i) => (
              <div key={i}>
                <p><strong>Detected Item:</strong> {item.item}</p>
                <p><strong>Material:</strong> {item.material}</p>
                <p><strong>Description:</strong> {item.description}</p>
                <hr className="my-4" />
              </div>
            ))}

            <h4 className="text-xl font-semibold">Eco Analysis</h4>

            {/* ✅ MULTI ECO ANALYSIS */}
            {analysis.eco?.map((eco, i) => (
              <div key={i}>
                <p><strong>Recyclable:</strong> {eco.recyclable ? "Yes" : "No"}</p>
                <p><strong>Compostable:</strong> {eco.compostable ? "Yes" : "No"}</p>
                <p><strong>Hazardous:</strong> {eco.hazardous ? "Yes" : "No"}</p>
                <p><strong>Decomposition Time:</strong> {eco.decomposition_time}</p>

                <h4 className="text-lg font-semibold mt-4">Steps</h4>
                <ul className="list-disc ml-5">
                  {eco.steps?.map((s, j) => <li key={j}>{s}</li>)}
                </ul>

                <hr className="my-4" />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
