'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import Container from '../../components/ui/Container.jsx';
import SectionTitle from '../../components/ui/SectionTitle.jsx';
import { useState } from 'react';

export default function Page() {

  const [type, setType] = useState('bonded');
  const [isClient, setIsClient] = useState(false);
  const [currentHash, setCurrentHash] = useState('');

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const backgroundColor = useTransform(
    scrollYProgress,
    [0.3, 1],
    ['#0095aa', '#ffc107']
  );

  useEffect(() => {
    setIsClient(true);
    const handleHash = () => {
      setCurrentHash(window.location.hash.replace('#', ''));
      if (window.location.hash === '#unbonded-execution') {
        setType('unbonded');
      } else {
        setType('bonded');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll('.step-number').forEach((el) => {
        const section = el.closest('section');
        const content = section.querySelector('.process-content');

        if (!content) return;

        const sectionTop = section.offsetTop;
        const scrollY = window.scrollY;

        const distance = scrollY - sectionTop;

        // ✅ paragraph jitna hi movement allowed
        const maxOffset = content.offsetHeight - 200; // 200 = visual buffer

        const offset = Math.max(
          0,
          Math.min(distance * 0.12, maxOffset)
        );

        el.style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const processSteps = [
    {
      number: '01',
      title: 'INITIAL BRIEFING',
      description: 'We receive inquiries through email. To prepare the preliminary drawings and quotations, we require the structural and architectural layouts, which should be sent to "unifiedpts@gmail.com"',
      icon: '/iconspngs/1.png'
    },
    {
      number: '02',
      title: 'PRELIMINARY DESIGN WORK',
      description: 'We will provide the section sizes based on the design, followed by the pricing. Once you approve the sizes and drawings, we will issue the quotation accordingly.',
      icon: '/iconspngs/2.png'
    },
    {
      number: '03',
      title: 'PRICING PROPOSAL',
      description: "We'll go over the quote and the project's scope with you. The project will be considered finalized after you approve the pricing. Processing the advance payment and finishing the required paperwork, such as the Purchase Order & Work Order, will be the next steps.",
      icon: '/iconspngs/3.png'
    },
    {
      number: '04',
      title: 'DESIGN FINALIZATION',
      description: "Once you clear advance payment and paperwork, we will begin working on the steel details.",
      icon: '/iconspngs/4.png'
    },
    {
      number: '05',
      title: 'PRODUCTION MATERIAL PLANNING',
      description: "After issuing the GFC, the site team will evaluate the site's condition and place a material order with our workshop team according to the requirements.",
      icon: '/iconspngs/5.png'
    },
    {
      number: '06',
      title: 'MATERIAL DELIVERY',
      description: "We handle the dispatch of post-tensioning materials with care, ensuring all specialized components are delivered to your site on schedule and ready for quick, efficient installation.",
      icon: '/iconspngs/6.png'
    },
    {
      number: '07',
      title: 'PROJECT PLANNING AND CO-ORDINATION',
      description: "Our site team will work closely with your site team to ensure the installation is completed on time.",
      icon: '/iconspngs/7.png'
    },
    {
      number: '08',
      title: 'INSTALLATION',
      description: "One day before the installation begins, the site team will receive the contact information for the relevant individual. Our site execution engineer will start work from next day.",
      icon: '/iconspngs/8.png'
    },
    {
      number: '09',
      title: 'STRESSING ACTIVITY',
      description: "Once you provide our team with a concrete cube test report showing a strength of at least 25 N/mm2, will start stressing activity accordingly.",
      icon: '/iconspngs/9.png'
    },
    {
      number: '10',
      title: 'FLOOR COMPLETION',
      description: "After 24 hours of stressing work, our team will cut the cable access length and plan for patta marking below the slab in the case of a PT slab.",
      icon: '/iconspngs/10.png'
    },
  ];

  const tickerItems = [
    "★ Quality Matters Over Quantity ★",
    "★ Post-Tensioning Company You Can Trust ★",
    "★ Delivering Structural Efficiency Every Time ★"
  ];

  return (
    <>
      <section className="relative min-h-[50vh] max-h-[50vh] flex flex-col justify-center items-center overflow-hidden">

        {/* Background Video */}
        <video
          key="execution-process-video"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source
            src="/assets/execution-process-bg.mp4"
            type="video/mp4"
          />
        </video>

        {/* Overlay Layer */}
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,149,170,0.6)] z-[0.5]"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          {/* Main Heading */}
          <h1 className="text-white text-shadow-lg tracking-wider font-anton font-normal text-[clamp(3rem,8vw,6rem)] font-black">
            PROJECT WORKFLOW
          </h1>

        </div>

      </section>
      {/* News Ticker */}
      <div className="relative w-full bg-[#0095AA] overflow-hidden z-30">
        <div className="w-full overflow-hidden">
          <div className="flex animate-tickerScroll">
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

      {/* Process Steps */}
      <section
        className="py-20 relative"
        ref={ref}
        style={{
          backgroundImage: "url('/assets/hong-kong-apartment-block.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-white/80 pointer-events-none z-0" />
        <div className="relative z-10">
          <Container>
            <SectionTitle
              title="Project Workflow"
              titleClassName="font-anton tracking-wider text-[#1a2a5e]"
              subtitleClassName="font-bold"
            />
            <div className="max-w-5xl mx-auto">
              {/* Timeline with vertical line */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform md:-translate-x-1/2"></div>
                <motion.div
                  style={{ scaleY, backgroundColor }}
                  className="absolute left-6 md:left-1/2 top-0 bottom-0 w-2 transform md:-translate-x-1/2 origin-top"
                />

                <div className="space-y-12">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.5 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className={`relative flex flex-col md:flex-row items-start md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                        }`}
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 z-10">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: false, amount: 0.5 }}
                          transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                          className="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg"
                        >
                          <motion.div
                            className='w-full h-full rounded-full bg-white'
                            initial={{ scale: 1 }}
                            whileInView={{ scale: 0 }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 0.2, delay: index * 0.2 + 0.5 }}
                          />
                        </motion.div>
                      </div>

                      {/* Content Card */}
                      <div className={`w-[80%] md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                        }`}>
                        <motion.div
                          whileHover={{ scale: 1.02, y: -5 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white bg-gradient-to-br from-accent-light to-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl border border-accent transition-all duration-300"
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-20 h-20 shrink-0 rounded-xl flex items-center justify-center shadow-md bg-white">
                              <img
                                src={step.icon}
                                alt={step.title}
                                className="w-20 h-20 object-contain p-3"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg md:text-2xl font-heading font-bold text-text uppercase mb-2">
                                {step.title}
                              </h4>
                            </div>
                          </div>
                          <p className="text-text-light text-justify leading-relaxed text-base">
                            {step.description}
                          </p>

                          {/* Decorative line */}
                          <div className="mt-4 h-1 w-20 bg-blue-500 rounded-full"></div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
    </>
  );
}
