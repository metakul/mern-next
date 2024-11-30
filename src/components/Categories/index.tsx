import { getColors } from "@/layout/Theme/themes";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Categories() {
  const [activeTab, setActiveTab] = useState("dresses");

  const handleTabClick = (targetId: string) => {
    setActiveTab(targetId);
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const categories = [
    { id: "dresses", label: "Dresses", count: 31, image: "/images/collections/collection-49.jpg" },
    { id: "tops", label: "Tops", count: 14, image: "/images/collections/collection-50.jpg" },
    { id: "shirtsBlouses", label: "Shirts Blouses", count: 31, image: "/images/collections/collection-51.jpg" },
    { id: "pants", label: "Pants", count: 9, image: "/images/collections/collection-52.jpg" },
    { id: "cardigans", label: "Cardigans", count: 23, image: "/images/collections/collection-53.jpg" },
    { id: "blazers", label: "Blazers", count: 9, image: "/images/collections/collection-54.jpg" },
    { id: "overalls", label: "Overalls", count: 23, image: "/images/collections/collection-55.jpg" },
  ];

  return (
    <section className="flat-spacing-8 mb-16 mt-8 wow fadeInUp" data-wow-delay="0s">
      <div className="container">
        <div className="tf-grid-layout-v2 flat-animate-tab md:flex">
          {/* Tabs */}
          <ul className="widget-tab-4 scroll-snap" style={{
            borderColor:getColors().grey[100]
          }} role="tablist">
            {categories.map((category) => (
              <li className="nav-tab-item" role="presentation" key={category.id}>
                <div
                  className={`nav-tab-link ${activeTab === category.id ? "active" : ""}`}
                  onClick={() => handleTabClick(category.id)}
                >
                  <span className="text">
                    {category.label}
                    <span className="count">{category.count}</span>
                  </span>
                  <Link to="/shop-collection-sub" className="icon icon-arrow1-top-left mt-2" />
                </div>
              </li>
            ))}
          </ul>

          {/* Scroll Process Indicator */}
          <div className="scroll-process d-md-none" id="scroll-process">
            <div className="value-process" />
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {categories.map((category) => (
              <div
                className={`tab-pane ${activeTab === category.id ? "active show" : ""}`}
                id={category.id}
                role="tabpanel"
                key={category.id}
              >
                <Link to={category.label}className="fullwidth radius-10 o-hidden">
                  <img
                    className="lazyload"
                    data-src={category.image}
                    alt={`img-${category.label}`}
                    src={category.image}
                    width={720}
                    height={597}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
