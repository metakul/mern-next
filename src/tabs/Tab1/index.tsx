import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartApi, fetchDropShipItemsApi } from "@/lib/slices/DropShip/DropShipAPI";
import { AppDispatch } from "@/lib/store";
import { selectedDropShipItems } from "@/lib/slices/DropShip/DropShipSlice";
import DropShipItems from "./DropShipItems";
import { Box, Grid, Typography } from "@mui/material";
import { useSound } from "@/context/SoundContext";

const Tab1 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { dropShipItems, loading } = useSelector(selectedDropShipItems);
  const { stop } = useSound(); // Access the stop function
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Dispatch API calls when the component mounts
    dispatch(fetchCartApi({ isAuthenticated: true }));
    dispatch(
      fetchDropShipItemsApi({
        pageSize: 10,
        page: 1,
        status: "APPROVED",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (!entry.isIntersecting) {
        stop(); // Stop sound when the element is out of view
      }
    };

    const observer = new IntersectionObserver(observerCallback, { threshold: 0.1 });
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [stop]);

  return (
    <>
      <Box>
        <div className="relative bottom-16 w-screen overflow-hidden">
          <video
            className="w-[100vw] h-[95vh] object-cover pointer-events-none"
            src="https://video-previews.elements.envatousercontent.com/h264-video-previews/34b4f82d-339a-4c07-ba47-e8a87ded3de1/2733283.mp4"
            autoPlay
            loop
            muted
            playsInline
          ></video>
        </div>

        <div ref={observerRef} style={{ height: "1px", marginTop: "100vh" }}></div>

        <Grid container>
          <Grid
            sm={6}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <DropShipItems
              showScroll={true}
              categoryType="winterwear"
              dropShipItems={dropShipItems}
              loading={loading}
            />
          </Grid>
          <Grid
            sm={6}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Typography variant="h3" sx={{ mt: 4 }} className="text-center mt-8 mb-4">
              Hot Deals
            </Typography>
            <DropShipItems grid={2} categoryType="hotdeals" dropShipItems={dropShipItems} loading={loading} />
          </Grid>
        </Grid>

        <Typography variant="h3" sx={{ mt: 4 }} className="text-center mt-8 mb-4">
          Featured Items
        </Typography>
        <DropShipItems dropShipItems={dropShipItems} loading={loading} />
      </Box>
    </>
  );
};

export default Tab1;
