/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
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
    const handler = (e:any) => {
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
    <button
      className="open-sans border border-rounded bg-red-800 font-bold py-2 px-2 rounded inline-flex items-center"
      id="setup_button"
      aria-label="Install app"
      title="Install app"
      onClick={onClick}
    >
      Install now <InstallMobileIcon/>

    </button>
  );
};

export default InstallPWA;