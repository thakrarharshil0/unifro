'use client';

import { motion } from 'framer-motion';

export default function ProjectImageCard({ project, index, onClick }) {
  // Use project data directly from the dynamic backend
  const projectName = project.name;

  // Construct the correct image url pointing to the Laravel storage API
  const url = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || "https://admin.unifiedpts.com";
  const imageSrc = project.image ? `${url}/storage/${project.image}` : '/placeholder-image.jpg';

  return (
    <motion.div
      layout
      onClick={onClick}
      className="w-full h-auto transition-all duration-500 ease-in-out mb-4 group relative shadow-[0_10px_30px_rgba(0,0,0,0.1)] overflow-hidden cursor-pointer bg-white break-inside-avoid"
    >
      {/* Image Container */}
      <div className="relative w-full h-auto overflow-hidden">
        <img
          src={imageSrc}
          alt={projectName}
          className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
        />

        {/* Hover Overlay - Name and interaction prompt */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
          {/* Pulsing "View details" prompt at top corner */}
          <div className="absolute top-6 right-6">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-[#0095AA]" />
              <span className="text-white text-[10px] font-bold uppercase tracking-widest">Click for Details</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <div className="font-anton text-2xl md:text-3xl tracking-wider uppercase drop-shadow-lg mb-2">
              {projectName}
            </div>
            <div className="w-16 h-1 bg-[#0095AA] rounded-full" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
