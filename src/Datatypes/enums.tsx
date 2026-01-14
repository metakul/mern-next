// import { RequestOptions } from "../interfaces/interface";
// enums.ts

// via backend
export enum accountStatus {
  Approved = 'approved',
  Rejected = 'rejected',
  Pending = 'pending',
  Blocked='blocked'
}

export enum UserCategory {
  Verifier = 'verifier',
  Holder = 'holder',
  User = 'user',
  SUPER_ADMIN = 'SUPER_ADMIN',
}


export enum Tabs {
  tabTitle1="Home",
  tabTitle2="BTC",
  tabTitle3="Wallet",
  tabTitle4="PROFILE"
}

export enum NftTabs {
  tabTitle1="Home",
  tabTitle2="BTC",
  tabTitle3="Wallet",
  tabTitle4="PROFILE"
}

export enum Pages {
  HOME = '/',
  PROFILE = '/profile',
  DASHBOARD = '/dashboard/app',
  MINT = '/mint',
  CAREER = '/Career',
  EARN = '/EARN',
  CREATE_NFT = "/CREATE_NFT",
  LAUNDRY_PAGE = "/laundry",
  CREATE_ORDER = "/createOrder",
  SINGLE_BLOG = "/blogDetails/:blogTitle/:id" ,
  INSTA_BOT = "/instabot" ,
  SHOPPING = "/shopping" ,
  ADD_BLOG = "/addblog" ,
  CHAT_GPT = "/ChatGpt" ,
  MARKETPLACE = "/Marketplace" ,
  SELL = "/SELL" ,
  DEX_PAGE = "/exchange" ,
  SWAP_PAGE = "/quick-swap" ,
  API_PAGE = "/metakul-api" ,
 GURUKUL = "/learning/:courseId/:topicId" ,
 ADD_COURSE="/add-course"
}

export enum HomePageInfo{
  pageTitle="HomePage",
  pageDescription="This is home page",
  
}
export enum ProtectedPageInfo{
  pageTitle="Dashboard",
  pageDescription="This is Protected page",
}

// const base_url_backend="https://backend-everything-37ada44e5086.herokuapp.com/v1"
const base_url_backend="https://metakul.com/v1"

// define endpoints here
  export const ApiEndpoint: Record<string, any> = {
    // LOGIN: {apiId:1, withAuth:false,url: '/api/login', method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Logging In",successMessage:"Logged In",errorMessage:"Error While Login"},
    // ADMINLOGGIN: {apiId:2,withAuth:false, url: '/auth/systemAdmin/login', method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Logging In",successMessage:"Logged In",errorMessage:"Error While Admin Login"},
    GETBLOG: { apiId:3, withAuth:false, url: `${base_url_backend}/blogs/blogType`, method: 'GET', headers: { 'Content-Type': 'application/json'},loadingMessage:"Welcome",successMessage:"",errorMessage:"No Blogs Found"},
    GETSINGLEBLOG: { apiId:4, withAuth:false, url: `${base_url_backend}/blogs`, method: 'GET', headers: { 'Content-Type': 'application/json'},loadingMessage:"Loading Current Blogs",successMessage:"",errorMessage:"Error Loading Blog"},
    ADD_BLOG: { apiId:5, withAuth:true, url: `${base_url_backend}/blogs`, method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Adding New Blog",successMessage:"Blog Added Successfully",errorMessage:"Error Loading Blogs"},
    UPDATE_BLOG_STATUS: { apiId:6, withAuth:true, url: `${base_url_backend}/blogs/updateStatus`, method: 'PATCH', headers: { 'Content-Type': 'application/json'},loadingMessage:"Approving Blog",successMessage:"Blog Status Updates SuccessFully",errorMessage:"Error Approving Blogs"},
    EDIT_BLOG: { apiId:7, withAuth:true, url: `${base_url_backend}/blogs`, method: 'PATCH', headers: { 'Content-Type': 'application/json'},loadingMessage:"Editing Blog",successMessage:"Blog Updated successfully",errorMessage:"Error Updating Blog"},
    FetchCryptoInfo: { apiId:8, withAuth:false, url: `${base_url_backend}/tokenPriceSingle` , method: 'GET', headers: { 'Content-Type': 'application/json' }, loadingMessage:"",successMessage:"",errorMessage:"",showmsg:false},
    tokenPrice: { apiId:81, withAuth:false, url: `${base_url_backend}/tokenPrice` , method: 'GET', headers: { 'Content-Type': 'application/json' }, loadingMessage:"",successMessage:"",errorMessage:"",showmsg:false},
    
    
    // main backend 
    // register user
    
    RegisterUser: { apiId:9, withAuth:false, url: `${base_url_backend}/register`, method: 'POST', headers: { 'Content-Type': 'application/json'}, loadingMessage:"Registering",successMessage:"Register SuccessFull. Login To Enter", errorMessage:"Oho, Retry or Join discord to get in touch."},
    
    // LOGIN USER
    MAIN_LOGIN: {apiId:10,  withAuth:false,url: `${base_url_backend}/login`, method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Logging In",successMessage:"Logged In",errorMessage:"Error While Login"},
    
    
    // bots
    GetBot: { apiId:11, withAuth:true, url: `${base_url_backend}/bots`, method: 'GET', headers: { 'Content-Type': 'application/json'}, loadingMessage:"Loading My Bots",successMessage:"Bots retrievd successfully.", errorMessage:""},
    
    create_bot: { apiId:12, withAuth:true, url: `${base_url_backend}/create_bot`, method: 'POST', headers: {  }, loadingMessage:"Adding new Bots",successMessage:"Bots added successfully.", errorMessage:""},
    CHATGPT: { 
      apiId: 13, 
      isChatGpt: true,
      url: 'https://api.openai.com/v1/chat/completions', 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      loadingMessage: "Fetching response from ChatGPT", 
      successMessage: "", 
      errorMessage: "Error fetching response from ChatGPT"
    },

    //random
    increaseTotalDownloadCount: { apiId:14, withAuth:true, url: `${base_url_backend}/increaseTotalDownloadCount`, method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"",successMessage:"",errorMessage:""},
    
    
  // courses
  ADD_COURSE: { apiId:15, withAuth:true, url: `${base_url_backend}/courses`, method: 'POST', headers: { 'Content-Type': 'application/json'}, loadingMessage:"Adding New Course", successMessage:"", errorMessage:"" },
  GET_ALL_COURSES: { apiId:16, withAuth:false, url: `${base_url_backend}/courses`, method: 'GET', headers: { 'Content-Type': 'application/json'}, loadingMessage:"Loading Courses", successMessage:"", errorMessage:"" },
  GET_COURSE_BY_ID: { apiId:17, withAuth:false, url: `${base_url_backend}/courses/{courseId}`, method: 'GET', headers: { 'Content-Type': 'application/json'}, loadingMessage:"Loading Course", successMessage:"", errorMessage:"" },
  DELETE_COURSE: { apiId:18, withAuth:true, url: `${base_url_backend}/courses/{courseId}`, method: 'DELETE', headers: { 'Content-Type': 'application/json'}, loadingMessage:"Deleting Course", successMessage:"", errorMessage:"" },
  ADD_TOPICS_TO_COURSE: { apiId:19, withAuth:true, url: `${base_url_backend}/courses`, method: 'POST', headers: { 'Content-Type': 'application/json'}, loadingMessage:"Adding Topics", successMessage:"", errorMessage:"" },
  DELETE_TOPIC_FROM_COURSE: { apiId: 20, withAuth: true, url: `${base_url_backend}/courses`, method: 'DELETE', headers: { 'Content-Type': 'application/json' }, loadingMessage: "Deleting Topic", successMessage: "", errorMessage: "" },
  UPDATE_TOPIC_IN_COURSE: { apiId: 21, withAuth: true, url: `${base_url_backend}/courses`, method: 'PUT', headers: { 'Content-Type': 'application/json' }, loadingMessage: "Updating Topic", successMessage: "", errorMessage: "" },
  

  // NFT
  ADD_NFT_INFO_WHILE_SELLING_IN_MARKETPLACE: { apiId: 22, withAuth: false, url: `${base_url_backend}/add_nft_transfer_info`, method: 'POST', headers: { 'Content-Type': 'application/json' }, loadingMessage: "Saving Nft info", successMessage: "", errorMessage: "" },
};

  
export enum BlogsStatusInfo {
  APPROVED="approved",
  PENDING="pending"
}
