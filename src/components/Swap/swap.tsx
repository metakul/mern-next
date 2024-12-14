import React, { useState, useEffect } from "react";
import tokenList from "@/const/tokenList.json"
import axios from "axios";
import { Box, Button, FormControlLabel, IconButton, Input, Modal, Popover, Radio, RadioGroup, TextField } from "@mui/material";
import { ArrowUpwardOutlined, SettingsInputComponent } from "@mui/icons-material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useAddress } from "@thirdweb-dev/react";
import { getColors } from "@/layout/Theme/themes";
import Request from "@/Backend/axiosCall/apiCall";

function Swap(props: {}) {

    const address=useAddress()
    const isConnected=true
    // const [messageApi, contextHolder] = message.useMessage();
    const [slippage, setSlippage] = useState(2.5);
    const [tokenOneAmount, setTokenOneAmount] = useState<number | null>(null);
    const [tokenTwoAmount, setTokenTwoAmount] = useState<number | null>(null);
    const [tokenOne, setTokenOne] = useState(tokenList[0]);
    const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
    const [isOpen, setIsOpen] = useState(false);
    const [changeToken, setChangeToken] = useState(1);
    const [prices, setPrices] = useState<{ ratio: number } | null>(null);
    const [txDetails, setTxDetails] = useState({
        to: null,
        data: null,
        value: null,
    });

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
};

const open = Boolean(anchorEl);
const id = open ? 'simple-popover' : undefined;


const handleClose = () => {
    setAnchorEl(null);
};

    // const { data, sendTransaction } = useSendTransaction({
    //     request: {
    //         from: address,
    //         to: String(txDetails.to),
    //         data: String(txDetails.data),
    //         value: String(txDetails.value),
    //     }
    // })


    function handleSlippageChange(e: any) {
        setSlippage(e.target.value);
    }

    function changeAmount(e: any) {
        setTokenOneAmount(e.target.value);
        if (e.target.value && prices) {
            setTokenTwoAmount(Number((e.target.value * prices.ratio).toFixed(2)))
        } else {
            setTokenTwoAmount(0);
        }
    }

    function switchTokens() {
        setPrices(null);
        setTokenOneAmount(0);
        setTokenTwoAmount(0);
        const one = tokenOne;
        const two = tokenTwo;
        setTokenOne(two);
        setTokenTwo(one);
        fetchPrices(two.address, one.address);
    }

    function openModal(asset: React.SetStateAction<number>) {
        setChangeToken(asset);
        setIsOpen(true);
    }

    function modifyToken(i: number) {
        setPrices(null);
        setTokenOneAmount(0);
        setTokenTwoAmount(0);
        if (changeToken === 1) {
            setTokenOne(tokenList[i]);
            fetchPrices(tokenList[i].address, tokenTwo.address)
        } else {
            setTokenTwo(tokenList[i]);
            fetchPrices(tokenOne.address, tokenList[i].address)
        }
        setIsOpen(false);
    }

    async function fetchPrices(one: any, two: any) {

        const response = await Request({
            endpointId: "tokenPrice",
            // slug: `?address=${cryptoAddress}`,
            params: { addressOne: one, addressTwo: two }

        })

        setPrices(response)
    }

    async function fetchDexSwap() {

        const allowance = await axios.get(`https://api.1inch.io/v5.0/1/approve/allowance?tokenAddress=${tokenOne.address}&walletAddress=${address}`)

        if (allowance.data.allowance === "0") {
            const approve = await axios.get(`https://api.1inch.io/v5.0/1/approve/transaction?tokenAddress=${tokenOne.address}`)
            setTxDetails(approve.data);
            return
        }

        const tx = await axios.get(
            `https://api.1inch.io/v5.0/1/swap?fromTokenAddress=${tokenOne.address}&toTokenAddress=${tokenTwo.address}&amount=${(tokenOneAmount || '0')}&fromAddress=${address}&slippage=${slippage}`
        )

        let decimals = Number(`1E${tokenTwo.decimals}`)
        setTokenTwoAmount(Number((Number(tx.data.toTokenAmount) / decimals).toFixed(2)));

        setTxDetails(tx.data.tx);

    }

    useEffect(() => {
        fetchPrices(tokenList[0].address, tokenList[1].address)

    }, [])

    useEffect(() => {

        if (txDetails.to && isConnected) {

            console.log(txDetails);
            
            // sendTransaction();
        }
    }, [txDetails])





    const settings = (
        <>
            <div>Slippage Tolerance</div>
            <div>
                <RadioGroup value={slippage} onChange={handleSlippageChange}>
                    <FormControlLabel value={0.5} control={<Radio />} label="0.5%" />
                    <FormControlLabel value={2.5} control={<Radio />} label="2.5%" />
                    <FormControlLabel value={5} control={<Radio />} label="5.0%" />
                </RadioGroup>
            </div>
        </>
    );

    return (
        <>
            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <div className="modalContent">
                    {tokenList?.map((e: { img: string | undefined; ticker: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, i: number) => {
                        return (
                            <div
                                className="tokenChoice"
                                key={i}
                                onClick={() => modifyToken(i)}
                            >
                                <img src={e.img || ''} alt={"tokenLogo"} className="tokenLogo" />
                                <div className="tokenChoiceNames">
                                    <div className="tokenName">{e.name}</div>
                                    <div className="tokenTicker">{e.ticker}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Modal>
            <Box className="tradeBox" sx={{
                background:getColors().grey[800],
                p:4
            }}>
                <div className="tradeBoxHeader">
                    <h4>Swap</h4>
                    <IconButton onClick={handleClick}>
                        <SettingsInputComponent className="" />
                    </IconButton>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        {settings}
                    </Popover>
                </div>
                <div className="inputs">
                    <TextField
                     id="outlined-error-helper-text"
                     label={tokenOne.ticker}
                    //  defaultValue={tokenOneAmount}
                        value={tokenOneAmount}
                        onChange={changeAmount}
                        disabled={!prices}
                    />
                    
                    <TextField
                     placeholder={tokenTwoAmount?.toString()}
                      value={tokenTwoAmount}
                       disabled={true} />
                    <Box sx={{
                        background:getColors().grey[800]
                    }} className="switchButton" onClick={switchTokens}>
                        <ArrowDownwardIcon className="switchArrow" />
                        <ArrowUpwardOutlined />

                    </Box>
                    <Box sx={{
                        background:getColors().grey[800]
                    }} className="assetOne" onClick={() => openModal(1)}>
                        <img src={tokenOne.img} alt="assetOneLogo" className="assetLogo" />
                        {tokenOne.ticker}
                        <ArrowDropDownIcon />
                    </Box>
                    <Box sx={{
                        background:getColors().grey[800]
                    }} className="assetTwo" onClick={() => openModal(2)}>
                        <img src={tokenTwo.img} alt="assetOneLogo" className="assetLogo" />
                        {tokenTwo.ticker}
                        <ArrowDropDownIcon />
                    </Box>
                </div>
                <Button sx={{
                    background:getColors().secondary[800],
                    mt:4
                }} className="swapButton" disabled={!tokenOneAmount || !isConnected} onClick={fetchDexSwap}>{!tokenOneAmount ? "Swap" : "Coming Soon"}</Button>
            </Box>
        </>
    );
}

export default Swap;