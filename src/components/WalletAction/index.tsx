import { useState } from "react";
import { Button, Dialog, DialogContent } from "@mui/material";
import TransferPage from "./Send";

const WalletAction = ({tokenAddress}:any) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Transfer
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogContent>
          <TransferPage />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WalletAction;