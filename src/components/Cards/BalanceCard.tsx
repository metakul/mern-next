import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import WalletAction from "../WalletAction";

const BalanceCard = ({ tokenAddress, tokenName, balance }: any) => {
  return (
      <CardContent>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold text-lg">{tokenName} </TableCell>
                <TableCell className="font-bold text-lg text-right">
                  {balance ? parseFloat(balance).toFixed(4) : "??"} ${tokenName}
                </TableCell>
                <TableCell className="" sx={{
                  textAlign:"center"
                }}>
                 {tokenAddress ? <WalletAction tokenAddress={tokenAddress} /> : <Typography>
                    Gasless Withdrawl Soon
                 </Typography>}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
  );
};

export default BalanceCard;