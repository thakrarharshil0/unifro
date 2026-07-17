"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import ProjectImageCard from '@/components/ui/ProjectImageCard';

export default function ProjectsClient({ initialProjects }) {
  const [projects] = useState(initialProjects || []);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const tickerItems = [
    "★ Quality Matters Over Quantity ★",
    "★ Post-Tensioning Company You Can Trust ★",
    "★ Delivering Structural Efficiency Every Time ★"
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes tickerScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .text-shadow-lg {
            text-shadow: 0 4px 20px rgba(0,0,0,0.5);
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
          }
          .prose-invert ul {
            list-style-type: disc !important;
            padding-left: 1.5rem !important;
          }
          .prose-invert li {
            color: white !important;
          }
          .prose-invert li::marker {
            color: white !important;
          }
        `
      }} />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[50vh] max-h-[50vh] flex flex-col justify-center items-center overflow-hidden">
          <video
            key="our-projects-video"
            autoPlay loop muted playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          >
            <source src="/assets/our-projects-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,149,170,0.6)] z-[0.5]"></div>
          <div className="relative z-10 text-center px-6">
            <h1 className="text-white text-shadow-lg tracking-wider font-anton font-normal text-[clamp(3rem,8vw,6rem)] font-black">
              OUR PROJECTS
            </h1>
          </div>
        </section>

        {/* News Ticker */}
        <div className="relative w-full bg-[#0095AA] overflow-hidden z-30">
          <div className="w-full overflow-hidden">
            <div
              className="flex whitespace-nowrap"
              style={{ animation: 'tickerScroll 25s linear infinite' }}
            >
              {[...tickerItems, ...tickerItems].map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-14 lg:px-16 py-4 text-xl lg:text-2xl font-semibold text-white tracking-wider whitespace-nowrap"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid Section */}
        <section className="py-24 bg-white">
          <Container>
            {projects.length === 0 ? (
              <div className="w-full text-center py-12">
                <p className="mt-4 text-gray-500 font-semibold">No active projects found at the moment.</p>
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-3 gap-4 space-y-4">
                {projects.map((project, index) => (
                  <ProjectImageCard
                    key={project.id}
                    project={project}
                    index={index}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            )}
          </Container>
        </section>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 md:p-8">
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl bg-white rounded-2xl md:rounded-3xl overflow-y-auto lg:overflow-hidden shadow-2xl flex flex-col lg:flex-row h-fit max-h-[95vh] lg:max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-50 bg-black/20 hover:bg-[#0095AA] text-white hover:text-white p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-md group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Image Area */}
              <div className="w-full lg:w-3/5 h-auto lg:h-auto min-h-[200px] flex-shrink-0 relative bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedProject.image ? `${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || "https://admin.unifiedpts.com"}/storage/${selectedProject.image}` : '/placeholder-image.jpg'}
                  alt={selectedProject.name}
                  className="w-full h-auto max-h-[40vh] lg:max-h-full object-contain"
                />
              </div>

              {/* Modal Content Area */}
              <div className="w-full lg:w-2/5 p-6 sm:p-10 lg:p-12 flex flex-col bg-[#0095AA] text-white lg:overflow-hidden h-fit lg:h-auto">
                <div className="mb-4">
                  <span className="text-white/60 text-xs font-bold uppercase tracking-[0.2em]">Project Highlights</span>
                </div>
                <h2 className="font-anton text-xl sm:text-2xl lg:text-4xl uppercase tracking-wider mb-6 lg:mb-8 border-b border-white/20 pb-4 lg:pb-6 leading-tight">
                  {selectedProject.name}
                </h2>

                <div className="lg:flex-1 lg:overflow-y-auto custom-scrollbar pr-4 space-y-6">
                  <div>
                    <h4 className="text-white/80 font-bold uppercase text-sm tracking-widest mb-4 flex items-center gap-3">
                      <span className="w-8 h-px bg-white/40"></span>
                      Detailed Scope
                    </h4>
                    <div
                      className="text-white/90 text-justify leading-relaxed text-lg prose prose-invert prose-p:my-2 marker:text-[#0095AA]"
                      dangerouslySetInnerHTML={{ __html: selectedProject.description || 'No detailed description available for this project.' }}
                    />
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-white/40 text-[10px] uppercase tracking-widest mb-1 font-bold">Industry Standard</span>
                    <span className="text-white font-anton text-sm uppercase tracking-wider">Structural Excellence</span>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                    <span className="text-[#0095AA] font-bold text-lg bg-white w-8 h-8 rounded-full flex items-center justify-center">★</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </>
  );
}
