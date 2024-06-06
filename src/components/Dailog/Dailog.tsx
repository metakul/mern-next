import React, { ReactNode } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  triggerButtonText: string | any;
  title: string;
  description: string;
  children: ReactNode;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  onClose,
  triggerButtonText,
  title,
  description,
  children,
}) => {
  return (
    <>
      <Button variant="outlined" onClick={() => onClose()}>
        {triggerButtonText}
      </Button>
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <p>{description}</p>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose()} color="primary" variant='contained'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomDialog;
