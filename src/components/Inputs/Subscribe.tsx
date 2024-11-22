import React, { useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import ChooseLocation from '../Location/ChooseLocation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { accountStatus, Pages, UserCategory } from '@/Datatypes/enums';
import { CartItem } from '@/lib/slices/DropShip/AddToCartSlice';
import PasswordlessLoginForm from '../Forms/PasswordLoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { addPaymentId } from '@/lib/slices/DropShip/Payment/paymentSliceApi';
import { AppDispatch } from '@/lib/store';
import { DeliveryLocation } from '@/Datatypes/interfaces/interface';
import { authLoading, isAuthenticated, SelectConactVerified, SelectContact, selectToken } from '@/lib/slices/authSlice';
import {jwtDecode} from "jwt-decode";
import { registerUserDispatcher } from '@/lib/slices/authApiSlice';

interface CustomJwtPayload {
  phoneNumber: string;
  email: string;
  name:string
}

const VITE_PUBLICRAZORPAY_KEY_ID = import.meta.env.VITE_PUBLICRAZORPAY_KEY_ID as string;

interface FormData {
  address: string | { latitude: number; longitude: number };
  email: string;
  name: string;
}

interface SubscribeProps {
  price: number;
  setShowOutlet: (showOutlet: boolean) => void;
  cartItems: CartItem[];
}

const Subscribe: React.FC<SubscribeProps> = ({ price, setShowOutlet, cartItems }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<FormData>({ address: '', email: '',name:'' });
  const [openMap, setOpenMap] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const isContactVerified= useSelector(SelectConactVerified);
  const isUserAuthenticated= useSelector(isAuthenticated);
  const [contactVerified, setContactVerified] = useState(isContactVerified);
  
  const verifiedContactState= useSelector(SelectContact);
  const [verifiedContact, setVerifiedContact] = useState<string | null>(verifiedContactState); // Store verified contact
  const myToken=useSelector(selectToken)

  const isUserVerifying=useSelector(authLoading)
  React.useEffect(() => {

    if(isUserAuthenticated){
    const decodedToken = jwtDecode<CustomJwtPayload>(myToken);
    console.log("Decoded Token:", decodedToken)
    setVerifiedContact(decodedToken?.phoneNumber)
    setFormData((prevData) => ({
      ...prevData,
      email: decodedToken?.email,
      name: decodedToken?.name,
    }));
    setContactVerified(true)

    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setIsRazorpayLoaded(true);
    script.onerror = () => toast.error('Failed to load Razorpay script.');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [isUserAuthenticated]);

  const handleAddressChange = (address: string | { latitude: number; longitude: number } | null) => {
    if (address) {
      setFormData((prevData) => ({
        ...prevData,
        address,
      }));
      setError(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleMapInfo = () => {
    setOpenMap(!openMap);
  };

  const handleContactVerified = (contact: string) => {
    setContactVerified(true);
    setVerifiedContact(contact);
    toast.success(`Contact ${contact} verified successfully!`);
  };

  const proceedToPayment = () => {
    const { address, email,name } = formData;

    if (!contactVerified || !verifiedContact || !address || !email || verifiedContact==null) {
      setError('All fields (contact, address, and email) are required.');
      toast.error('All fields (contact, address, and email) are required.');
      return;
    }

    if (!isRazorpayLoaded) {
      toast.error('Razorpay script not loaded. Please try again later.');
      return;
    }

    if(!isUserAuthenticated){
      dispatch(registerUserDispatcher({email,name,phoneNumber:verifiedContact,address,accountStatus:accountStatus.Pending,category:UserCategory.Verifier}))
    }
   

    if (isUserVerifying) {
      toast.info('Please wait, user verification in progress...');
      return;
    }
    
    const options = {
      key: VITE_PUBLICRAZORPAY_KEY_ID,
      amount: price * 100,
      currency: 'INR',
      name: 'WIW',
      prefill: {
        name: 'Gaurav Kumar',
        contact: verifiedContact,
        email,
      },
      description: address,
      image: 'http://localhost:5173/logo.png',
      handler: (response: any) => {
        const orderDetails: DeliveryLocation = {
          consignee: {
            name: name as string,
            address: address as string,
            city: '',
            state: '',
            pin: '400001',
            country: 'India',
            phone: verifiedContact,
          },
        };

        dispatch(
          addPaymentId({
            paymentId: response.razorpay_payment_id,
            orderDetails,
          })
        );

        toast.success(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        navigate(Pages.PROFILE);
        setShowOutlet(true);
      },
      theme: {
        color: '#3399cc',
      },
      notes: cartItems.map((item) => {
        const { image, ...rest } = item;
        return JSON.stringify(rest);
      }),
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.on('payment.failed', (response: any) => {
      toast.error('Payment Failed. Please try again.');
      console.error('Payment failed:', response.error);
    });

    razorpay.open();
  };

  return (
    <Box className="relative flex flex-col gap-4 w-full p-4">
      {!contactVerified &&
        <>
          <Typography variant="h6">Verify Contact Number</Typography>
          <PasswordlessLoginForm onVerified={handleContactVerified} />
        </>
      }
      {contactVerified && (
        <>
          <Typography variant="h6">Your Address For Delivery</Typography>

          <Box className="relative flex flex-col gap-2">
           
          {!isUserAuthenticated &&
          <>
            <TextField
              label="Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              error={!!error && !formData.name}
              helperText={!!error && !formData.name ? 'Name is required.' : ''}
              />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              error={!!error && !formData.email}
              helperText={!!error && !formData.email ? 'Email is required.' : ''}
              />
            </>
          }
            <Box
              className="relative flex items-center w-full h-12 rounded-lg border border-black focus-within:shadow-lg overflow-hidden"
              onClick={toggleMapInfo}
            >
              {formData.address && typeof formData.address === 'string' ? (
                <Typography variant="body2" className="flex overflow-hidden">
                  {formData.address}
                </Typography>
              ) : (
                <Box className="grid place-items-center h-full w-16">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368">
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                  </svg>
                </Box>
              )}
            </Box>
          </Box>

          {openMap && <ChooseLocation setAddress={handleAddressChange} open={openMap} handleClose={toggleMapInfo} />}

          <Button
            onClick={proceedToPayment}
            variant="contained"
            className="w-[50%] bg-blue-500 text-white font-semibold shadow-md transition-all"
          >
            Proceed to Payment
          </Button>
        </>
      )}
    </Box>
  );
};

export default Subscribe;
