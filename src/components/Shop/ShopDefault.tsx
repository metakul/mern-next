import { layouts } from "@/data/shop";
import ProductGrid from "./ProductGrid";
import { useState } from "react";
import Pagination from "../Pagination";
import ShopFilter from "./ShopFilter";
import Sorting from "./Sorting";
import { IDropShipItem } from "@/Datatypes/interfaces/interface";


interface ShopDefaultProps {
  cartItems: IDropShipItem[];
  loading?:boolean
}

const ShopDefault:React.FC<ShopDefaultProps>=({cartItems,loading})=> {
  const [gridItems, setGridItems] = useState(4);
  const [products, setProducts] = useState(cartItems);


  //set sorting
  const [finalSorted, setFinalSorted] = useState(cartItems);

  console.log("finalSorted",cartItems);
  
  return (
    <>
      <section className="flat-spacing-2 mt-8">
        <div className="container">
          <div className=" grid grid-cols-3 items-center gap-4">
            <div className="tf-control-filter">
              <a
                href="#filterShop"
                data-bs-toggle="offcanvas"
                aria-controls="offcanvasLeft"
                className="tf-btn-filter"
              >
                <span className="icon icon-filter pt-2" />
                <span className="text">Filter</span>
              </a>
            </div>
            <ul className="tf-control-layout d-flex justify-content-center pt-3">
              {layouts.map((layout, index) => (
                <li
                  key={index}
                  className={`tf-view-layout-switch ${layout.className} ${gridItems === Number(layout.dataValueGrid) ? "active" : ""
                    }`}
                  onClick={() => setGridItems(Number(layout.dataValueGrid))}
                >
                  <div className="item">
                    <span className={`icon ${layout.iconClass}`} />
                  </div>
                </li>
              ))}
            </ul>
            <div className="tf-control-sorting d-flex justify-content-end">
              <div className="tf-dropdown-sort " data-bs-toggle="dropdown">
                <Sorting setFinalSorted={setFinalSorted} products={products} />
              </div>
            </div>
          </div>
          <div className="wrapper-control-shop">
            <div className="meta-filter-shop" />
            <ProductGrid allproducts={cartItems} gridItems={gridItems} loading={loading}/>
            {/* pagination */}
            {finalSorted.length ? (
              <ul className="tf-pagination-wrap tf-pagination-list tf-pagination-btn">
                <Pagination />
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
      <ShopFilter setProducts={setProducts} />
    </>
  );
}

export default ShopDefault
