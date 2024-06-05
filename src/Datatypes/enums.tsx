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
    LOGIN: {apiId:1, url: 'https://smart-wallet-us83.onrender.com/auth/user/login', method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Logging In"},
    ADMINLOGGIN: {apiId:2, url: '/smartwallet/auth/systemAdmin/login', method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Logging In"},
    GETBLOG: { apiId:3,url: 'https://blog-app-dxj7.onrender.com/post/postType', method: 'GET', headers: { 'Content-Type': 'application/json'},loadingMessage:""},
    GETSINGLEBLOG: { apiId:4, url: 'https://blog-app-dxj7.onrender.com/post', method: 'GET', headers: { 'Content-Type': 'application/json'},loadingMessage:"Loading Current Blogs"},
    ADD_BLOG: { apiId:5, url: 'https://blog-app-dxj7.onrender.com/post', method: 'POST', headers: { 'Content-Type': 'application/json'},loadingMessage:"Adding New Blog"},
    UPDATE_BLOG: { apiId:6, url: 'https://blog-app-dxj7.onrender.com/post/updateStatus', method: 'PATCH', headers: { 'Content-Type': 'application/json'},loadingMessage:"Approving Blog"},
    EDIT_BLOG: { apiId:7, url: 'https://blog-app-dxj7.onrender.com/post', method: 'PATCH', headers: { 'Content-Type': 'application/json'},loadingMessage:"Editing Blog"},
    FetchCryptoInfo: { apiId:8, url: "https://rest.coinapi.io/v1/exchangerate", method: 'GET', headers: { "X-CoinAPI-Key":"21F0E4E9-1955-4555-A4DA-51524A1E8ED3"}, loadingMessage:"Loading Crypto"},
  };
  

  
export enum BlogsStatusInfo {
  APPROVED="approved",
  PENDING="pending"
}