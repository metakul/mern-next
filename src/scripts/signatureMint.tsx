import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { config } from '@/config/config';



export default async function server({authorAddress,description, nftName, image}:any) {
    try {
      

        const { privateKey, marketpalceAddress,secretKey } = config;

        // De-structure the arguments we passed in out of the request body

        console.log(privateKey,marketpalceAddress);
        const sdk = ThirdwebSDK.fromPrivateKey(privateKey, 'polygon', {
            clientId: '701e8ad7a971a6555d45224eae1d6c2d',
            secretKey: secretKey,
        });
        // Load the NFT Collection via it's contract address using the SDK
        const nftCollection = await sdk.getContract(
            // Use your NFT_COLLECTION_ADDRESS constant
            marketpalceAddress,
            'nft-collection'
        );

        // 2) Check that this wallet hasn't already minted a page - 1 NFT per wallet
        // const hasMinted = (await nftCollection.balanceOf(authorAddress)).gt(0);
        // if (hasMinted) {
        //   alert("Already Claimed The NFT");
        //   return
        // }

        // If all the checks pass, begin generating the signature...
        // Generate the signature for the page NFT
        const signedPayload = await nftCollection.signature.generate({
            to: authorAddress,
            metadata: {
                name: nftName,
                description: description,
                properties: {
                    description,
                },
                image: image,
            },
        });

        // Return back the signedPayload to the client.
        const newsignedPayload = JSON.parse(JSON.stringify(signedPayload));
        return newsignedPayload;
    } catch (e) {
        return e;
    }
}