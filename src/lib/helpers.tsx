import { ApiSuccess, ClaimNftInterface, ApiError} from '@/Datatypes/interfaces/interface';
import { allowlistProof } from "./slices/Web3Profile/whitelist";

export const claimNft = async ({ address, claim }: ClaimNftInterface) => {
  try {
 
    // Define a separate async function to handle the claim operation
    const performClaim = async () => {
      // eslint-disable-next-line no-useless-catch
      try {
        const res = await claim({
          args: [address, 1, "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", 0, allowlistProof, []]
        });
        return res;
      } catch (err) {
        throw err;
      }
    };

    const data = await performClaim().then((res: unknown) => {
      console.log(res);
      
      const apiSuccess: ApiSuccess = {
        statusCode: 200,
        message: 'Mint Successfull',
        data: res as object,
      };
      console.log(apiSuccess);
      return apiSuccess;
    }).catch((err: unknown) => {
      console.log(err);
    });
    return data;
  } catch (error) {
    const castedError = error as ApiError;
    console.error('Error Claiming NFT', error);
    throw castedError?.error === "string" ? castedError?.error : 'Unknown Error';
  }
};
