"use client";

import { useEffect, useRef, useState } from "react";
import "./Metrics.css";

const METRICS = [
  {
    key: "projects",
    end: 120,
    suffix: "+",
    label: "PT Projects",
    description: "Projects",
    duration: 2200,
  },
  {
    key: "area",
    end: 17,
    suffix: "M+",
    label: "sq.ft PT",
    description: "Built-Up Area",
    duration: 2200,
  },
  {
    key: "cities",
    end: 10,
    suffix: "+",
    label: "Major Cities",
    description: "Cities Served",
    duration: 1800,
  },
  {
    key: "clients",
    end: 85,
    suffix: "%",
    label: "Repeat Engagements",
    description: "Repeat Clients",
    duration: 2200,
    isRange: true,
  },
];

const Metrics = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState({
    projects: 0,
    area: 0,
    cities: 0,
    clients: "0%",
  });

  /* Section visibility */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15, rootMargin: "80px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Counter animation */
  useEffect(() => {
    if (!visible) return;

    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    METRICS.forEach((metric, index) => {
      setTimeout(() => {
        let start = null;

        const animate = (time) => {
          if (!start) start = time;
          const progress = Math.min((time - start) / metric.duration, 1);
          const eased = easeOut(progress);
          const value = Math.floor(eased * metric.end);

          setValues((prev) => ({
            ...prev,
            [metric.key]: metric.isRange
              ? progress === 1
                ? "80–90%"
                : `${value}%`
              : value,
          }));

          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      }, index * 180);
    });
  }, [visible]);

  return (
    <section className="metrics-section" ref={sectionRef}>
      <div className={`metrics-grid ${visible ? "visible" : ""}`}>
        {METRICS.map((metric, i) => (
          <div className="metric-card" key={metric.key} style={{ "--i": i }}>
            <div className="metric-number">
              {metric.isRange
                ? values[metric.key]
                : `${values[metric.key]}${metric.suffix}`}
            </div>
            <div className="metric-label">{metric.label}</div>
            <div className="metric-description">{metric.description}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Metrics;
