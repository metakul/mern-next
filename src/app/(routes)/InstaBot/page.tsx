'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '@/lib/slices/RegisterUsers/RegisterSlice';
import RegisterPage from '../register/page';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import { Container } from '@mui/material';

const InstaBot = () => {
    // const { user, loading, error } = useSelector(selectLoggedInUser);
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
                        <h3>Welcome </h3> : <RegisterPage />
                    </>

                )

                }
            </Container>
        </Container>
    );
};

export default InstaBot;
