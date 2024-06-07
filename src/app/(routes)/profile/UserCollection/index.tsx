/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react'

export default function index({type}:any) {


  return (
    <div>
    <section className="relative py-24 pt-2">
    <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
      <img src="img/gradient_light.jpg" alt="gradient" className="h-full w-full" />
    </picture>
    <div className="container">
  
    
      <div className="tab-content">
        <div className="tab-pane fade show active" id="on-sale" role="tabpanel" aria-labelledby="on-sale-tab">
          <div className="mb-8 flex flex-wrap items-center justify-between">
            <div className="flex flex-wrap items-center">
              <div className="my-1 mr-2.5">
                <button
                  className="dropdown-toggle group group flex h-9 items-center rounded-lg border border-jacarta-100 bg-white px-4 font-display text-sm font-semibold text-jacarta-700 transition-colors hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:bg-accent"
                  id="onSaleCollectionsFilter"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="mr-1 h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white dark:fill-jacarta-100"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M7 5V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4zm2 8H4v6h16v-6h-5v3H9v-3zm11-6H4v4h5V9h6v2h5V7zm-9 4v3h2v-3h-2zM9 3v2h6V3H9z"
                    />
                  </svg>
                  <span>Collections</span>
                </button>
               
              </div>
    
              <div className="my-1 mr-2.5">
                <button
                  className="dropdown-toggle group group flex h-9 items-center rounded-lg border border-jacarta-100 bg-white px-4 font-display text-sm font-semibold text-jacarta-700 transition-colors hover:border-transparent hover:bg-accent hover:text-white dark:border-jacarta-600 dark:bg-jacarta-700 dark:text-white dark:hover:bg-accent"
                  id="onSaleCategoriesFilter"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="mr-1 h-4 w-4 fill-jacarta-700 transition-colors group-hover:fill-white dark:fill-jacarta-100"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M14 10v4h-4v-4h4zm2 0h5v4h-5v-4zm-2 11h-4v-5h4v5zm2 0v-5h5v4a1 1 0 0 1-1 1h-4zM14 3v5h-4V3h4zm2 0h4a1 1 0 0 1 1 1v4h-5V3zm-8 7v4H3v-4h5zm0 11H4a1 1 0 0 1-1-1v-4h5v5zM8 3v5H3V4a1 1 0 0 1 1-1h4z"
                    />
                  </svg>
                  <span>Category</span>
                </button>
                
              </div>
    
             
            </div>
          </div>
          info for {type}
          <div className="grid grid-cols-1 gap-[1.875rem] md:grid-cols-2 lg:grid-cols-4">
            <article>
              <div
                className="block rounded-2.5xl border border-jacarta-100 bg-white p-[1.1875rem] transition-shadow hover:shadow-lg dark:border-jacarta-700 dark:bg-jacarta-700"
              >
                <figure className="relative">
                  <a href="item.html">
                    <img
                      src="./img/products/item_5.jpg"
                      alt="item 5"
                      className="w-full rounded-[0.625rem]"
                      loading="lazy"
                    />
                  </a>
                  <div
                    className="absolute top-3 right-3 flex items-center space-x-1 rounded-md bg-white p-2 dark:bg-jacarta-700"
                  >
                    <span
                      className="js-likes relative cursor-pointer before:absolute before:h-4 before:w-4 before:bg-[url('/img/5.png')] before:bg-cover before:bg-center before:bg-no-repeat before:opacity-0"
                      data-tippy-content="Favorite">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="h-4 w-4 fill-jacarta-500 hover:fill-red dark:fill-jacarta-200 dark:hover:fill-red"
                      >
                        <path fill="none" d="M0 0H24V24H0z" />
                        <path
                          d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z"
                        />
                      </svg>
                    </span>
                    <span className="text-sm dark:text-jacarta-200">15</span>
                  </div>
                  <div className="absolute left-3 -bottom-3">
                    <div className="flex -space-x-2">
                      <a href="#">
                        <img
                          src="img/avatars/creator_1.png"
                          alt="creator"
                          className="h-6 w-6 rounded-full border-2 border-white hover:border-accent dark:border-jacarta-600 dark:hover:border-accent"
                          data-tippy-content="Creator: Sussygirl"
                        />
                      </a>
                      <a href="#">
                        <img
                          src="img/avatars/owner_1.png"
                          alt="owner"
                          className="h-6 w-6 rounded-full border-2 border-white hover:border-accent dark:border-jacarta-600 dark:hover:border-accent"
                          data-tippy-content="Owner: Sussygirl"
                        />
                      </a>
                    </div>
                  </div>
                </figure>
                <div className="mt-7 flex items-center justify-between">
                  <a href="item.html">
                    <span className="font-display text-base text-jacarta-700 hover:text-accent dark:text-white"
                      >Flourishing Cat #180</span  >
                  </a>
          
    
              </div>
              </div>
            </article>
          
          </div>
        </div>
    
      </div>
    </div>
    </section></div>
  )
}

index.propTypes = {
  type: PropTypes.any,
};