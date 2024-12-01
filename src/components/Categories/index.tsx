import { Pages } from "@/Datatypes/enums";
import { getColors } from "@/layout/Theme/themes";
import { selectedDropShipItems } from "@/lib/slices/DropShip/DropShipSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";

export default function Categories() {
  const [activeTab, setActiveTab] = useState("dresses");
  const { dropShipItems, loading } = useSelector(selectedDropShipItems);

  const handleTabClick = (targetId: string) => {
    setActiveTab(targetId);
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const categories = [
    { id: "dresses", label: "Dresses", count: 31, image: `data:image/png;base64,${dropShipItems[0]?.image}`, imageNo: 0 },
    { id: "jackets", label: "Jackets", count: 31, image: `data:image/png;base64,${dropShipItems[5]?.image}`, imageNo: 5 },
    { id: "shoes", label: "Shoes", count: 9, image: `data:image/png;base64,${dropShipItems[1]?.image}`, imageNo: 1 },
    { id: "tops", label: "Tops", count: 14, image: `data:image/png;base64,${dropShipItems[2]?.image}`, imageNo: 2 },
    { id: "winterwear", label: "Winterwear", count: 23, image: `data:image/png;base64,${dropShipItems[6]?.image}`, imageNo: 6 },
    { id: "overalls", label: "Overalls", count: 23, image: "/images/collections/collection-55.jpg", imageNo: 5 },
  ];

  const navigate = useNavigate();
  const handleNavigate = (href: string) => {
    navigate(href);
  };

  const handleImageClick = (index: number, itemIndex: number) => {
    const item = dropShipItems[itemIndex];
    if (item && item.id) {
      handleNavigate(`${Pages.SINGLE_DROPSHIP_ITEM.replace(':dropShipItemTitle', item.title).replace(':id', item.id)}`);
    }
  };

  return (
    <section className="container">
      <div className="flat-spacing-8 mb-8 mt-4 wow fadeInUp container flex justify-center hidden md:block" data-wow-delay="0s">
        <div className="tf-grid-layout-v2 flat-animate-tab md:flex">
          {/* Tabs */}
          <ul className="widget-tab-4 scroll-snap" style={{ borderColor: getColors().grey[100] }} role="tablist">
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
                  <Link to={`/category/${category.id}`} className="icon icon-arrow1-top-left mt-2" />
                </div>
              </li>
            ))}
          </ul>

          {/* Scroll Process Indicator */}
          <div className="scroll-process d-md-none" id="scroll-process">
            <div className="value-process" />
          </div>

          {/* Tab Content */}
          <div className="tab-content h-[600px] w-[600px]">
            {loading ? (
              <Skeleton variant="rectangular" width={600} height={600} />
            ) : (
              categories.map((category, index) => (
                <div
                  className={`tab-pane ${activeTab === category.id ? "active show" : ""}`}
                  id={category.id}
                  role="tabpanel"
                  key={category.id}
                >
                  <div
                    className="radius-10 o-hidden"
                    onClick={() => handleImageClick(index, category.imageNo)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      className="lazyload"
                      data-src={category.image}
                      alt={`img-${category.label}`}
                      src={category.image}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}