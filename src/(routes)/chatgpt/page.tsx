import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RegisterPage from '../register/page';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { isAuthenticated } from '@/lib/slices/authSlice';
import { fetchBotsDispatcher } from '@/lib/slices/InstaBot/BotApiSlice';
import { AppDispatch } from '@/lib/store';
import ChatGpt from '@/Projects/ChatGpt/ChatGpt';

const InstaBot = () => {
    const isUserAuthenticated = useSelector(isAuthenticated);

    const dispatch = useDispatch();
    const address = useAddress();

    useEffect(() => {
        isUserAuthenticated && (dispatch as AppDispatch)(fetchBotsDispatcher());
    }, [ isUserAuthenticated]);

    return (
        <>
            {!address ? (
                <ConnectWallet />
            ) : (
                <>

                    {!isUserAuthenticated ? (
                        <RegisterPage />
                    ) : (
                        <>
                                <ChatGpt />

                        </>
                    )}
                </>
            )}
        </>
    );
};

export default InstaBot;
