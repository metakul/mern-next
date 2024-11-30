"use client";
import React, { useEffect, useRef, useState } from "react";

// import LanguageSelect from "../common/LanguageSelect";
// import CurrencySelect from "../common/CurrencySelect";
import emailjs from "@emailjs/browser";
import { aboutLinks, footerLinks, paymentImages } from "@/data/footerLinks";
import { Link, To } from "react-router-dom";

const emailjsPublicKey = import.meta.env.VITE_PUBLIC_EMAILJS_PUBLIC_KEY as string

export default function Footer1({ bgColor = "" }) {
  useEffect(() => {
    const headings = document.querySelectorAll(".footer-heading-moblie");

    const toggleOpen = (event:any) => {
      const parent = event.target.closest(".footer-col-block");

      parent.classList.toggle("open");
    };

    headings.forEach((heading) => {
      heading.addEventListener("click", toggleOpen);
    });

    // Clean up event listeners when the component unmounts
    return () => {
      headings.forEach((heading) => {
        heading.removeEventListener("click", toggleOpen);
      });
    };
  }, []); // Empty dependency array means this will run only once on mount

  const formRef = useRef();
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const sendMail = () => {
    emailjs
      .sendForm("service_noj8796", "template_fs3xchn", formRef.current, {
        publicKey: emailjsPublicKey,
      })
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true);
          handleShowMessage();
          formRef.current.reset();
        } else {
          setSuccess(false);
          handleShowMessage();
        }
      });
  };

  return (
    <footer id="footer" className={`footer md-pb-70 ${bgColor}`}>
      <div className="footer-wrap">
        <div className="footer-body">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-md-6 col-12">
                <div className="footer-infor">
                  <div className="">
                    <Link to={`/`}>
                      <img
                        alt="image"
                        src="/logo.svg"
                        width="80"
                        height="21"
                      />
                    </Link>
                  </div>
                  <ul>
                    <li>
                      <p>
                        Address: 1234 Fashion Street, Suite 567, <br />
                        New York, NY 10001
                      </p>
                    </li>
                    <li>
                      <p>
                        Email: <a href="#">info@fashionshop.com</a>
                      </p>
                    </li>
                    <li>
                      <p>
                        Phone: <a href="#">(212) 555-1234</a>
                      </p>
                    </li>
                  </ul>
                  <Link to={`/contact-1`} className="tf-btn btn-line">
                    Get direction
                    <i className="icon icon-arrow1-top-left" />
                  </Link>
                  <ul className="tf-social-icon d-flex gap-2">
                    <li>
                      <a
                        href="#"
                        className="box-icon w_34 round social-facebook social-line"
                      >
                        <i className="icon fs-14 icon-fb relative top-3 left-3" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="box-icon w_34 round social-twiter social-line"
                      >
                        <i className="icon fs-12 icon-Icon-x relative top-3 left-3" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="box-icon w_34 round social-instagram social-line"
                      >
                        <i className="icon fs-14 icon-instagram relative top-3 left-3" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="box-icon w_34 round social-tiktok social-line"
                      >
                        <i className="icon fs-14 icon-tiktok relative top-3 left-3" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="box-icon w_34 round social-pinterest social-line"
                      >
                        <i className="icon fs-14 icon-pinterest-1 relative top-3 left-3" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 col-12 footer-col-block">
                <div className="footer-heading footer-heading-desktop">
                  <h6>Help</h6>
                </div>
                <div className="footer-heading footer-heading-moblie relative top-3 left-3">
                  <h6>Help</h6>
                </div>
                <ul className="footer-menu-list tf-collapse-content">
                  {footerLinks.map((link: { href: To; text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                    <li key={index}>
                      <Link to={link.href} className="footer-menu_item">
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-xl-3 col-md-6 col-12 footer-col-block">
                <div className="footer-heading footer-heading-desktop">
                  <h6>About us</h6>
                </div>
                <div className="footer-heading footer-heading-moblie">
                  <h6>About us</h6>
                </div>
                <ul className="footer-menu-list tf-collapse-content">
                  {aboutLinks.slice(0, 4).map((link: { href: To; text: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                    <li key={index}>
                      <Link to={link.href} className="footer-menu_item">
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-xl-3 col-md-6 col-12">
                <div className="footer-newsletter footer-col-block">
                  <div className="footer-heading footer-heading-desktop">
                    <h6>Sign Up for Email</h6>
                  </div>
                  <div className="footer-heading footer-heading-moblie">
                    <h6>Sign Up for Email</h6>
                  </div>
                  <div className="tf-collapse-content">
                    <div className="footer-menu_item">
                      Sign up to get first dibs on new arrivals, sales,
                      exclusive content, events and more!
                    </div>
                    <div
                      className={`tfSubscribeMsg ${
                        showMessage ? "active" : ""
                      }`}
                    >
                      {success ? (
                        <p style={{ color: "rgb(52, 168, 83)" }}>
                          You have successfully subscribed.
                        </p>
                      ) : (
                        <p style={{ color: "red" }}>Something went wrong</p>
                      )}
                    </div>
                    <form
                      ref={formRef}
                      onSubmit={(e) => {
                        e.preventDefault();
                        sendMail();
                      }}
                      className="form-newsletter subscribe-form"
                      action="#"
                      method="post"
                      acceptCharset="utf-8"
                      data-mailchimp="true"
                    >
                      <div className="subscribe-content">
                        <fieldset className="email">
                          <input
                            required
                            type="email"
                            name="email-form"
                            className="subscribe-email"
                            placeholder="Enter your email...."
                            tabIndex={0}
                            aria-required="true"
                            autoComplete="abc@xyz.com"
                          />
                        </fieldset>
                        <div className="button-submit">
                          <button
                            className=" tf-btn btn-sm radius-3 btn-fill btn-icon animate-hover-btn pr-0"
                            type="submit"
                          >
                            Subscribe
                            <i className="p-2 icon-arrow1-top-left" />
                          </button>
                        </div>
                      </div>
                      <div className="subscribe-msg" />
                    </form>
                    {/* <div className="tf-cur">
                      <div className="tf-currencies">
                        <CurrencySelect />
                      </div>
                      <div className="tf-languages">
                        <LanguageSelect />
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="footer-bottom-wrap d-flex gap-20 flex-wrap justify-content-between align-items-center">
                  <div className="footer-menu_item">
                    © {new Date().getFullYear()} What I Wear. All Rights
                    Reserved
                  </div>
                  <div className="tf-payment">
                    {paymentImages.map((image: { src: string | undefined; width: string | number | undefined; height: string | number | undefined; alt: string | undefined; }, index: React.Key | null | undefined) => (
                      <img
                        key={index}
                        src={image.src}
                        width={image.width}
                        height={image.height}
                        alt={image.alt}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
