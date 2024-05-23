//pages interface
import { AxiosRequestConfig } from "axios"
import { AllowlistProofType } from "@/lib/slices/Web3Profile/whitelist";
export interface Layoutprops {
}

export interface HomePageProps {
  pageTitle: string;
  pageDescription:string;
}


//tab title

export interface ProtectedPageProps {
  pageTitle: string;
  pageDescription:string
}

//login form state
export interface LoginData {
  email: string;
  password: string;
}

export interface CollectionInfo {
  collectionAddress:string;
  ownerAddress?:string
}

//logged in state
export interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  access: string | null;
  refresh: string | null;
  userType: string | null;
}

// api request
//pre api=request
export interface apiCallEndpoint{
  apiId:string,
  data?: unknown; 
}
export interface RequestOptions {
  endpointId:string;
  slug?:string;
  data?:object;
}

// api response success
export interface ApiSuccess {
  statusCode?: number;
  message: string;
  data:object
}

// api response error
export interface ApiError {
  statusCode?: number;
  error: string;
}

//custom error
export interface CustomError {
  error: string;
}

///Nft Page
export interface ClaimArguments {
  args: [string, number, string, number, AllowlistProofType, unknown[]];
}
interface ClaimFunction {
  (data: ClaimArguments): Promise<unknown>;
}
export interface ClaimNftInterface {
  address: string;
  claim: ClaimFunction
}

export interface NFTCollectionState {
  nfts: unknown[];
}
export interface BlogsState {
  blogs: Ipost[];
  loading?:boolean
}

export interface BalanceItem {
  metadata?: {
    name: string;
    id: string;
    image: string;
  };
  historyLink?: string;
}

// interface for dex
export interface DexItem{
  metadata?: {
    name: string;
    id: string;
  };
}
//interfaces for post
export interface Ipost  {
  _id?:string,
  id?:string,
  postId?: string;
  title: string;
  description?: string;
  image:string;
  author:string;
  categories: string[];
  date?: string;
  cryptoSymbol:string;
  cryptoData?: CryptoData;
  status?:string
}

export interface CryptoData {
  cryptoSymbol?:string;
  currency?: string;
  price: number | string;
  marketCap: number | string;
}

//crypto comp
export interface CryptoInfoProps{
  _id: string;
  cryptoSymbol?:string;
  currency?:string
}

export interface BlogDetailsProps{
  _id:string
  userType:string
}

export interface SocialProfileProps{
  cryptoSymbol?:string;
  discordLink?:string
  facebookLink?:string
  twitterLink?:string
  linkedinLink?:string
  instagramLink?:string
  redditLink?:string
}

// todo later fetch based on userType
export interface FetchBlogData{
  userType:string
}

