"use client";
import { useContextElement } from "@/context/Context";
import { getColors } from "@/layout/Theme/themes";
import { JSXElementConstructor, Key, ReactElement, ReactNode, useEffect, useState } from "react";
// import CountdownComponent from "../common/Countdown";
import { Link } from "react-router-dom";


export const ProductCard = ({ product }:any) => {
  const [currentImage, setCurrentImage] = useState(product.imgSrc);
  const { setQuickViewItem } = useContextElement();
  const {
    setQuickAddItem,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
  } = useContextElement();
  useEffect(() => {
    setCurrentImage(product.imgSrc);
  }, [product]);

  return (
    <div className="card-product fl-item  w-[10em] " key={product.id}>
      <div className="card-product-wrapper">
        <Link to={`/product-detail/${product.id}`} className="product-img">
          <img
            className="lazyload img-product"
            data-src={product.imgSrc}
            src={currentImage}
            alt="image-product"
            width={720}
            height={1005}
          />
          <img
            className="lazyload img-hover"
            data-src={
              product.imgHoverSrc ? product.imgHoverSrc : product.imgSrc
            }
            src={product.imgHoverSrc ? product.imgHoverSrc : product.imgSrc}
            alt="image-product"
            width={720}
            height={1005}
          />
        </Link>
        <div className="list-product-btn">
          <a
            href="#quick_add"
            onClick={() => setQuickAddItem(product.id)}
            data-bs-toggle="modal"
            className="box-icon  quick-add tf-btn-loading"
            style={{
              background:getColors().grey[100]
            }}
          >
            <span className="icon icon-bag"  style={{
                color:getColors().grey[900]
              }} />
            <span className="tooltip">Quick Add</span>
          </a>
          <a
            onClick={() => addToWishlist(product.id)}
            className="box-icon  wishlist btn-icon-action"
            style={{
              background:getColors().grey[100]
            }}
          >
            <span
              className={`icon icon-heart ${
                isAddedtoWishlist(product.id) ? "added" : ""
              }`}
              style={{
                color:getColors().grey[900]
              }} 
            />
            <span className="tooltip">
              {isAddedtoWishlist(product.id)
                ? "Already Wishlisted"
                : "Add to Wishlist"}
            </span>
            <span className="icon icon-delete"  />
          </a>
          <a
            href="#compare"
            data-bs-toggle="offcanvas"
            aria-controls="offcanvasLeft"
            onClick={() => addToCompareItem(product.id)}
            className="box-icon  compare btn-icon-action"
            style={{
              background:getColors().grey[100]
            }}
          >
            <span
              className={`icon icon-compare  ${
                isAddedtoCompareItem(product.id) ? "added" : ""
              }` }
              style={{
                color:getColors().grey[900]
              }} 
            />
            <span className="tooltip">
              {" "}
              {isAddedtoCompareItem(product.id)
                ? "Already Compared"
                : "Add to Compare"}
            </span>
            <span className="icon icon-check" style={{
              color:getColors().grey[900]
            }}  />
          </a>
          <a
            href="#quick_view"
            onClick={() => setQuickViewItem(product)}
            data-bs-toggle="modal"
            className="box-icon  quickview tf-btn-loading"
            style={{
              background:getColors().grey[100]
            }}
          >
            <span className="icon icon-view" style={{
              color:getColors().grey[900]
            }} />
            <span className="tooltip">Quick View</span>
          </a>
        </div>

        {/* // todo add sale time countdown */}
        {/* {product.countdown && (
          <div className="countdown-box">
            <div className="js-countdown">
              <CountdownComponent />
            </div>
          </div>
        )} */}
        {product.sizes && (
          <div className="size-list">
            {product.sizes.map((size: boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Key | null | undefined) => (
              <span key={String(size)}>{String(size)}</span>
            ))}
          </div>
        )}
      </div>
      <div className="card-product-info">
        <Link to={`/product-detail/${product.id}`} className="title link">
          {product.title}
        </Link>
        <span className="price">${product.price.toFixed(2)}</span>

        {/* // todo add color */}
        {/* {product.colors && (
          <ul className="list-color-product">
            {product.colors.map((color: { imgSrc: string | undefined; name: boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Key | null | undefined; colorClass: any; }) => (
              <li
                className={`list-color-item color-swatch ${
                  currentImage == color.imgSrc ? "active" : ""
                } `}
                key={String(color.name)}
                onMouseOver={() => setCurrentImage(color.imgSrc)}
              >
                <span className="tooltip">{String(color.name)}</span>
                <span className={`swatch-value ${color.colorClass}`} />
                <img
                  className="lazyload"
                  data-src={color.imgSrc}
                  src={color.imgSrc}
                  alt="image-product"
                  width={720}
                  height={1005}
                />
              </li>
            ))}
          </ul>
        )} */}
      </div>
    </div>
  );
};
