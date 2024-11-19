import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Typography, CircularProgress, Card, CardContent, CardActions, Button, Grid, Divider } from '@mui/material';
import BreadCrumbs from '@/components/Elements/BreadCrumbs';
import { AppDispatch } from '@/lib/store';
import { selectPaymentInfo } from '@/lib/slices/DropShip/Payment/paymentSlice';
import { fetchPaymentIds } from '@/lib/slices/DropShip/Payment/paymentSliceApi';
import SearchBar from '@/components/SearchBar';
import LoginForm from '@/components/Forms/LoginForm';
import { isAuthenticated } from '@/lib/slices/authSlice';
import LogoutButton from '@/components/Elements/Buttons/LogoutButton';
import CustomDialog from '@/components/Dailog/Dailog';

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { paymentInfo, loading, error } = useSelector(selectPaymentInfo);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const isUserAuthenticated = useSelector(isAuthenticated)

  useEffect(() => {
    // const paymentId = "pay_PMugIkknwkpxCA";
    dispatch(fetchPaymentIds());
  }, [dispatch]);

  // Filter payment info based on the search query
  const filteredPayments = paymentInfo?.filter((payment) =>
    payment.contact?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container sx={{ mt: 16 }}>
      <>
        <BreadCrumbs currentPath={"/profile"} />
        <Box
          sx={{
            width: '100%',
            mt: 4,
            mb: 8,
          }}
        >
          {isUserAuthenticated ? (

            <LogoutButton />

          ) : (
            <Box>
              
              <span className="text-sm font-bold text-jacarta-400 m-2">Login Now To See what your friends are wearing</span>
              <CustomDialog
                className="ml-2"
                open={isDialogOpen}
                onClose={() => setDialogOpen(!isDialogOpen)}
                triggerButtonText={"Login"}
                title={"Login Now"}
                description={"Login Now To See what your friends are wearing"}
              >
                <LoginForm
                  loginTitle=" Login"
                  userType='ADMIN'
                  OnFormSuccess={() => setDialogOpen(!isDialogOpen)}
                />
              </CustomDialog>
            </Box>
          )}
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Search Payment By Phone Number:
          </Typography>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          {loading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}

          {!loading && filteredPayments && (
            <Grid container spacing={3} sx={{ mt: 0 }}>
              {filteredPayments.map((payment) => {
                // Parse notes if it's a JSON string (assumes the notes are an array of strings)
                let parsedNotes: { id?: string, name?: string; quantity?: number; price?: any, image: any }[] = [];
                try {
                  // Assuming notes is an array of stringified CartItems
                  parsedNotes = payment.notes && Array.isArray(payment.notes)
                    ? payment.notes.map((note: string) => JSON.parse(note))
                    : [];

                  console.log(
                    "parsedNotes", parsedNotes
                  );

                } catch (error) {
                  console.error("Error parsing notes:", error);
                }

                return (
                  <Grid item xs={12} sm={12} md={12} lg={6} key={payment.id}>
                    <Card sx={{ boxShadow: 3 }}>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          Payment ID: {payment.id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Amount: ₹{(payment.amount / 100).toFixed(2)} {payment.currency}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Status: {payment.status}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Contact : ({payment.contact || "N/A"} )
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Email : ({payment.email || "N/A"})
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Created At: {payment.created_at ? new Date(payment.created_at * 1000).toLocaleString() : "N/A"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Description: {payment.description || "No description provided"}
                        </Typography>

                        {/* Cart Items from Notes */}
                        {parsedNotes.length > 0 && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="h6">Cart Items:</Typography>
                            {parsedNotes.map((item, index) => (
                              <Box key={index} sx={{ mb: 2 }}>
                                <Typography variant="body2">
                                  Id: {item.id || "N/A"}
                                </Typography>
                                <Typography variant="body2">
                                  Name: {item.name || "N/A"}
                                </Typography>
                                <Typography variant="body2">
                                  Quantity: {item.quantity || "N/A"}
                                </Typography>
                                <Typography variant="body2">
                                  Price: ₹{item.price ? item.price.toFixed(2) : "N/A"}
                                </Typography>
                                {/* <img
                                  src={`data:image/png;base64,${item.image}`}
                                  alt={"Post image"}
                                  className=" w-[15rem] h-[14rem] object-cover transition-transform duration-[100ms] will-change-transform group-hover:scale-125"
                                /> */}
                              </Box>
                            ))}
                          </Box>
                        )}
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => console.log(`Viewing details for ${payment.id}`)}
                        >
                          View Details
                        </Button>
                        <Button
                          size="small"
                          onClick={() => console.log(`Contacting ${payment.contact}`)}
                        >
                          Contact
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
      </>
    </Container>
  );
}
