import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from '@mui/material';
import BreadCrumbs from '@/components/Elements/BreadCrumbs';
import { AppDispatch } from '@/lib/store';
import { selectPaymentInfo } from '@/lib/slices/DropShip/Payment/paymentSlice';
import { fetchPaymentIds } from '@/lib/slices/DropShip/Payment/paymentSliceApi';
import SearchBar from '@/components/SearchBar';
import LoginForm from '@/components/Forms/LoginForm';
import { isAuthenticated } from '@/lib/slices/authSlice';
import LogoutButton from '@/components/Elements/Buttons/LogoutButton';
import CustomDialog from '@/components/Dailog/Dailog';
import PasswordlessLoginForm from '@/components/Forms/PasswordLoginForm';
import { selectTrackingInfo } from '@/lib/slices/DropShip/Payment/paymentSlice';

export default function ProfilePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { paymentInfo, loading, error } = useSelector(selectPaymentInfo);
  const trackingInfo = useSelector(selectTrackingInfo);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const isUserAuthenticated = useSelector(isAuthenticated);

  useEffect(() => {
    if (isUserAuthenticated) {
      dispatch(fetchPaymentIds());
    }
  }, [dispatch, isUserAuthenticated]);

  const filteredPayments = paymentInfo?.filter((payment) =>
    payment.contact?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="mt-16">
      <>
        <BreadCrumbs currentPath="/profile" />
        <Box className="mt-4 mb-8">
          {isUserAuthenticated ? (
            <Box className="flex justify-between items-center flex-wrap">
              <Box>
                <Typography variant="h5" className="mt-4 mb-2">
                  Search Payment By Phone Number:
                </Typography>
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              </Box>
              <LogoutButton />
            </Box>
          ) : (
            <Box className="text-center">
              <span className="text-sm font-bold text-gray-600 m-2">
                Login Now To See what your friends are wearing
              </span>
              <CustomDialog
                className="ml-2"
                open={isDialogOpen}
                onClose={() => setDialogOpen(!isDialogOpen)}
                triggerButtonText="Login"
                title="Login Now"
                description="Login Now To See what your friends are wearing"
              >
                <PasswordlessLoginForm />
              </CustomDialog>
            </Box>
          )}

          {loading && <CircularProgress className="mx-auto mt-4" />}

          {!loading && filteredPayments && (
            <Grid container spacing={4} className="mt-0">
              {filteredPayments.map((payment) => {
                let parsedNotes: { id?: string; name?: string; quantity?: number; price?: any; image: any }[] = [];
                try {
                  parsedNotes = payment.notes && Array.isArray(payment.notes)
                    ? payment.notes.map((note: string) => JSON.parse(note))
                    : [];
                } catch (error) {
                  console.error("Error parsing notes:", error);
                }

                const paymentTrackingInfo = trackingInfo.find((info) => info.order_id === payment.id);

                return (
                  <Grid item xs={12} sm={6} md={4} lg={4} key={payment.id}>
                    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardContent>
                        <Typography variant="h6" component="div" className="font-bold">
                          Payment ID: {payment.id}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          Amount: ₹{(payment.amount / 100).toFixed(2)} {payment.currency}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          Status: {payment.status}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          Contact: {payment.contact || "N/A"}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          Email: {payment.email || "N/A"}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          Created At:{" "}
                          {payment.created_at ? new Date(payment.created_at * 1000).toLocaleString() : "N/A"}
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                          Description: {payment.description || "No description provided"}
                        </Typography>

                        {parsedNotes.length > 0 && (
                          <Box className="mt-4">
                            <Typography variant="h6" className="text-gray-800">
                              Cart Items:
                            </Typography>
                            {parsedNotes.map((item, index) => (
                              <Box key={index} className="bg-gray-100 rounded-md p-2 mt-2">
                                <Typography variant="body2">Id: {item.id || "N/A"}</Typography>
                                <Typography variant="body2">Name: {item.name || "N/A"}</Typography>
                                <Typography variant="body2">Quantity: {item.quantity || "N/A"}</Typography>
                                <Typography variant="body2">
                                  Price: ₹{item.price ? item.price.toFixed(2) : "N/A"}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        )}
                        {paymentTrackingInfo && (
                          <Card className="mt-4 shadow-md bg-gray-50">
                            <CardContent>
                              <Typography variant="h6" className="text-gray-800">
                                Tracking Information
                              </Typography>
                              <Typography variant="body2" className="text-gray-600">
                                TrackingId: {paymentTrackingInfo.trackingId}
                              </Typography>
                              <Typography variant="body2" className="text-gray-600">
                                Status: {paymentTrackingInfo.active ? "Active" : "Inactive"}
                              </Typography>
                             
                              <Typography variant="body2" className="text-gray-600">
                                Tracking Number Tag: {paymentTrackingInfo.tracking_number}
                              </Typography>
                              <Typography variant="body2" className="text-gray-600">
                                Origin: {paymentTrackingInfo.origin_raw_location}
                              </Typography>
                              <Typography variant="body2" className="text-gray-600">
                                Delivery Tag: {paymentTrackingInfo.tag}
                              </Typography>
                              <Typography variant="body2" className="text-gray-600">
                                Destination: {paymentTrackingInfo.destination_raw_location}
                              </Typography>
                              <Typography variant="body2" className="text-gray-600">
                                Delivery Type: {paymentTrackingInfo.delivery_type}
                              </Typography>
                              {paymentTrackingInfo.courier_tracking_link && (
                                <a
                                  href={paymentTrackingInfo.courier_tracking_link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline"
                                >
                                  Track Here
                                </a>
                              )}
                            </CardContent>
                          </Card>
                        )}
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          className="text-blue-500 hover:text-blue-600"
                          onClick={() => console.log(`Viewing details for ${payment.id}`)}
                        >
                          View Details
                        </Button>
                        <Button
                          size="small"
                          className="text-blue-500 hover:text-blue-600"
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

          {!loading && isUserAuthenticated && !error && filteredPayments.length === 0 && (
            <Typography className="text-center text-gray-500 mt-4">
              Your Orders are empty. Start adding items to your cart!
            </Typography>
          )}
        </Box>
      </>
    </Container>
  );
}
