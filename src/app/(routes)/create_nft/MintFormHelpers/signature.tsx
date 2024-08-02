import server from "@/scripts/signatureMint";
import { toast } from "react-toastify";

export const mintWithSignature = async ({ authorAddress, nftCollection, name, description, fileURL:image }: any) => {
  try {
    // Get values of all elements with specific IDs
    if (!authorAddress) {
      toast.error("Please Connect Wallet")
      return
    }

    // Make a request to /api/server
    const signedPayloadReq = await server({ authorAddress, description, name, image });

    // Grab the JSON from the response
    if (!signedPayloadReq) {
      toast.error("Oho, Something went wrong");
      throw new Error("Oho, Something went wrong while signing");
    }

    // If the request succeeded, we'll get the signed payload from the response.
    // The API should come back with a JSON object containing a field called signedPayload.
    // This line of code will parse the response and store it in a variable called signedPayload.

    // Now we can call signature.mint and pass in the signed payload that we received from the server.
    // This means we provided a signature for the user to mint an NFT with.
    const nft = await nftCollection?.signature.mint(signedPayloadReq);
    console.log(nft)
    toast.success("Minted successfully!");

    return nft;
  } catch (e) {
    toast.error("An error occurred trying to mint the NFT:");
    throw e
  }
};