import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RegisterPage from '../register/page';
import { ConnectWallet, useAddress } from '@thirdweb-dev/react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import { isAuthenticated } from '@/lib/slices/authSlice';
import { selectBots } from '@/lib/slices/InstaBot/BotSlice';
import { fetchBotsDispatcher } from '@/lib/slices/InstaBot/BotApiSlice';
import { AppDispatch } from '@/lib/store';
import AddBotForm from '@/components/Forms/CreateBotForm';
import BotCard from '@/components/Cards/InstaBotCrad';

const InstaBot = () => {
    const isUserAuthenticated = useSelector(isAuthenticated);
    const { bots, loading, message } = useSelector(selectBots);

    const dispatch = useDispatch();
    const address = useAddress();

    useEffect(() => {
        isUserAuthenticated && (dispatch as AppDispatch)(fetchBotsDispatcher());
    }, [dispatch, isUserAuthenticated]);

    return (
        <Container>
            {!address ? (
                <ConnectWallet />
            ) : (
                <>

                    {!isUserAuthenticated ? (
                        <RegisterPage />
                    ) : (
                        <>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h3">Instgram Bot</Typography>
                                <AddBotForm />
                            </Box>

                            <Typography variant="h6" sx={{ mb: 2 }}>
                                My Bots
                            </Typography>

                            {loading && <Typography>Loading...</Typography>}

                            {bots.length > 0 ? (
                                <Grid container spacing={2}>
                                    {bots.map((bot) => (
                                        <Grid item xs={12} sm={6} md={4} key={bot.id}>
                                            <BotCard bot={bot} />
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                <Typography>No bots available</Typography>
                            )}
                        </>
                    )}
                </>
            )}
        </Container>
    );
};

export default InstaBot;
