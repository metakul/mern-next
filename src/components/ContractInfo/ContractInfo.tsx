import React from 'react';
import { Button } from '@mui/material';

interface ContractInfoProps {
  urlBase: string;
  buttonText: string;
}

const ContractInfo: React.FC<ContractInfoProps> = ({ urlBase, buttonText }) => {

  const openContractInfo = () => {
    if (urlBase) {
      window.open(`${urlBase}`, '_blank');
    }
  };

  return (
    <div className="flex flex-col items-center mt-6 space-y-4">
      <Button
        variant="contained"
        color="primary"
        onClick={openContractInfo}
        className="mt-4"
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default ContractInfo;
