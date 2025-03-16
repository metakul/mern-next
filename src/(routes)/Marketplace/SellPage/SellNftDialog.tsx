import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, CircularProgress } from "@mui/material";
import { getColors } from "@/layout/Theme/themes";

interface SellNftDialogProps {
  open: boolean;
  isSelling: boolean;
  onClose: () => void;
  onSell: (price: string, days: string) => void;
}

const SellNftDialog: React.FC<SellNftDialogProps> = ({ open, onClose, onSell,isSelling }) => {
  const [price, setPrice] = useState<string>("");
  const [days, setDays] = useState<string>("");

  const handleSell = () => {
    if (!price || !days) {
      alert("Please fill in both price and days.");
      return;
    }
    onSell(price, days);
    // onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="bg-gray-100 text-gray-800">Sell Your NFT</DialogTitle>
      <DialogContent className="space-y-4">
        <TextField
          autoFocus
          margin="dense"
          label="Price (in tokens)"
          type="number"
          fullWidth
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-4"
        />
        <TextField
          margin="dense"
          label="Duration (in days)"
          type="number"
          fullWidth
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />
      </DialogContent>
      <DialogActions className="bg-gray-100">
        <Button onClick={onClose} className="text-gray-600">
          Cancel
        </Button>


        <Button
  sx={{
    backgroundColor: getColors().grey[800],
    mb: 2,
    "&.Mui-disabled": {
      color: getColors().grey[300],
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '120px',
    height: '44px',
  }}
  onClick={async () => {
    try {
      await handleSell();
    } catch (error) {
      console.error(error);
    }
  }}
  disabled={isSelling} // Disable the button while selling
>
  {isSelling ? (
    <CircularProgress size={24} color="inherit" /> // Show a spinner while selling
  ) : (
    <Typography
      variant="body1"
      sx={{
        color: getColors().blueAccent[100],
      }}
    >
      List For Sale
    </Typography>
  )}
</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SellNftDialog;