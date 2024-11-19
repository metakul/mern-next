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
  ROADIES_SUPER_ADMIN = 'ROADIES_SUPER_ADMIN',
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
  ADD_DROPSHIP_ITEM = "/ADD_DROPSHIP_ITEM" ,
  SINGLE_DROPSHIP_ITEM = "/SINGLE_DROPSHIP_ITEM/:dropShipItemTitle/:id" ,
}

export enum HomePageInfo{
  pageTitle="HomePage",
  pageDescription="This is home page",
  
}
export enum ProtectedPageInfo{
  pageTitle="Dashboard",
  pageDescription="This is Protected page",
}
const base_url_backend="http://localhost:5002/v1"
const base_url_rajorpay="https://api.razorpay.com/v1"

// define endpoints here
  export const ApiEndpoint: Record<string, any> = {
    // LOGIN: {apiId:1, withAuth:false,url: '/api/login', method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Logging In",successMessage:"Logged In",errorMessage:"Error While Login"},
    // ADMINLOGGIN: {apiId:2,withAuth:false, url: '/auth/systemAdmin/login', method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Logging In",successMessage:"Logged In",errorMessage:"Error While Admin Login"},
    GETBLOG: { apiId:3, withAuth:false, url: `${base_url_backend}/blogs/blogType`, method: 'GET', headers: { 'Content-Type': 'application/json'},loadingMessage:"Welcome",successMessage:"",errorMessage:"No Blogs Found"},
    GETSINGLEBLOG: { apiId:4, withAuth:false, url: `${base_url_backend}/blogs`, method: 'GET', headers: { 'Content-Type': 'application/json'},loadingMessage:"Loading Current Blogs",successMessage:"Blog Loaded SuccessFully",errorMessage:"Error Loading Blog"},
    ADD_BLOG: { apiId:5, withAuth:true, url: `${base_url_backend}/blogs`, method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Adding New Blog",successMessage:"Blog Added Successfully",errorMessage:"Error Loading Blogs"},
    UPDATE_BLOG_STATUS: { apiId:6, withAuth:true, url: `${base_url_backend}/blogs/updateStatus`, method: 'PATCH', headers: { 'Content-Type': 'application/json'},loadingMessage:"Approving Blog",successMessage:"Blog Status Updates SuccessFully",errorMessage:"Error Approving Blogs"},
    EDIT_BLOG: { apiId:7, withAuth:true, url: `${base_url_backend}/blogs`, method: 'PATCH', headers: { 'Content-Type': 'application/json'},loadingMessage:"Editing Blog",successMessage:"Blog Updated successfully",errorMessage:"Error Updating Blog"},
    FetchCryptoInfo: { apiId:8, withAuth:false, url: "https://rest.coinapi.io/v1/exchangerate", method: 'GET', headers: { "X-CoinAPI-Key":"7bcdeaf0-f41c-4538-ad46-e7a15d4da51c"}, loadingMessage:"",successMessage:"",errorMessage:"",showmsg:false},
    
    
    // main backend 
    // register user
    
    RegisterUser: { apiId:9, withAuth:false, url: `${base_url_backend}/register`, method: 'POST', headers: { 'Content-Type': 'application/json'}, loadingMessage:"Registering",successMessage:"Register SuccessFull. Login To Enter", errorMessage:"Oho, Retry or Join discord to get in touch."},
    
    // LOGIN USER
    MAIN_LOGIN: {apiId:10,  withAuth:false,url: `${base_url_backend}/login`, method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Logging In",successMessage:"Logged In",errorMessage:"Error While Login"},
    
    
    // bots
    GetBot: { apiId:11, withAuth:true, url: `${base_url_backend}/bots`, method: 'GET', headers: { 'Content-Type': 'application/json'}, loadingMessage:"Loading My Bots",successMessage:"Bots retrievd successfully SuccessFull.", errorMessage:"Oho,Error fetching "},
    
    create_bot: { apiId:12, withAuth:true, url: `${base_url_backend}/create_bot`, method: 'POST', headers: {  }, loadingMessage:"Loading My Bots",successMessage:"Bots retrievd successfully SuccessFull.", errorMessage:"Oho,Error fetching "},
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

    // DROPSHIP API
    GET_DROPSHIP_ITEMS: { apiId:15, withAuth:false, url: `${base_url_backend}/DropShip/dropShipType`, method: 'GET', headers: { 'Content-Type': 'application/json'},loadingMessage:"Welcome",successMessage:"",errorMessage:""},
    GET_SINGLE_DROPSHIP_ITEM: { apiId:16, withAuth:false, url: `${base_url_backend}/DropShip`, method: 'GET', headers: { 'Content-Type': 'application/json'},loadingMessage:"",successMessage:"",errorMessage:"Error Loading Items"},
    ADD_DROPSHIP_ITEM: { apiId:17, withAuth:true, url: `${base_url_backend}/DropShip`, method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Adding New Item",successMessage:"Item Added Successfully",errorMessage:"Error Loading Items"},
    UPDATE_DROPSHIP_ITEM_STATUS: { apiId:18, withAuth:true, url: `${base_url_backend}/DropShip/updateStatus`, method: 'PATCH', headers: { 'Content-Type': 'application/json'},loadingMessage:"Approving Item",successMessage:"Item Status Updates SuccessFully",errorMessage:"Error Updating Item Status"},
    EDIT_DROPSHIP_ITEM: { apiId:19, withAuth:true, url: `${base_url_backend}/DropShip`, method: 'PATCH', headers: { 'Content-Type': 'application/json'},loadingMessage:"Editing Item",successMessage:"Item Updated successfully",errorMessage:"Error Updating Item"},
    
    //  rajorPayW
    GET_PAYMENT_INFO: { apiId:15, withAuth:false, url: `${base_url_backend}/payment`, method: 'GET', headers: { 'Content-Type': 'application/json'},loadingMessage:"Welcome",successMessage:"",errorMessage:""},
    
    // passwordless Login
    SEND_OTP: { apiId:16, withAuth:false, url: `${base_url_backend}/passwordless/login`, method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Welcome",successMessage:"",errorMessage:""},
    VERIFY_OTP: { apiId:17, withAuth:false, url: `${base_url_backend}/passwordless/verifyOtp`, method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Welcome",successMessage:"",errorMessage:""},
  }

  
export enum BlogsStatusInfo {
  APPROVED="approved",
  PENDING="pending"
}

export enum DropShipStatusInfo {
  APPROVED="approved",
  PENDING="pending"
}