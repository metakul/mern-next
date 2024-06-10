"use client"
import { SetStateAction, useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import * as s from "./MintFormCss";
import { uploadJSONToIPFS } from "@/scripts/ipfsHandler";
import ImageUploader from "@/components/ImageUploader";
import ExplicitContent from "@/components/FormDetails/ExplicitContent";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { config } from "@/config/config";
import { mintWithSignature } from "./signature";
import { toast } from "react-toastify";
function Home() {
  const [formParams, updateFormParams] = useState({ name: '', description: '', external_url: '' });
  const [fileURL, setFileURL] = useState(null);
  const [disableButton, setDisableButton] = useState(true);
  const [explicitContent, setExplicitContent] = useState(false);
  const address=useAddress()

  const {marketpalceAddress}=config
  const { contract: nftCollection } = useContract(
    marketpalceAddress,
    "nft-collection"
);

  async function onChangeFile(e: SetStateAction<null>) {
    try {
      console.log("Uploaded image to Pinata: ", e);
      setFileURL(e);
      setDisableButton(false);
    } catch (e) {
      console.log("Error during file upload", e);
    }
  }

  async function uploadMetadataToIPFS() {
    const { name, description, external_url } = formParams;
    if (!name || !description || !fileURL) return;

    const nftJSON = { name, description, external_url, image: fileURL, explicitContent };

    try {
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        console.log("Uploaded JSON to Pinata: ", response);
        return response.pinataURL;
      }
    } catch (e) {
      console.log("error uploading JSON metadata:", e);
    }
  }

  async function mintNFT(e: { preventDefault: () => void; }) {
    e.preventDefault();

    try {
      const metadataURL = await mintWithSignature({ address, nftCollection, name: formParams.name, description: formParams.description, fileURL });
      console.log(metadataURL);

      toast.success("Successfully Minted NFT");
      updateFormParams({ name: '', description: '', external_url: '' });
    } catch (e) {
      alert("Upload error" + e);
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
