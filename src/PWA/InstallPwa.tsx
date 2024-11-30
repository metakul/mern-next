/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import Request from "@/Backend/axiosCall/apiCall";
import { getColors } from "@/layout/Theme/themes";
import { Box } from "@mui/material";

type BeforeInstallPromptEvent = Event & {
  prompt: () => void;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
  }>;
};
const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(true);
  const [promptInstall, setPromptInstall] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);

  }, []);

  const onClick = async (evt: React.MouseEvent<HTMLDivElement>) => {
    evt.preventDefault();

    if (!promptInstall) {
      return;
    }

    try {
      toast.success("Installing...");
      await promptInstall.prompt();
      const { outcome } = await promptInstall.userChoice;

      if (outcome === 'accepted') {
        toast.success("App installed successfully!");

        // API call to increase download count
        try {

          await Request({
            endpointId: "increaseTotalDownloadCount",
            data: {
              password: import.meta.env.VITE_PUBLIC_PASSWORD

            }
          })

        } catch (apiError) {
          toast.error("Failed to record installation count.");
          console.error("API error:", apiError);
        }

      } else {
        toast.info("Installation was dismissed.");
      }
    } catch (error) {
      toast.error("An error occurred during installation.");
      console.error("Installation error:", error);
    }
  };
  if (!supportsPWA) {
    return null;
  }
  return (
    <>
          <Box component="div" onClick={onClick} className={`w-16 sm:w-auto  rounded-lg inline-flex items-center justify-center px-2 py-2.5 `} sx={{
            background: getColors().grey[900]
          }}>
            <InstallMobileIcon className=" w-7 h-7"  sx={{
              color: getColors().grey[200]
            }}
            />
          
          </Box>
    </>
  );
};

export default InstallPWA;