import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
import CustomDialog from '@/components/Dailog/Dailog';
import LoginForm from '@/components/Forms/LoginForm';
import { useState } from 'react';
import SocialProfiles from '@/components/SocialProfile';
import { isAuthenticated } from '@/lib/slices/authSlice';
import LogoutButton from '@/components/Elements/Buttons/LogoutButton';

export const svgStyle = {
  fill: '#5893f9', // Set your desired fill color here
  height: '1em',
};
const whatiwear = () => {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const isUserAuthenticated=useSelector(isAuthenticated)

  return (
    <Container className="">
      {/* <div className="relative">
        <img src="img/collections/collection_banner.jpg" alt="banner" className="h-[18.75rem] object-cover" />
      </div> */}

      <div className="container flex justify-center">
        <div className="text-center ">
          <figure className="mb-4">
          </figure>
          <h2 className=" font-sans  mb-2 font-display text-4xl font-medium ">whatiwear - The Best Dropshipping </h2>
          <SocialProfiles/>
          
          <div className="mb-4 mt-4">
            <span className="text-sm font-bold text-jacarta-400 m-2">Created by </span>
            <a href="https://www.linkedin.com/in/shubham-kunwar-90ba441ba/" target="_balnk" className="text-sm font-bold text-accent">Kunwar.eth</a>
            {isUserAuthenticated ? (

                <LogoutButton/>
             
              ):(
                <>
                <CustomDialog
                className="ml-2"
                open={isDialogOpen}
                onClose={() => setDialogOpen(!isDialogOpen)}
                triggerButtonText={"Login"}
                title={"Login Now"}
                description={"Login Now To See what your friends are wearing"}
                >
                <LoginForm
                  loginTitle=" Login"
                  userType='ADMIN'
                  OnFormSuccess={() => setDialogOpen(!isDialogOpen)}
                  />
              </CustomDialog>
                  </>
              )}
          </div>
        </div>
      </div>


      <div className="">
        <ul
          className="nav nav-tabs mb-2 flex items-center justify-center border-b border-jacarta-100 "
          role="tablist"
        >
        </ul>

      </div>
    </Container>
  );
};

export default whatiwear;
