import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ChooseLocation from '../Location/ChooseLocation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Pages } from '@/Datatypes/enums';
import { CartItem } from '@/lib/slices/DropShip/AddToCartSlice';

const VITE_PUBLICRAZORPAY_KEY_ID = import.meta.env.VITE_PUBLICRAZORPAY_KEY_ID as string;

interface FormData {
  email: string;
  contact: string;
  address: string | { latitude: number; longitude: number };
}

interface SubscribeProps {
  price: number;
  setShowOutlet: (showOutlet: boolean) => void;
  cartItems:CartItem[]
}

const Subscribe: React.FC<SubscribeProps> = ({ price, setShowOutlet,cartItems }) => {
  const [formData, setFormData] = useState<FormData>({ email: "", contact: "", address: "" });
  const [openMap, setOpenMap] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const navigate = useNavigate();

  // Dynamically load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setIsRazorpayLoaded(true);
    script.onerror = () => toast.error("Failed to load Razorpay script.");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Validate contact field for 10-digit number
    if (name === "contact" && (isNaN(Number(value)) || value.length > 10)) {
      toast.error("Contact number must be a 10-digit numeric value.");
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(null);
  };

  const handleAddressChange = (address: string | { latitude: number; longitude: number } | null) => {
    if (address) {
      setFormData((prevData) => ({
        ...prevData,
        address,
      }));
      setError(null); // Clear error on address change
    }
  };

  const toggleMapInfo = () => {
    setOpenMap(!openMap);
  };

  const proceedToPayment = () => {
    const { email, contact, address } = formData;

    if (!email || !contact || !address) {
      setError("All fields (email, contact, and address) are required.");
      toast.error("All fields (email, contact, and address) are required.");
      return;
    }

    if (!isRazorpayLoaded) {
      toast.error("Razorpay script not loaded. Please try again later.");
      return;
    }

    const options = {
      key: VITE_PUBLICRAZORPAY_KEY_ID,
      amount: price * 100,
      currency: "INR",
      name: "WIW",
      prefill: {
        name: "Gaurav Kumar",
        email,
        contact,
      },
      description: "Instant DropShipper Subscription",
      image: "http://localhost:5173/logo.png",
      handler: (response: any) => {
        toast.success(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        console.log("Payment successful:", response);
        navigate(Pages.PROFILE);
        setShowOutlet(true);
      },
      theme: {
        color: "#3399cc",
      },
      notes: cartItems.map((item) => {
        const { image, ...rest } = item;
        return JSON.stringify(rest);
      }),
    };

    console.log(options);

    const razorpay = new (window as any).Razorpay(options);
    razorpay.on("payment.failed", (response: any) => {
      toast.error("Payment Failed. Please try again.");
      console.error("Payment failed:", response.error);
    });

    razorpay.open();
  };

  return (
    <Box className="relative flex flex-col gap-4 w-full p-4">
      <Box className="relative flex items-center w-full h-12\ rounded-lg border border-black focus-within:shadow-lg overflow-hidden">
        {formData.address && typeof formData.address === 'string' ? (
          <Box className="flex place-items-center h-full ml-2 mr-2 max-w-[100px]" onClick={toggleMapInfo}>
            <svg xmlns="http://www.w3.org/2000/svg" className="min-h-[24px] mid-w-[24px]" height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
            </svg>
            <Typography variant="body2" className="flex overflow-hidden">
              {formData.address.substring(0, 18)}...
            </Typography>
          </Box>
        ) : (
          <Box className="grid place-items-center h-full w-16 max-w-[80px]" onClick={toggleMapInfo}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
            </svg>
          </Box>
        )}

        <TextField
          className="text-base flex-grow outline-none"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </Box>
      <TextField
        label="Contact Number"
        variant="outlined"
        name="contact"
        value={formData.contact}
        onChange={handleInputChange}
        fullWidth
      />

      {openMap && <ChooseLocation setAddress={handleAddressChange} open={openMap} handleClose={toggleMapInfo} />}
      <Button
        onClick={proceedToPayment}
        variant='contained'
        className="w-[50%]  bg-accent py-3 px-4 bg-blue-500 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark animate-slide-in"
      >
        Proceed to Payment
      </Button>
    </Box>
  );
};

export default Subscribe;
