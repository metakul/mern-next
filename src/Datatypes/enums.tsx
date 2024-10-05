// import { RequestOptions } from "../interfaces/interface";
// enums.ts
export enum UserType {
  ADMIN = 'admin',
  USER = 'user',
  RANDOM = 'random',
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
  DASHBOARD = '/dashboard/app',
  MINT = '/mint',
  CAREER = '/Career',
  EARN = '/EARN',
  CREATE_NFT = "/CREATE_NFT",
  LAUNDRY_PAGE = "/laundry",
  CREATE_ORDER = "/createOrder",
  SINGLE_BLOG = "/blogDetails/:id" 
}

export enum HomePageInfo{
  pageTitle="HomePage",
  pageDescription="This is home page",
  
}
export enum ProtectedPageInfo{
  pageTitle="Dashboard",
  pageDescription="This is Protected page",
}
const base_url_backend="http://localhost:5000/v1"

// define endpoints here
  export const ApiEndpoint: Record<string, any> = {
    LOGIN: {apiId:1, withAuth:false,url: '/api/login', method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Logging In",successMessage:"Logged In",errorMessage:"Error While Login"},
    ADMINLOGGIN: {apiId:2,withAuth:false, url: '/auth/systemAdmin/login', method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Logging In",successMessage:"Logged In",errorMessage:"Error While Admin Login"},
    GETBLOG: { apiId:3, withAuth:false, url: '/api/blogs', method: 'GET', headers: { 'Content-Type': 'application/json'},loadingMessage:"Welcome",successMessage:"SuccessFully Loaded website",errorMessage:""},
    GETSINGLEBLOG: { apiId:4, withAuth:false, url: '/blogdetails/api', method: 'GET', headers: { 'Content-Type': 'application/json'},loadingMessage:"Loading Current Blogs",successMessage:"Blog Loaded SuccessFully",errorMessage:"Error Loading Blog"},
    ADD_BLOG: { apiId:5, withAuth:true, url: '/api/blogs', method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Adding New Blog",successMessage:"Blog Added Successfully",errorMessage:"Error Loadinf Blogs"},
    UPDATE_BLOG: { apiId:6, withAuth:true, url: '/blogdetails/api', method: 'PATCH', headers: { 'Content-Type': 'application/json'},loadingMessage:"Approving Blog",successMessage:"Blog Approved SuccessFully",errorMessage:"Error Approving Blogs"},
    EDIT_BLOG: { apiId:7, withAuth:true, url: '/api/blogs/singleBlog', method: 'PATCH', headers: { 'Content-Type': 'application/json'},loadingMessage:"Editing Blog",successMessage:"Blog Updated successfully",errorMessage:"Error Updating Blog"},
    FetchCryptoInfo: { apiId:8, withAuth:false, url: "https://rest.coinapi.io/v1/exchangerate", method: 'GET', headers: { "X-CoinAPI-Key":"21F0E4E9-1955-4555-A4DA-51524A1E8ED3"}, loadingMessage:"",successMessage:"",errorMessage:""},
    
    
    // main backend 
    // register user
    
    RegisterUser: { apiId:9, withAuth:false, url: `${base_url_backend}/register`, method: 'POST', headers: { 'Content-Type': 'application/json'}, loadingMessage:"Registering",successMessage:"Register SuccessFull. Login To Enter", errorMessage:"Oho, Retry or Join discord to get in touch."},
    
    // LOGIN USER
    USER_LOGIN: {apiId:10,  withAuth:false,url: `${base_url_backend}/login`, method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Logging In",successMessage:"Logged In",errorMessage:"Error While Login"},
    
    
    // bots
    GetBot: { apiId:11, withAuth:true, url: `${base_url_backend}/bots`, method: 'GET', headers: { 'Content-Type': 'application/json'}, loadingMessage:"Loading My Bots",successMessage:"Bots retrievd successfully SuccessFull.", errorMessage:"Oho,Error fetching "},
    
    create_bot: { apiId:12, withAuth:true, url: `${base_url_backend}/create_bot`, method: 'POST', headers: { 'Content-Type': 'application/json'}, loadingMessage:"Loading My Bots",successMessage:"Bots retrievd successfully SuccessFull.", errorMessage:"Oho,Error fetching "},

  }

  
export enum BlogsStatusInfo {
  APPROVED="approved",
  PENDING="pending"
}