import { Box, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import ChooseLocation from '../Location/ChooseLocation';
import { toast } from 'react-toastify';

interface FormData {
  email: string;
  address: string | { latitude: number; longitude: number };
}

function Subscribe() {
  const [formData, setFormData] = useState<FormData>({ email: "", address: "" });
  const [openMap, setOpenMap] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(null); // Clear error on input change
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
    if (!formData.email || !formData.address) {
      setError("Both email and address are required.");
      toast.error("Both email and address are required.");
      return;
    }
    console.log("Email:", formData.email);
    console.log("Address:", formData.address);
  };

  return (
    <Box className="relative flex items-center w-full h-12 rounded-lg border border-black focus-within:shadow-lg overflow-hidden">
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
        label="Email or Phone"
        variant="outlined"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <div
        onClick={proceedToPayment}
        className="bg-accent py-3 px-4 bg-blue-500 text-center font-semibold text-white shadow-accent-volume transition-all hover:bg-accent-dark animate-slide-in"
      >
        Proceed to Payment
      </div>
      {openMap && <ChooseLocation setAddress={handleAddressChange} open={openMap} handleClose={toggleMapInfo} />}
    </Box>
  );
}

export default Subscribe;
