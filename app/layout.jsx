import { Suspense } from "react";
import "@/app/globals.css";
import AppBlurWrapper from "@/components/AppBlurWrapper";
import Navbar from "@/components/Navbar";
import SmoothScrollArrow from '@/components/SmoothScrollArrow';
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnalyticsTracker from "@/app/components/AnalyticsTracker";

export const metadata = {
  title: "Unified Post Tensioning Systems | PT Contractors India",
  description: "Unified Post Tensioning Systems is a leading PT company in India providing expert bonded and unbonded post-tensioning slab construction, design, and execution services for commercial, residential, and infrastructure projects.",
  keywords: [
    "Unified Post Tensioning Systems",
    "Unified PT India",
    "Unified engineering solutions",
    "Build with Unified PT",
    "Unified structural systems India",
    "Unified PT contractors",
    "Unified slab solutions",
    "Unified infrastructure systems",
    "Post Tensioning Systems India",
    "Post Tensioning Company India",
    "PT Contractors India",
    "Post Tensioning Services India",
    "PT Slab Construction India",
    "PT Engineering Company",
    "Bonded Post Tensioning System India",
    "Unbonded Post Tensioning System India",
    "Post Tensioning Design and Execution",
    "PT Solutions for Buildings India",
    "Post Tensioning for Structural Engineers",
    "PT Design for Consultants",
    "Post Tensioning for Architects",
    "PT Solutions for Builders",
    "PT Systems for Developers India",
    "Engineering Consultants PT India",
    "Construction Companies Post Tensioning",
    "PT Support for Contractors",
    "Architectural slab solutions PT",
    "Structural optimization using PT",
    "Bonded PT system for bridges",
    "Bonded PT for flyovers",
    "Bonded PT heavy structures",
    "Grouted PT system India",
    "Multi strand bonded PT",
    "PT ducts and grouting system",
    "Bridge post tensioning contractors India",
    "Infrastructure PT systems",
    "Bonded tendon system",
    "High durability bonded PT",
    "Unbonded PT slab system",
    "Mono strand PT system",
    "Flat slab PT construction",
    "Unbonded PT residential buildings",
    "Commercial PT slab design",
    "Greased sheathed PT tendons",
    "PT slab without beams",
    "Parking slab post tensioning",
    "High rise building PT slabs",
    "PT slab design services",
    "Post tensioning installation India",
    "On site PT services",
    "PT project execution",
    "PT consultancy India",
    "Structural PT analysis",
    "PT detailing services",
    "PT site support",
    "Retrofitting using PT",
    "Concrete strengthening using PT",
    "Long span slab design",
    "High load bearing slabs",
    "Slab thickness reduction PT",
    "Crack control using PT",
    "Deflection control slabs",
    "Concrete prestressing systems",
    "Structural efficiency using PT",
    "Pre stressed concrete systems",
    "Tendon stressing process",
    "Anchorage system PT",
    "Why use post tensioning in construction",
    "Benefits of PT slabs vs RCC",
    "How PT reduces slab thickness",
    "Post tensioning slab design guidelines India",
    "PT construction process step by step",
    "Best PT system for commercial projects",
    "Post tensioning advantages in high rise buildings",
    "Difference between bonded and unbonded PT",
    "Reduce construction cost slabs",
    "Faster slab construction method",
    "Increase building span without beams",
    "Minimize concrete usage slabs",
    "Durable slab construction solution",
    "Crack free slab solution",
    "Lightweight slab construction system",
    "Post tensioning Ahmedabad",
    "PT contractors Gujarat",
    "PT company Mumbai",
    "Post tensioning Pune",
    "PT services Hyderabad",
    "PT contractor Indore",
    "Post tensioning Lucknow",
    "PT services Bangalore",
    "PT company Delhi",
    "PT anchorage system",
    "PT wedges and anchors",
    "PT cables and tendons",
    "Sheathing for PT cables",
    "PT stressing equipment",
    "Hydraulic jack PT",
    "PT couplers system",
    "Construction tensioning equipment"
  ],
  icons: {
    icon: "/Logo.png",
    apple: "/Logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white text-slate-900" suppressHydrationWarning>
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <CustomCursor />
        <AppBlurWrapper>
          <Navbar />
          <main>
            {children}
            <WhatsAppButton />
            <SmoothScrollArrow />
          </main>
          <Footer />
        </AppBlurWrapper>
        <script
          src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          defer
        ></script>
      </body>
    </html>
  );
}
