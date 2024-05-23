import { Tooltip } from "@mui/material";
import React from "react";

interface ExplicitContentProps {
  explicitContent: boolean;
  setExplicitContent: (value: boolean) => void;
}

const ExplicitContent: React.FC<ExplicitContentProps> = ({ explicitContent, setExplicitContent }) => {
  return (
    <div className="relative mb-6 border-b border-jacarta-100 py-6 dark:border-jacarta-600">
      <div className="flex items-center justify-between">
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="36"
            height="36"
            className="mr-2 mt-px h-8 w-8 shrink-0 fill-jacarta-700 dark:fill-white"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12.866 3l9.526 16.5a1 1 0 0 1-.866 1.5H2.474a1 1 0 0 1-.866-1.5L11.134 3a1 1 0 0 1 1.732 0zM11 16v2h2v-2h-2zm0-7v5h2V9h-2z"
            />
          </svg>

          <div>
            <label style={{
                fontSize: '20px',
                lineHeight: 1.6,
               fontWeight: 1200,
            }} >
              Explicit & Sensitive Content
            </label>

            <p className="text-jacarta-300">
              Set this item as explicit and sensitive content.
              <span
                className="inline-block"
              >
                <Tooltip title= "Setting your asset as explicit and sensitive content, like pornography and other not safe for work (NSFW) content, will protect users with safe search while browsing Xhibiter."
                >

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="ml-2 -mb-[2px] h-4 w-4 fill-jacarta-500 dark:fill-jacarta-300"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z"
                  ></path>
                </svg>
                </Tooltip>

              </span>
            </p>
          </div>
        </div>
        <input
          type="checkbox"
          checked={explicitContent}
          onChange={(e) => setExplicitContent(e.target.checked)}
          className="relative h-6 w-[2.625rem] cursor-pointer appearance-none rounded-full border-none bg-jacarta-100 after:absolute after:top-[0.1875rem] after:left-[0.1875rem] after:h-[1.125rem] after:w-[1.125rem] after:rounded-full after:bg-jacarta-400 after:transition-all checked:bg-accent checked:bg-none checked:after:left-[1.3125rem] checked:after:bg-white checked:hover:bg-accent focus:ring-transparent focus:ring-offset-0 checked:focus:bg-accent"
        />
      </div>
    </div>
  );
};

export default ExplicitContent;
