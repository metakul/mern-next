import { useEffect, useState } from "react";
import { Box, Button, Container, Typography, TextField } from "@mui/material";
import { useContract, useAddress, useContractWrite } from "@thirdweb-dev/react";
import { toast } from 'react-toastify';
import { transferCrypto } from "@/lib/helpers";
import { TransferCryptoInterface } from "@/Datatypes/interfaces/interface";
import { ethers } from "ethers";

const tokenContractAddress = import.meta.env.VITE_PUBLIC_TOKEN_CONTRACT_ADDRESS as string;

const TransferPage = () => {
  const address = useAddress();
  const { contract } = useContract(tokenContractAddress);
  const [balance, setBalance] = useState<string>();
  const [to, setAddressTo] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const { mutateAsync: transfer } = useContractWrite(contract, "transfer");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (address && contract) {
          const userBalance = await contract?.erc20.balance();
          setBalance(userBalance?.displayValue);
        } else {
          setBalance("Connect Wallet to view balance");
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    if (address !== null && contract) {
      fetchBalance();
    }
  }, [address, contract]);

  const handleTransfer = async () => {
    if (!address) {
      toast.error("Wallet not Connected");
      return;
    }

    if (!balance || parseFloat(balance) < amount) {
      toast.error("Insufficient balance");
      return;
    }

    const transferCryptoHandler: TransferCryptoInterface = {
      to,
      amount: ethers.utils.parseUnits(amount.toString(), 18),
      transfer
    };

    transferCrypto({ transferCryptoHandler });
  };

  return (
    <Container>
      <Typography variant="h3">Transfer $KULL</Typography>
      <Typography>Remaining Balance: <b>{balance}</b> $KULL</Typography>
      <Box mt={4}>
        <TextField
          label="Recipient Address"
          fullWidth
          value={to}
          onChange={(e) => setAddressTo(e.target.value)}
        />
        <TextField
          label="Amount"
          type="number"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleTransfer}
          sx={{ mt: 2 }}
        >
          Transfer
        </Button>
      </Box>
    </Container>
  );
};

export default TransferPage;