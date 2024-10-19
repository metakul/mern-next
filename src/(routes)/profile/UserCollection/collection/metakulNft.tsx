
import {
  Grid,
  Typography,
} from '@mui/material';
// import { ethers } from "ethers";
import PropTypes from 'prop-types';
import { useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react';
import { BalanceItem } from '@/Datatypes/interfaces/interface';
import NftCard from '@/components/Cards/NftCard';

const MyMetakulNft = ({ collectionAddress }: any) => {
  const address = useAddress()
  const { contract: nftDropContract } = useContract(
    collectionAddress,
    "nft-drop"
  );
  let { data: ownedNfts, isLoading } = useOwnedNFTs(nftDropContract, address);

  return (

    <Grid container sx={{ mt: 4 }}>
      {address ? (
        <div className="flex justify-center mt-4">
          <div className="grid grid-cols-1 gap-[1rem] md:grid-cols-2 lg:grid-cols-4">
            <NftCard isLoading={isLoading} balance={ownedNfts as BalanceItem[]} handleNftButtonText={"Stake Now"} loadingMessage={!address ? 'Loading Owner NFT. Keep Your wallet Conencted.' : "Loading Nfts"} />
          </div>
        </div>

      ) : (
        <Typography variant='h3' sx={{
          mt: 2
        }}>
          Connect Your Wallet To View your NFT&apos;s
        </Typography>
      )}
    </Grid>

  );
};
MyMetakulNft.propTypes = {
  collectionAddress: PropTypes.any
};
export default MyMetakulNft;