import PropTypes from 'prop-types';
import MyMetakulNft from './collection/metakulNft';

export default function index({type,collectionAddress}:any) {

  console.log(type);
  

  return (
    <div>
    <section className="relative py-24 pt-2">
 
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
          {/* info for {type} */}
        <MyMetakulNft collectionAddress={collectionAddress as string}/>
          
        </div>
    
      </div>
    </div>
    </section></div>
  )
}

index.propTypes = {
  type: PropTypes.any,
  collectionAddress:PropTypes.any
};