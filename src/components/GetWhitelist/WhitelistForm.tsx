import { getColors } from '@/app/layout/Theme/themes'
import { getWhitelistApiCall } from '@/lib/slices/Getwhitelist/getWhitelistAPi';
import { Button, Grid, InputLabel, OutlinedInput, Stack } from '@mui/material'
import { ConnectWallet } from '@thirdweb-dev/react';
import React, { useState } from 'react'

function WhitelistForm() {
    const [address, setAddress] = useState<string>('');
    const handleSubmit = async() => {
        console.log('Whitelist Address:', address);
        await getWhitelistApiCall({address:address,setAddress:setAddress})
    };
    return (
        <div className="mt-2">
            <div
                className="rounded-2.5xl px-6 py-8 shadow-sm md:px-16 lg:px-24"
                style={{
                    background: getColors().blueAccent[900],
                }}
            >
                <div className="flex-wrap justify-between lg:flex">
                    <Grid item xs={12} mb={2}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="Address-login">Whitelist Address</InputLabel>
                            <OutlinedInput
                                id="address-whitelist"
                                type="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter Wallet address"
                                fullWidth
                            />
                           
                        </Stack>
                    </Grid>
                    <Grid item xs={12} mb={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            fullWidth
                            sx={{
                                backgroundColor: getColors().blueAccent[700],
                                '&:hover': {
                                    backgroundColor: getColors().blueAccent[800],
                                },
                                color: '#fff',
                                borderRadius: '8px',
                                padding: '10px 20px',
                                textTransform: 'none',
                            }}
                        >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={12} sx={{
                        mt:2
                    }}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="Address-login">Connect wallet to Copy Address</InputLabel>
                        <ConnectWallet/>
                           
                        </Stack>
                    </Grid>
                </div>
            </div>
        </div>
    )
}

export default WhitelistForm