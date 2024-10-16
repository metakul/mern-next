
import axios from 'axios';
import FormData from 'form-data'

//require('dotenv').config();
const key = "d99730e010f73478ad6a"
const secret = "5945b45be19c1c151c2f5b9791c214551c7a513f22b5bb3402d75f087a33cb46";


export const uploadJSONToIPFS = async (JSONBody: unknown) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
            return {
                success: true,
                pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
            };
        })
        .catch(function (error) {
            return {
                success: false,
                pinataURL: error.message,
            }

        });
};

export const uploadFileToIPFS = async (file: unknown) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    //making axios POST request to Pinata ⬇️

    const data = new FormData();
    data.append('file', file);

    const metadata = JSON.stringify({
        name: 'NftMint',
        keyvalues: {
            exampleKey: 'exampleValue'
        }
    });
    data.append('pinataMetadata', metadata);

    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
            regions: [
                {
                    id: 'FRA1',
                    desiredReplicationCount: 1
                },
                {
                    id: 'NYC1',
                    desiredReplicationCount: 2
                }
            ]
        }
    });
    data.append('pinataOptions', pinataOptions);

    return axios
        .post(url, data, {
            maxBodyLength: 100000,
            headers: {
                'Content-Type': `multipart/form-data;`,
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
            return {
                success: true,
                pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
            };
        })
        .catch(function (error) {
            return {
                success: false,
                pinataURL: error.message,
            }

        });
};