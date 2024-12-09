import SwapComponent from "@/components/Swap/swap";
import "./style.css"
import { Container, Typography } from "@mui/material";

function Swap() {
  return (
    <Container sx={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      flexDirection:"column"
    }}>
      <Typography variant="h3" sx={{
        py:4
      }}>
        Swap
      </Typography>
    <SwapComponent  />
    </Container>
  )
}

export default Swap