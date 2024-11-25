import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

interface Address {
  firstName: string;
  lastName: string;
  email: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

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
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="first-name" required>
          First name
        </FormLabel>
        <OutlinedInput
          id="first-name"
          name="firstName"
          type="text"
          placeholder="John"
          autoComplete="first name"
          required
          size="small"
          value={address.firstName}
          onChange={handleChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="last-name" required>
          Last name
        </FormLabel>
        <OutlinedInput
          id="last-name"
          name="lastName"
          type="text"
          placeholder="Snow"
          autoComplete="last name"
          required
          size="small"
          value={address.lastName}
          onChange={handleChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="email" required>
          Address line 1
        </FormLabel>
        <OutlinedInput
          id="email"
          name="email"
          type="text"
          placeholder="Street name and number"
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
        <FormLabel htmlFor="state" required>
          State
        </FormLabel>
        <OutlinedInput
          id="state"
          name="state"
          type="text"
          placeholder="NY"
          autoComplete="State"
          required
          size="small"
          value={address.state}
          onChange={handleChange}
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="zip" required>
          Zip / Postal code
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
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="country" required>
          Country
        </FormLabel>
        <OutlinedInput
          id="country"
          name="country"
          type="text"
          placeholder="United States"
          autoComplete="shipping country"
          required
          size="small"
          value={address.country}
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