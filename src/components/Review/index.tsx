import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { selectTotalQuantityAndPrice } from '@/lib/slices/DropShip/AddToCartSlice';
import { Address } from '../CheckOut/CheckOut';

export default function Review({ address }: { address: Address }) {
  const { totalPrice, totalQuantity } = useSelector(selectTotalQuantityAndPrice);
  const tax = totalQuantity * 3; // Example tax calculation
  const totalWithTax = totalPrice + tax;

  const formattedAddress = [
    address.firstName + ' ' + address.lastName,
    address.email,
    address.address2,
    address.city,
    address.state,
    address.zip,
    address.country,
  ]
    .filter((line) => line) // Remove empty or undefined lines
    .join(', ');

  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Products" secondary={`${totalQuantity} selected`} />
          <Typography variant="body2">₹ {totalPrice.toFixed(2)}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Taxes" secondary="Plus taxes" />
          <Typography variant="body2">₹ {tax.toFixed(2)}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ₹ {totalWithTax.toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Shipment details
          </Typography>
          <Typography gutterBottom>{`${address.firstName} ${address.lastName}`}</Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            {formattedAddress}
          </Typography>
        </div>
        <Typography>Pay Via Razorpay</Typography>
      </Stack>
    </Stack>
  );
}
