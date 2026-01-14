import { useEffect } from "react";
import { AppDispatch } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { selectedCryptos } from "@/lib/slices/CryptoSlices/CryptoSlice";
import { fetchSingleCryptoDispatcher } from "@/lib/slices/CryptoSlices/CryptoApiSlice";
import { Box, Skeleton, Stack } from "@mui/material";
import Marquee from "react-fast-marquee";
import tokenList from "@/const/tokenList.json";

const MarqueeCryptoNew = () => {
    const cryptoData = useSelector(selectedCryptos);
    const dispatch = useDispatch();

    const fetchCryptoInfo = async (_id: string, cryptoAddress: string) => {
        try {
            (dispatch as AppDispatch)(fetchSingleCryptoDispatcher({ _id, cryptoAddress, currency: "0xdac17f958d2ee523a2206206994597c13d831ec7" }));
        } catch (error) {
        }
    };

    useEffect(() => {
        tokenList.forEach(token => {
            fetchCryptoInfo(token.ticker, token.address);
        });
    }, []);

    return (
        <section className="overflow-hidden mb-4 mt-2">
            <div className="flex flex-shrink-0 items-center justify-center rounded-2.5xl border border-jacarta-100 p-2">
                <Marquee autoFill={true} pauseOnHover={true} gradient={false}>
                    {cryptoData && cryptoData.map((crypto, index) => {
                        const token = tokenList.find(token => token.address === crypto.cryptoData.cryptoAddress);
                        return (
                            <div key={index} className="ml-8 flex items-center">
                                <div className="flex items-center">
                                    <img src={token?.img} alt={token?.ticker} className="w-10 h-10 mb-2" />
                                    <Box className='ml-2'>
                                        <div>{token?.ticker}</div>
                                        {crypto.loading ? (
                                            <Stack spacing={1}>
                                                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                            </Stack>
                                        ) : (
                                            <div>${Number(crypto?.cryptoData?.price).toFixed(2)}</div>
                                        )}
                                    </Box>
                                </div>
                            </div>
                        );
                    })}
                </Marquee>
            </div>
        </section>
    );
};

export default MarqueeCryptoNew;