'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RegisterPage from '../register/page';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import { Box, Container, Typography } from '@mui/material';
import { isAuthenticated } from '@/lib/slices/authSlice';
import { selectBots } from '@/lib/slices/InstaBot/BotSlice';
import { fetchBotsDispatcher } from '@/lib/slices/InstaBot/BotApiSlice';
import { AppDispatch } from '@/lib/store';

const InstaBot = () => {
    const isUserAuthenticated = useSelector(isAuthenticated);
    const { bots, loading, error, message } = useSelector(selectBots);

    const dispatch = useDispatch();
    console.log(bots);

    const address = useAddress()

    useEffect(() => {
        (dispatch as AppDispatch)(fetchBotsDispatcher());
    }, [dispatch]);
    return (
        <Container>
            <Container>

                {!address ? (
                    <>
                        <ConnectWallet />
                    </>
                ) : (
                    <>
                        <h3>Welcome </h3>

                        {!isUserAuthenticated ? (
                            <RegisterPage />
                        ) : (
                            <>
                                <Box>
                                    <Typography>
                                        My Bots Bots
                                    </Typography>
                                    <div>
                                        {loading && <p>Loading...</p>}
                                        {error && <p>Error: {error}</p>}
                                        <p>{message}</p>
                                        <ul>
                                            {bots.map((bot) => (
                                                <li key={bot.id}>
                                                    {bot.alias} - {bot.status}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Box>
                                Create New Bot
                            </>
                        )}
                    </>
                )
                }
            </Container>
        </Container>
    );
};

export default InstaBot;
