"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Quantity from "../Quantity";
import { allProducts } from "@/data/products";
import { colors, sizeOptions } from "@/data/singleProductOpotions";
import { Link } from "react-router-dom";
import { addToCartApi } from "@/lib/slices/DropShip/DropShipAPI";
// import { isAddedToCartSelector } from "@/lib/slices/DropShip/DropShipSlice"; // Custom selector
import { AppDispatch } from "@/lib/store";
import { useSelectedDropShipItem } from "@/lib/slices/DropShip/DropShipSlice";

interface QuickAddProps {
  _id: string;
  sizes: { sizeName: string; totalItems: number }[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
  mode: 'view' | 'add'; 
}

const QuickAdd: React.FC<QuickAddProps> = ({ _id, sizes, selectedSize, onSelectSize }) => {
  const selectedDropShipItem = useSelector(useSelectedDropShipItem(_id));

  const dispatch = useDispatch<AppDispatch>();
  const [item, setItem] = useState(selectedDropShipItem);

  // State for color and size
  // const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentSize, setCurrentSize] = useState(selectedSize || sizes[0]?.sizeName);

  useEffect(() => {
    setCurrentSize(selectedSize);
  }, [selectedSize]);

  // Handle Add to Cart Action
  const handleAddToCart = () => {
    if (selectedDropShipItem) {
      const cartItem = {
        id: _id,
        name: selectedDropShipItem.title,
        image: selectedDropShipItem.image,
        size: currentSize,
        quantity: 1,
        // color: currentColor.value,
      };
      dispatch(addToCartApi({ item: cartItem, isAuthenticated: true }));
    }
  };

  return (
   
        <div className="p-4">
          <div className="header">
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="wrap">
            <div className="tf-product-info-item">
              <div className="image">
                {item && (
                  <img
                    alt="image"
                    style={{ objectFit: "contain" }}
                    src={`data:image/png;base64,${item.image}`}
                    width={150}
                    height={200}
                  />
                )}
              </div>
              <div className="content">
                {item && <Link to={`/product-detail/${item.id}`}>{item.title}</Link>}
                <div className="tf-product-info-price">
                  {item && item.price !== undefined && (
                    <div className="price">${item.price.toFixed(2)}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="tf-product-info-variant-picker mb_15">
              {/* <div className="variant-picker-item">
                <div className="variant-picker-label">
                  Color:
                  <span className="fw-6 variant-picker-label-value">
                    {currentColor.value}
                  </span>
                </div>
                <form className="variant-picker-values">
                  {colors.map((color: any) => (
                    <React.Fragment key={color.id}>
                      <input
                        type="radio"
                        name="color1"
                        readOnly
                        checked={currentColor === color}
                      />
                      <label
                        onClick={() => setCurrentColor(color)}
                        className="hover-tooltip radius-60"
                        data-value={color.value}
                      >
                        <span className={`btn-checkbox ${color.className}`} />
                        <span className="tooltip">{color.value}</span>
                      </label>
                    </React.Fragment>
                  ))}
                </form>
              </div> */}
              <div className="variant-picker-item">
                <div className="variant-picker-label">
                  Size:{" "}
                  <span className="fw-6 variant-picker-label-value">
                  Size: <span className="fw-6">{currentSize}</span>
                  </span>
                </div>
                <form className="variant-picker-values">
              {sizes.map((size) => (
                <label
                  key={size.sizeName}
                  onClick={() => {
                    setCurrentSize(size.sizeName);
                    onSelectSize(size.sizeName);
                  }}
                  className={`style-text ${currentSize === size.sizeName ? 'selected' : ''}`}
                >
                  <p>{size.sizeName}</p>
                </label>
              ))}
            </form>
              </div>
            </div>
            <div className="tf-product-info-quantity mb_15">
              <div className="quantity-title fw-6">Quantity</div>
              <Quantity />
            </div>
            <div className="tf-product-info-buy-button">
              <form onSubmit={(e) => e.preventDefault()} className="">
                <a
                  className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn"
                  onClick={handleAddToCart}
                >
                  <span>
                    Add To Cart
                    {/* {isAddedToCart ? "Already Added - " : "Add to cart - "} */}
                  </span>
                  {item && item.price !== undefined && (
                    <span className="tf-qty-price">${item.price.toFixed(2)}</span>
                  )}
                </a>
                <div className="tf-product-btn-wishlist btn-icon-action">
                  <i className="icon-heart" />
                  <i className="icon-delete" />
                </div>
                <a
                  href="#compare"
                  data-bs-toggle="offcanvas"
                  aria-controls="offcanvasLeft"
                  className="tf-product-btn-wishlist box-icon bg_white compare btn-icon-action"
                >
                  <span className="icon icon-compare" />
                  <span className="icon icon-check" />
                </a>
                <div className="w-100">
                  <a href="#" className="btns-full">
                    Buy with
                    <img
                      alt="image"
                      src="/images/payments/paypal.png"
                      width={64}
                      height={18}
                    />
                  </a>
                  <a href="#" className="payment-more-option">
                    More payment options
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
    
  );
}
export default QuickAdd;
