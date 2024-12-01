import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { Address } from '../CheckOut/CheckOut';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));


interface AddressFormProps {
  address: Address;
  setAddress: React.Dispatch<React.SetStateAction<Address>>;
}

export default function AddressForm({ address, setAddress }: AddressFormProps) {
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };
  
  const [saveAddress, setSaveAddress] = React.useState(true);

  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12, md: 12 }}>
        <FormLabel htmlFor="name" required>
          Name
        </FormLabel>
        <OutlinedInput
          id="name"
          name="name"
          type="text"
          placeholder="John"
          autoComplete="name"
          required
          size="small"
          value={address.name}
          onChange={handleChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="email" required>
        Email
        </FormLabel>
        <OutlinedInput
          id="email"
          name="email"
          type="text"
          placeholder="youremail@xyz.com"
          autoComplete="shipping address-line1"
          required
          size="small"
          value={address.email}
          onChange={handleChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address2">Address line 2</FormLabel>
        <OutlinedInput
          id="address2"
          name="address2"
          type="text"
          placeholder="Apartment, suite, unit, etc. (optional)"
          autoComplete="shipping address-line2"
          size="small"
          value={address.address2}
          onChange={handleChange}
          required={true}
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="city" required>
          City
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          type="text"
          placeholder="New York"
          autoComplete="City"
          required
          size="small"
          value={address.city}
          onChange={handleChange}
        />
      </FormGrid>
    
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="zip" required>
          Location code
        </FormLabel>
        <OutlinedInput
          id="zip"
          name="zip"
          type="text"
          placeholder="12345"
          autoComplete="shipping postal-code"
          required
          size="small"
          value={address.zip}
          onChange={handleChange}
        />
      </FormGrid>
   
      <FormGrid size={{ xs: 12 }}>
      <FormControlLabel
          control={
            <Checkbox
              name="saveAddress"
              value="yes"
              checked={saveAddress}
              onChange={(e) => setSaveAddress(e.target.checked)}
            />
          }
          label="Save the Address"
        />
      </FormGrid>
    </Grid>
  );
}