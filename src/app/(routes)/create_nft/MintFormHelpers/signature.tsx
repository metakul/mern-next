import server from "@/scripts/signatureMint";
import { toast } from "react-toastify";

export const mintWithSignature = async ({address, nftCollection,name,description,image}:any) => {
    try {
        console.log(address,nftCollection)
      // Get values of all elements with specific IDs
      if(!address){
        toast.error("Please choose a Web3 Cop name")
        return
      }
  
      // Make a request to /api/server
      const signedPayloadReq = await server({address,description, name, image});
  
  
      // Grab the JSON from the response
      if (!signedPayloadReq) {
        toast.error("Oho, Something went wrong");
        return; // Exit the function if there's an error
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
    }
  };
  