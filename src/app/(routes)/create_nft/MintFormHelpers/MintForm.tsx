"use client"
import { SetStateAction, useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import * as s from "./MintFormCss";
import { uploadJSONToIPFS } from "@/scripts/ipfsHandler";
import ImageUploader from "@/components/ImageUploader";
import ExplicitContent from "@/components/FormDetails/ExplicitContent";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { mintWithSignature } from "./signature";
import { toast } from "react-toastify";

const marketpalceAddress=process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS as string


function Home() {
  const [formParams, updateFormParams] = useState({ name: '', description: '', external_url: '' });
  const [fileURL, setFileURL] = useState<string | null>(null);
  const [disableButton, setDisableButton] = useState(true);
  const [explicitContent, setExplicitContent] = useState(false);
  const address=useAddress()

  const { contract: nftCollection } = useContract(
    marketpalceAddress,
    "nft-collection"
);

  async function onChangeFile(e: SetStateAction<null>) {
    try {
      const base64Data = e; 
      const dataURL = `data:image/png;base64,${base64Data}`;
      
      // Assuming setFileURL is a function that takes the data URL as an argument
      setFileURL(dataURL);
      setDisableButton(false);
    } catch (e) {
      toast.error("Upload error");
    }
  }

  async function mintNFT(e: { preventDefault: () => void; }) {
    e.preventDefault();

    try {
      setDisableButton(true)
      const response = await toast.promise(
        mintWithSignature({ authorAddress:address, nftCollection, name: formParams.name, description: formParams.description, fileURL }), {
          pending:"Minting Your Nft",
          success: "SuccessFully Minted Your Nft. Visit profile to view minted nft",
          error: "Error While mint. Retry or Join discord",
        }
      );
      setDisableButton(false)

      updateFormParams({ name: '', description: '', external_url: '' });
    } catch (e) {
      setDisableButton(false)

      toast.error("Upload error");
    }
  }

  return (
    <Container>
      <s.ResponsiveWrapper >
        <Typography variant="h4" sx={{ mt: 6 }}>
          Image, Video, Audio, or 3D Model *
        </Typography>
        <s.TextInfo> File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</s.TextInfo>

        <ImageUploader register={onChangeFile} />
        <s.TextSubTitle>Name *</s.TextSubTitle>
        <TextField
          type="text"
          name="name"
          placeholder="Item Name"
          onChange={(e) => updateFormParams({ ...formParams, name: e.target.value })}
          value={formParams.name}
        />

        <s.TextSubTitle>External link</s.TextSubTitle>
        <s.TextInfo>Blockchain will include a link to this URL on this item&apos;s detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.</s.TextInfo>

        <TextField
          type="text"
          name="external_link"
          placeholder="https://yoursite.io/"
          value={formParams.external_url}
          onChange={(e) => updateFormParams({ ...formParams, external_url: e.target.value })}
        />

        <s.TextSubTitle>Description</s.TextSubTitle>
        <s.TextInfo>The description will be included on the item&apos;s detail page underneath its image. Markdown syntax is supported.</s.TextInfo>
        <TextField
          type="text"
          name="description"
          label="Description"
          multiline
          rows={4}
          defaultValue="Description "
          value={formParams.description}
          onChange={(e) => updateFormParams({ ...formParams, description: e.target.value })}
        />

        <ExplicitContent
          explicitContent={explicitContent}
          setExplicitContent={setExplicitContent}
        />

        <button
          className={`cursor-default rounded-full ${disableButton ? "bg-jacarta-100" : "bg-accent-lighter"} py-3 px-8 text-center font-semibold text-white transition-all`}
          onClick={mintNFT}
          disabled={disableButton}
        >
          Mint NFT
        </button>


        <s.TextInfo>Upload Image to enable Mint Button</s.TextInfo>
      </s.ResponsiveWrapper>
    </Container>
  );
}

export default Home;