import ContractInfo from '@/components/ContractInfo/ContractInfo'
import CryptoTable from '@/tabs/Tab3'
import React from 'react'

const thirdwebDashboard = import.meta.env.VITE_THIRDWEB_DASHBOARD as string;
const dexContractAddress = import.meta.env.VITE_PUBLIC_DEX_CONTRACT_ADDRESS as string;


function DEXPage() {
  return (
    <div>
      <CryptoTable/>


      <ContractInfo urlBase={`${thirdwebDashboard}/${dexContractAddress}`} buttonText="Metakul Liquiduty Dex Contract" />

    </div>
  )
}

export default DEXPage
