/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import Request from "@/Backend/axiosCall/apiCall";
import { getColors } from "@/layout/Theme/themes";

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

  const onClick = async (evt: React.MouseEvent<HTMLButtonElement>) => {
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
      <div className=" p-4 text-center  border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-md md:text-xl font-bold ">  Secure Access, Anytime, Anywhere </h5>
        <p className="mb-5 text-sm sm:text-lg">
          Install our app to get fast, one-tap access to all features, even offline!
        </p>
        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">

          <button onClick={onClick} className={`w-full sm:w-auto  ring-1 focus:outline-none focus:ring-gray-300  rounded-lg inline-flex items-center justify-center px-4 py-2.5 `} style={{
            background: getColors().grey[800]
          }}>
            <InstallMobileIcon className="me-3 w-7 h-7" />
            <div className="text-left rtl:text-right">
              <div className="-mt-1 font-sans text-sm font-semibold">      Install now
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default InstallPWA;