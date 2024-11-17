
import React, { useEffect } from "react";
import { ProtectedPageProps } from "@/Datatypes/interfaces/interface";
import { useSelector } from "react-redux";
import {
  isAuthenticated, /*, logout , selectUserType*/
  selectUserType,
} from "@/lib/slices/authSlice";
import { Container } from "@mui/material";
import DropShipItemsPage from "@/components/LoginPagesComp/Blogs";
import { useNavigate } from "react-router-dom";
import { UserCategory } from "@/Datatypes/enums";
import BreadCrumbs from "@/components/Elements/BreadCrumbs";
import ContractInfo from "@/components/ContractInfo/ContractInfo";

const herokuDeployment = import.meta.env.VITE_HEROKU_DEPLOYMENT as string

const ProtectedPage: React.FC<ProtectedPageProps> = () =>
  {
    const isUserAuthenticated = useSelector(isAuthenticated);
    const selectedUserType = useSelector(selectUserType);
    const navigation = useNavigate(); 

    useEffect(() => {
      if (!isUserAuthenticated && selectedUserType!==UserCategory.ROADIES_SUPER_ADMIN) {
        navigation("/"); 
      }
    }, [isUserAuthenticated, history]);

    return (
      <Container>
          <BreadCrumbs currentPath={`/`} />

        <DropShipItemsPage />

   <ContractInfo urlBase={`${herokuDeployment}`} buttonText="Heroku Deployment" />

      </Container>
    );
  };

export default ProtectedPage;
