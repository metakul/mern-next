import { ApiSuccess, ClaimNftInterface, ApiError,TransferCryptoInterface } from '@/Datatypes/interfaces/interface';
import { allowlistProof } from "./slices/Web3Profile/whitelist";
import { toast } from 'react-toastify';

export const claimNft = async ({ claimNftHandler }: { claimNftHandler: ClaimNftInterface },) => {
  try {

    // Define a separate async function to handle the claim operation
    const performClaim = async () => {
      // eslint-disable-next-line no-useless-catch
      try {
        console.log("response","response");
        
        const response = await toast.promise(
          claimNftHandler.claim({
            args: [claimNftHandler.address, 1, "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", 0, allowlistProof, []]
          }),
          {
            pending: 'Claiming Nft. Wait a bit.',
            success: 'Nft Claimed Successfully 👌',
            error: 'Error Claiming NFt. Join discord to know more 🤯'
          }
        )
        console.log("response",response);
        
        return response;
      } catch (err) {
        console.log("error",err);
        
        throw err;
      }
    };

    const data = await performClaim().then((res: unknown) => {

      const apiSuccess: ApiSuccess = {
        statusCode: 200,
        message: 'Mint Successfull',
        data: res as object,
      };
      return apiSuccess;
    }).catch((err: unknown) => {
    });
    return data;
  } catch (error) {
    const castedError = error as ApiError;
    throw castedError?.error === "string" ? castedError?.error : 'Unknown Error';
  }
};

export const transferCrypto = async ({ transferCryptoHandler }: { transferCryptoHandler: TransferCryptoInterface },) => {
  try {

    // Define a separate async function to handle the claim operation
    const performTransfer = async () => {
      // eslint-disable-next-line no-useless-catch
      try {
        const response = await toast.promise(
          transferCryptoHandler.transfer({
            args: [transferCryptoHandler.to,transferCryptoHandler.amount]
          }),
          {
            pending: 'Transferring  Crypto. Wait a bit.',
            success: 'Transferred Successfully 👌',
            error: 'Error Transferring. Join discord to know more 🤯'
          }
        )
        return response;
      } catch (err) {
        throw err;
      }
    };

    const data = await performTransfer().then((res: unknown) => {

      const apiSuccess: ApiSuccess = {
        statusCode: 200,
        message: 'Mint Successfull',
        data: res as object,
      };
      return apiSuccess;
    }).catch((err: unknown) => {
    });
    return data;
  } catch (error) {
    const castedError = error as ApiError;
    throw castedError?.error === "string" ? castedError?.error : 'Unknown Error';
  }
};
