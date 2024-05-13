
import { Backdrop, CircularProgress } from "@mui/material";

const LoadingOverlay = ({ loading }: { loading: boolean | undefined }) => {
  return (
    <>
      {loading &&
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: 5,
            position: "relative",
            width: "100%",
            height: "100%",
          }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
    </>

  );
};

export default LoadingOverlay;