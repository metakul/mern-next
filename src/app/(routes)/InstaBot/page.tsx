'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '@/lib/slices/RegisterUsers/RegisterSlice';
import RegisterPage from '../register/page';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import { Box, Container, Typography } from '@mui/material';
import { isAuthenticated } from '@/lib/slices/authSlice';

const InstaBot = () => {
    const isUserAuthenticated = useSelector(isAuthenticated);

    const address = useAddress()


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
