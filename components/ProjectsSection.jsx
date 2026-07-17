"use client";

import Link from "next/link";

/* ✅ SIMPLE ICON COMPONENTS (DEFINE HERE) */
const BuildingIcon = () => (
  <span style={{ fontSize: "28px" }}>🏢</span>
);
const CorporateIcon = () => (
  <span style={{ fontSize: "28px" }}>🏬</span>
);
const WarehouseIcon = () => (
  <span style={{ fontSize: "28px" }}>🏭</span>
);
const DataCenterIcon = () => (
  <span style={{ fontSize: "28px" }}>🗄️</span>
);
const ParkingIcon = () => (
  <span style={{ fontSize: "28px" }}>🅿️</span>
);

const ProjectsSection = () => {
  const projectTypes = [
    {
      title: "Hospitals",
      description:
        "Hospitals require fast, disruption-free construction and long, flexible floor plates. PT systems enable efficient layouts with reduced structural depth.",
      icon: BuildingIcon,
    },
    {
      title: "Office Buildings",
      description:
        "Commercial developments demand higher efficiency and open layouts. PT slabs maximise usable space and improve long-term rental value.",
      icon: CorporateIcon,
    },
    {
      title: "Residential Buildings",
      description:
        "PT systems help residential developers achieve faster slab cycles, reduced material usage, and earlier possession timelines.",
      icon: BuildingIcon,
    },
    {
      title: "Skyscrapers",
      description:
        "High-rise structures require lightweight yet high-performance slabs. PT delivers structural efficiency without increasing dead load.",
      icon: CorporateIcon,
    },
    {
      title: "Industrial Buildings",
      description:
        "Factories and warehouses need large column-free spans and high load capacity. PT slabs deliver both with precision.",
      icon: WarehouseIcon,
    },
    {
      title: "Foundation Slabs",
      description:
        "PT foundation slabs provide superior crack control, load distribution, and long-term durability under heavy structural loads.",
      icon: DataCenterIcon,
    },
    {
      title: "Basements",
      description:
        "PT solutions reduce slab thickness in basements, addressing height restrictions while supporting heavy loading conditions.",
      icon: ParkingIcon,
    },
  ];

  const projectList = [
    "Residential Towers",
    "Commercial Buildings",
    "IT Parks & Corporate Offices",
    "Malls & Mixed-Use Developments",
    "Industrial Structures",
    "Podiums & Parking Slabs",
    "Transfer Slabs & Girders",
    "Hotels & Institutional Projects",
  ];

  return (
    <section className="projects-section">
      <div className="projects-container">
        <div className="section-title">
          <span className="section-tag">Our Expertise</span>
          <h2>How Our Systems Add Value Across Project Types</h2>
          <p>
            Post-tensioning is not just reinforcement — it is a structural
            strategy that transforms efficiency, cost, and architectural
            flexibility.
          </p>
        </div>

        <div className="bento-grid">
          {projectTypes.map((project, index) => {
            const Icon = project.icon;
            return (
              <div key={index} className="bento-card">
                <div className="bento-icon">
                  <Icon />
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            );
          })}
        </div>

        <div className="projects-closing">
          <p>
            Across all building typologies, PT creates measurable structural and
            commercial advantages — executed by Unified with precision and
            accountability.
          </p>
        </div>

        <div className="project-types">
          <h3>Types of Projects We Deliver</h3>
          <ul>
            {projectList.map((type, i) => (
              <li key={i}>{type}</li>
            ))}
          </ul>
        </div>

        <div className="projects-cta">
          <Link href="/our-projects" className="cta-button">
            View Our Projects <span>›</span>
          </Link>
        </div>
      </div>
    </section>
    );
};

export default ProjectsSection;
