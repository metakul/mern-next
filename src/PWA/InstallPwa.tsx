/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useEffect, useState } from "react";

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
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);

  }, []);

  const onClick = (evt:any) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    console.log("installing");
    
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    console.log("not");
    
    return null;
  }
  return (
    <button
      className=""
      id="setup_button"
      aria-label="Install app"
      title="Install app"
      onClick={onClick}
    >
      Install This as App
    </button>
  );
};

export default InstallPWA;