"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us#who-we-are" },
    { name: "Technology", path: "/technology" },
    { name: "Our Projects", path: "/our-projects" },
    { name: "Career", path: "/career" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const services = [
    "Unbonded Post-Tensioning",
    "Bonded Post-Tensioning",
  ];

  const branches = [
    "Hyderabad",
    "Pune",
    "Vadodara",
    "Indore",
    "Lucknow",
  ];

  return (
    <footer
      className="relative text-white"
      style={{
        backgroundImage: `url(/assets/footer-bg.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
      }}
    >
      {/* Overlay for gradient and readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/80 to-[#0d1e36]/85 pointer-events-none z-0" />
      {/* Main Footer */}
      <div className="relative z-10 px-6 lg:px-16 py-10 min-[2500px]:py-32">
        <div className="max-w-[1400px] min-[2500px]:max-w-[2200px] mx-auto grid gap-14 min-[2500px]:gap-5rem lg:grid-cols-[0.8fr_0.5fr_0.7fr_0.7fr] md:grid-cols-2">

          {/* About */}
          <div className="flex flex-col md:col-span-2 lg:col-span-1 text-center lg:text-left">
            <div className="mb-8">
              <img
                src="/assets/Unified New Logo.png"
                alt="Unified Post Tensioning Systems LLP"
                className="h-14 min-[2500px]:h-28 w-auto object-contain brightness-0 invert mx-auto lg:mx-0 mb-6"
              />
              <p className="text-base min-[2500px]:text-2xl font-medium text-slate-200 mb-2 leading-tight">
                India&apos;s trusted Company in Unbonded & <br /> Bonded Post-Tensioning Systems.
              </p>
              <p className="text-xs min-[2500px]:text-lg uppercase tracking-widest text-[#0095AA] font-bold mb-4">
                In Partnership With
              </p>
              <img
                src="/assets/Pramukh_Post _Tensioning_Systems_PVT.LTD.png"
                alt="Pramukh Post Tensioning Systems PVT. LTD."
                className="h-10 min-[2500px]:h-14 w-auto object-contain brightness-0 invert mx-auto lg:mx-0"
              />
            </div>

          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="text-lg min-[2500px]:text-3xl font-bold mb-6 relative after:absolute after:-bottom-2 after:left-1/2 lg:after:left-0 after:-translate-x-1/2 lg:after:translate-x-0 after:w-10 min-[2500px]:after:w-16 after:h-[3px] min-[2500px]:after:h-[5px] after:bg-[#0095AA] after:rounded">
              Quick Links
            </h4>
            <ul className="space-y-3 min-[2500px]:space-y-6 text-sm min-[2500px]:text-xl text-slate-300">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.path}
                    className="hover:text-[#0095AA] hover:translate-x-1 transition inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Branches */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="text-lg min-[2500px]:text-3xl font-bold mb-6 relative after:absolute after:-bottom-2 after:left-1/2 lg:after:left-0 after:-translate-x-1/2 lg:after:translate-x-0 after:w-10 min-[2500px]:after:w-16 after:h-[3px] min-[2500px]:after:h-[5px] after:bg-[#0095AA] after:rounded">
              Our Services
            </h4>
            <ul className="space-y-3 min-[2500px]:space-y-6 text-sm min-[2500px]:text-xl text-slate-300 mb-8">
              {services.map((service, i) => (
                <li key={i}>{service}</li>
              ))}
            </ul>

            {/* <h4 className="text-lg min-[2500px]:text-3xl font-bold mb-6 relative after:absolute after:-bottom-2 after:left-1/2 lg:after:left-0 after:-translate-x-1/2 lg:after:translate-x-0 after:w-10 min-[2500px]:after:w-16 after:h-[3px] min-[2500px]:after:h-[5px] after:bg-[#0095AA] after:rounded">
              Our Branches
            </h4>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 min-[2500px]:gap-y-6 text-sm min-[2500px]:text-xl text-slate-300">
              {branches.map((branch, i) => (
                <li key={i}>{branch}</li>
              ))}
            </ul> */}
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h4 className="text-lg min-[2500px]:text-3xl font-bold mb-6 relative after:absolute after:-bottom-2 after:left-1/2 lg:after:left-0 after:-translate-x-1/2 lg:after:translate-x-0 after:w-10 min-[2500px]:after:w-16 after:h-[3px] min-[2500px]:after:h-[5px] after:bg-[#0095AA] after:rounded">
              Contact Us
            </h4>

            <div className="space-y-4 min-[2500px]:space-y-8 text-sm min-[2500px]:text-xl text-slate-300">
              <div className="flex items-start gap-3 min-[2500px]:gap-5 justify-center lg:justify-start">
                <FaMapMarkerAlt className="text-[#0095AA] mt-1 min-[2500px]:text-2xl" />
                <p>C-1804-1807, Kailash Business Park, Vikhroli West, Mumbai, Maharashtra - 400079</p>
              </div>
              <div className="flex items-start gap-3 min-[2500px]:gap-5 justify-center lg:justify-start">
                <FaPhone className="text-[#0095AA] mt-1 min-[2500px]:text-2xl scale-x-[-1]" />
                <p>+91 95740 76889</p>
              </div>
              <div className="flex items-start gap-3 min-[2500px]:gap-5 justify-center lg:justify-start">
                <FaEnvelope className="text-[#0095AA] mt-1 min-[2500px]:text-2xl" />
                <p>unifiedpts@gmail.com</p>
              </div>
            </div>
            <div className="flex mt-8 justify-center lg:justify-start gap-3 min-[2500px]:gap-6">
              {[
                { Icon: FaFacebookF, href: "https://www.facebook.com/UnifiedPTS/" },
                { Icon: FaInstagram, href: "https://www.instagram.com/unified_pts_llp/?hl=en" },
                { Icon: FaXTwitter, href: "https://x.com/Unified_PTS_LLP" },
                { Icon: FaLinkedinIn, href: "https://www.linkedin.com/company/unifiedpt/?viewAsMember=true" },
                { Icon: FaYoutube, href: "https://www.youtube.com/@UNIFIEDPTS1915" }
              ].map(
                ({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 min-[2500px]:w-16 min-[2500px]:h-16 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0095AA] hover:-translate-y-1 transition min-[2500px]:text-2xl"
                  >
                    <Icon />
                  </a>
                )
              )}
            </div>
          </div>


        </div>
      </div>

      <div className="relative z-10 bg-black/20 px-6 lg:px-16 py-5 min-[2500px]:py-10">
        <div className="max-w-[1400px] min-[2500px]:max-w-[2200px] mx-auto flex flex-col items-center gap-4 text-xs min-[2500px]:text-lg text-slate-400">
          <div className="text-center">
            <p>© {currentYear} Unified Post Tensioning Systems LLP All Rights Reserved.</p>
            <p className="mt-1">
              Designed & Developed by <span className="text-[#0095AA] font-semibold">Digital Creators</span>
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-[#0095AA]">
              Privacy Policy
            </Link>
            {/* <span>|</span> */}
            {/* <Link href="/terms" className="hover:text-[#0095AA]">
              Terms & Conditions
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;