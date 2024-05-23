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

// define endpoints here
  export const ApiEndpoint: Record<string, any> = {
    LOGIN: {apiId:1, url: '/auth/user/login', method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Logging In",successMessage:"Logged In",errorMessage:"Error While Login"},
    ADMINLOGGIN: {apiId:2, url: '/auth/systemAdmin/login', method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Logging In",successMessage:"Logged In",errorMessage:"Error While Admin Login"},
    GETBLOG: { apiId:3,url: '/api/blogs', method: 'GET', headers: { 'Content-Type': 'application/json'},loadingMessage:"Welcome",successMessage:"SuccessFully Loaded website",errorMessage:""},
    GETSINGLEBLOG: { apiId:4, url: 'api/', method: 'GET', headers: { 'Content-Type': 'application/json'},loadingMessage:"Loading Current Blogs",successMessage:"Blog Loaded SuccessFully",errorMessage:"Error Loading Blog"},
    ADD_BLOG: { apiId:5, url: '/api/blogs/addBlog', method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Adding New Blog",successMessage:"Blog Added Successfully",errorMessage:"Error Loadinf Blogs"},
    UPDATE_BLOG: { apiId:6, url: '/api/blogs/updateStatus', method: 'PATCH', headers: { 'Content-Type': 'application/json'},loadingMessage:"Approving Blog",successMessage:"Blog Approved SuccessFully",errorMessage:"Error Approving Blogs"},
    EDIT_BLOG: { apiId:7, url: '/api/blogs/singleBlog', method: 'PATCH', headers: { 'Content-Type': 'application/json'},loadingMessage:"Editing Blog",successMessage:"Blog Updated successfully",errorMessage:"Error Updating Blog"},
    FetchCryptoInfo: { apiId:8, url: "/api/v1/exchangerate", method: 'GET', headers: { "X-CoinAPI-Key":"21F0E4E9-1955-4555-A4DA-51524A1E8ED3"}, loadingMessage:"",successMessage:"",errorMessage:""},
  };

  
export enum BlogsStatusInfo {
  APPROVED="approved",
  PENDING="pending"
}