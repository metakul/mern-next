export interface AllowlistProofType {
  proof: unknown[]; 
  quantityLimitPerWallet: string;
  pricePerToken: string;
  currency: string;
}


export const allowlistProof:AllowlistProofType = {
  "proof": [],
  "quantityLimitPerWallet": "1",
  "pricePerToken": "0",
  "currency": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
}