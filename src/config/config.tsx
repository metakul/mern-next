// Export configuration variables
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const config = {
    privateKey: process.env.NEXT_PRIVATE_KEY_SIGNATURE || '',
    marketpalceAddress: process.env.NEXT_MARKETPLACE_ADDRESS || '',
    secretKey:process.env.NEXT_SECRET_KEY || ''

};
