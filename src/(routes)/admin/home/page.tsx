
import React from "react";
import { ProtectedPageProps } from "@/Datatypes/interfaces/interface";
import { useSelector } from "react-redux";
import {
  isAuthenticated, /*, logout , selectUserType*/
  selectUserType,
} from "@/lib/slices/authSlice";
import { Container } from "@mui/material";
import DropShipItemsPage from "@/components/LoginPagesComp/Blogs";
import { UserCategory } from "@/Datatypes/enums";
import BreadCrumbs from "@/components/Elements/BreadCrumbs";
import ContractInfo from "@/components/ContractInfo/ContractInfo";
import Metaship from "@/tabs/Tab2";

const herokuDeployment = import.meta.env.VITE_HEROKU_DEPLOYMENT as string

const ProtectedPage: React.FC<ProtectedPageProps> = () => {
  const isUserAuthenticated = useSelector(isAuthenticated);
  const selectedUserType = useSelector(selectUserType);

  return (
    <Container className="mt-24">
      <BreadCrumbs currentPath={`/`} />
      {isUserAuthenticated && selectedUserType === UserCategory.ROADIES_SUPER_ADMIN &&
        <DropShipItemsPage />
      }
      <Metaship/>
      <ContractInfo urlBase={`${herokuDeployment}`} buttonText="Heroku Deployment" />

    </Container>
  );
};

export default ProtectedPage;
