"use client";
import { getColors } from "@/layout/Theme/themes";
// import CountdownComponent from "../common/Countdown";
import { Link } from "react-router-dom";
import AddToCart from "../AddToCart";


export const ProductCard = ({ product }: any) => {

  return (
    <div className="card-product fl-item  w-[10em]  " key={product.id}>
      <div className="card-product-wrapper ">
        <Link to={`/product-detail/${product.id}`} className="product-img">
          <img
            className="lazyload img-product"
            data-src={product.image}
            src={`data:image/png;base64,${product.image}`}
            alt="image-product"
            width={720}
            height={1005}
          />
          <img
            className="lazyload img-hover"
            data-src={product.image ? product.image : product.image}
            src={product.image ? `data:image/png;base64,${product.image}` : `data:image/png;base64,${product.image}`}
            alt="image-product"
            width={720}
            height={1005}
          />
        </Link>
        <div className="list-product-btn">
          <div className="">
            <div style={{ background: getColors().grey[900] }}>
              {product.id && product.title && (
                <AddToCart
                  _id={product.id}
                />
              )}
            </div>
          </div>
        </div>

        {product.sizes && (
          <div className="size-list">
            {product.sizes.map((size: any) => (
              <span key={String(size)}>{String(size.sizeName)}</span>
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
