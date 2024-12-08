import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AddressForm from '../AddressForm';
import Info from '../Info';
import InfoMobile from '../InfoMobile';
import Review from '../Review';
import { selectCartItems, selectTotalQuantityAndPrice } from '@/lib/slices/DropShip/AddToCartSlice';
import { useDispatch, useSelector } from 'react-redux';
import Subscribe from '../Inputs/Subscribe';
import { isAuthenticated, SelectConactVerified, SelectContact, selectToken } from '@/lib/slices/authSlice';
import { addPaymentId } from '@/lib/slices/DropShip/Payment/paymentSliceApi';
import { DeliveryLocation } from '@/Datatypes/interfaces/interface';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { AppDispatch } from '@/lib/store';

const VITE_PUBLICRAZORPAY_KEY_ID = import.meta.env.VITE_PUBLICRAZORPAY_KEY_ID as string;

export interface CustomJwtPayload {
  phoneNumber: string;
  email: string;
  name:string
}

export interface Address {
  name: string;
  email: string;
  address2?: string; // Optional field
  city: string;
  zip: string;
}


function getStepContent(step: number, address: Address, setAddress: React.Dispatch<React.SetStateAction<Address>>) {
  const isUserAuthenticated = useSelector(isAuthenticated);
  if (isUserAuthenticated && step === 1) {
    step = 2; // Skip step 1 if user is authenticated
  }
  switch (step) {
    case 0:
      return <AddressForm address={address} setAddress={setAddress} />;
    case 1:
      return <Subscribe address={address}/>;
    case 2:
      return <Review address={address} />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const isUserAuthenticated = useSelector(isAuthenticated);
  const dispatch=useDispatch<AppDispatch>()

  const verifiedContactState = useSelector(SelectContact);
  const [verifiedContact, setVerifiedContact] = React.useState<string>(verifiedContactState); // Store verified contact

  const isContactVerified= useSelector(SelectConactVerified);
  const [contactVerified, setContactVerified] = React.useState(isContactVerified);
  
  const [isRazorpayLoaded, setIsRazorpayLoaded] = React.useState(false);


  const steps = isUserAuthenticated ? ['Shipping address', 'Review your order'] : ['Shipping address', 'Verify', 'Review your order'];

  const [activeStep, setActiveStep] = React.useState(0);

  const [address, setAddress] = React.useState<Address>({
    name: '',
    email: '',
    address2: '',
    city: '',
    zip: '',
  });
  const cartItems = useSelector(selectCartItems);
  const { totalQuantity, totalPrice } = useSelector(selectTotalQuantityAndPrice);
  const myToken=useSelector(selectToken)


  React.useEffect(() => {

    if(isUserAuthenticated){
    const decodedToken = jwtDecode<CustomJwtPayload>(myToken);
    console.log("Decoded Token:", decodedToken)
    setVerifiedContact(decodedToken?.phoneNumber)
    setAddress((prevData) => ({
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


  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      console.log('Address:', address);
      console.log('Verified Contact:', verifiedContact);
      proceedToPayment()
    }
    else{
      const { name, email, city, zip } = address;
      if (!name || !email || !city || !zip) {
        toast.error('Please fill all required fields.');
        return;
      }
      setActiveStep(activeStep + 1);
    }
  };

  const proceedToPayment = () => {
    const { name, email,city,zip } = address; //todo get all address fields

    if (!contactVerified || !verifiedContact || !address || !email || verifiedContact==null) {
      toast.error('All fields (contact, address, and email) are required.');
      return;
    }

    if (!isRazorpayLoaded) {
      toast.error('Razorpay script not loaded. Please try again later.');
      return;
    }
    if (totalPrice==undefined) {
      toast.error('Review the order Properly.');
      return;
    }

 
    
    const options = {
      key: VITE_PUBLICRAZORPAY_KEY_ID,
      amount: totalPrice * 100,
      currency: 'INR',
      name: 'WIW',
      prefill: {
        name: 'Gaurav Kumar',
        contact: verifiedContact,
        email,
      },
      description: `${name}, ${email},${city}, ${zip}`, 
      image: 'http://localhost:5173/logo.png',
      handler: (response: any) => {
        const orderDetails: DeliveryLocation = {
          consignee: {
            name: name,
            address: city ,
            city: city,
            state: "state",
            pin: zip,
            country: "India",
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
        // navigate(Pages.PROFILE);
        // setShowOutlet(true);
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


  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    // <AppTheme {...props}>
    <Box >
      <CssBaseline enableColorScheme />
      {/* <Box sx={{ position: 'fixed', top: '1rem', right: '1rem' }}>
        <ColorModeIconDropdown />
      </Box> */}

      <Grid
        container
        sx={{
          mt: {
            xs: 4,
            sm: 0,
          },
        }}
      >
        <Grid
          size={{ xs: 12, sm: 7, lg: 7 }}
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            backgroundColor: 'background.paper',
            borderRight: { sm: 'none', md: '1px solid' },
            borderColor: { sm: 'none', md: 'divider' },
            alignItems: 'start',
            pt: 6,
            px: 2,
            gap: 4,
          }}
        >
          {/* <SitemarkIcon /> */}
          WHAT-I-WEAR
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
            }}
          >
            <Info totalPrice={(activeStep >= 2 ? totalPrice + 20 : totalPrice).toString()}  />
          </Box>
        </Grid>
        <Grid
          size={{ sm: 12, md: 5, lg: 5 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '100%',
            width: '100%',
            backgroundColor: { xs: 'transparent', sm: 'background.default' },
            alignItems: 'start',
            pt: { xs: 0, sm: 2 },
            px: { xs: 2, sm: 8 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: { sm: 'space-between', md: 'flex-end' },
              alignItems: 'center',
              width: '100%',
              maxWidth: { sm: '100%', md: 600 },
            }}
          >
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexGrow: 1,
              }}
            >
              <Stepper
                id="desktop-stepper"
                activeStep={activeStep}
                sx={{ width: '100%', height: 40 }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{ ':first-child': { pl: 0 }, ':last-child': { pr: 0 } }}
                    key={label}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
          <Card sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
            <CardContent
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <Typography variant="h5" gutterBottom>
                  Cart Info
                </Typography>
                <Typography variant="subtitle2">
                  Quantity: {activeStep >= 2 ? totalQuantity+20 : totalQuantity}
                </Typography>
                <Typography variant="subtitle2">
                  Amount: ₹ {activeStep >= 2 ? totalPrice+20 : totalPrice}
                </Typography>
              </div>
              <InfoMobile cartItems={cartItems} totalPrice={(activeStep >= 2 ? totalPrice+20 : totalPrice).toString()} />
            </CardContent>
          </Card>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              maxWidth: { sm: '100%', md: 600 },
              maxHeight: '720px',
              gap: { xs: 5, md: 'none' },
            }}
          >
            <Stepper
              id="mobile-stepper"
              activeStep={activeStep}
              alternativeLabel
              sx={{ display: { sm: 'flex', md: 'none' } }}
            >
              {steps.map((label) => (
                <Step
                  sx={{
                    ':first-child': { pl: 0 },
                    ':last-child': { pr: 0 },
                    '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                  }}
                  key={label}
                >
                  <StepLabel
                    sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <Stack spacing={2} useFlexGap>
                <Typography variant="h1">📦</Typography>
                <Typography variant="h5">Thank you for your order!</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  Your order number is
                  <strong>&nbsp;#140396</strong>. We have emailed your order
                  confirmation and will update you once its shipped.
                </Typography>
                <Button
                  variant="contained"
                  sx={{ alignSelf: 'start', width: { xs: '100%', sm: 'auto' } }}
                >
                  Go to my orders
                </Button>
              </Stack>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, address, setAddress)}
                <Box
                  sx={[
                    {
                      display: 'flex',
                      flexDirection: { xs: 'column-reverse', sm: 'row' },
                      alignItems: 'end',
                      flexGrow: 1,
                      gap: 1,
                      pb: { xs: 12, sm: 0 },
                      mt: { xs: 2, sm: 0 },
                      mb: '60px',
                    },
                    activeStep !== 0
                      ? { justifyContent: 'space-between' }
                      : { justifyContent: 'flex-end' },
                  ]}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="text"
                      sx={{ display: { xs: 'none', sm: 'flex' } }}
                    >
                      Previous
                    </Button>
                  )}
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
                      sx={{ display: { xs: 'flex', sm: 'none' } }}
                    >
                      Previous
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    onClick={handleNext}
                    sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}