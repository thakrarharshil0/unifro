"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, Building, Download, X, Send } from "lucide-react";
import { useState } from "react";

const BrochureModal = ({ isOpen, onClose, brochurePath }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://admin.unifiedpts.com/api";
      const fetchUrl = process.env.NODE_ENV === 'development' ? '/api-proxy' : apiUrl;
      
      const res = await fetch(`${fetchUrl}/brochure-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          brochure_path: brochurePath,
        }),
      });

      if (res.ok) {
        // Trigger download more robustly
        const filename = brochurePath.split("/").pop() || "Unified_Brochure.pdf";
        const link = document.createElement("a");
        link.style.display = "none";
        link.href = brochurePath;
        link.setAttribute("download", filename);
        
        // Append to body to ensure it works in all browsers
        document.body.appendChild(link);
        link.click();
        
        // Small delay before removing to ensure trigger works
        setTimeout(() => {
          document.body.removeChild(link);
        }, 100);
        
        alert("Thank you! Your brochure download has started.");
        onClose();
      } else {
        alert("Failed to submit request. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="p-8 md:p-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0095aa]/10 rounded-full mb-4">
                  <Download className="text-[#0095aa]" size={32} />
                </div>
                <h2 className="text-3xl font-black text-[#1a2a5e] mb-2 tracking-tight">Request Brochure</h2>
                <p className="text-gray-600 font-medium">Please provide your details to download our brochure.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <FloatingInput
                  label="Your Name"
                  name="name"
                  icon={<User size={18} />}
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                <FloatingInput
                  label="Email Address"
                  name="email"
                  type="email"
                  icon={<Mail size={18} />}
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <FloatingInput
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  icon={<Phone size={18} />}
                  required
                  pattern="[6-9]{1}[0-9]{9}"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <FloatingInput
                  label="Company Name"
                  name="company"
                  icon={<Building size={18} />}
                  value={formData.company}
                  onChange={handleChange}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#0095aa] hover:bg-[#007f91] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    "Processing..."
                  ) : (
                    <>
                      <Send size={18} />
                      Download Now
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

function FloatingInput({ label, name, type = "text", required = false, pattern, value, onChange }) {
  const id = `brochure-${name}`;
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        pattern={pattern}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="peer w-full border border-gray-300 rounded-xl px-5 pt-6 pb-2 text-base focus:outline-none focus:ring-2 focus:ring-[#0095aa]/20 focus:border-[#0095aa] transition-all bg-white"
      />
      <label
        htmlFor={id}
        className="absolute left-5 top-4.5 text-gray-400 text-base transition-all duration-200 peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#0095aa] peer-valid:top-2 peer-valid:text-xs forced-peer-valid"
      >
        {label}{required && " *"}
      </label>
      <style jsx>{`
        .forced-peer-valid {
          top: ${value ? '0.5rem' : ''};
          font-size: ${value ? '0.75rem' : ''};
        }
      `}</style>
    </div>
  );
}

export default BrochureModal;
