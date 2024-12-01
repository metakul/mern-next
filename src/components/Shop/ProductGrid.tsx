import { ProductCard } from "../ProductCard";
import { Box, Grid, Skeleton } from "@mui/material";

export default function ProductGrid({
  gridItems = 4,
  allproducts,loading
}:any) {

  return (
    <>
      <div
        style={{
          width: "fit-content",
          margin: "0  auto",
          fontSize: "17px",
          marginBottom: "24px",
        }}
      >
        {allproducts.length} product(s) found
      </div>
      {loading ? (
              <Grid container spacing={2}>
                {[...Array(3)].map((_, index) => (
                  <Grid item xs={6} md={4} key={index}>
                    <Skeleton variant="rectangular" height={250} sx={{
                      mt:4
                    }} />
                  </Grid>
                ))}
              </Grid>
            ) : (
      <div className="grid grid-cols-2 md:grid-cols-3  wrapper-shop" data-grid={`grid-${gridItems}`}>
        {/* card product 1 */}
        {allproducts.map((elm:any, i:number) => (
          <Box className="flex justify-center"> 

          <ProductCard product={elm} key={i} />
          </Box>
        ))}
      </div>
            )}
    </>
  );
}
