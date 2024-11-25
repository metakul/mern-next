import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SendOtpForm from './SendOtpForm';
import VerifyOtpForm from './VerifyOtpForm';
import RegisterForm from './RegisterForm';

const steps = [
  {
    label: 'Send OTP',
    component: SendOtpForm,
  },
  {
    label: 'Verify OTP',
    component: VerifyOtpForm,
  },
  {
    label: 'Register',
    component: RegisterForm,
  },
];

export default function UserAuthStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleOtpSent = (phone: string) => {
    setPhoneNumber(phone);
    handleNext();
  };

  const handleOtpVerified = () => {
    handleNext();
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              {index === 0 && <SendOtpForm onOtpSent={handleOtpSent} />}
              {/* {index === 1 && <VerifyOtpForm phoneNumber={phoneNumber} onOtpVerified={handleOtpVerified} />} */}
              {index === 2 && <RegisterForm />}
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                  disabled={index !== activeStep}
                >
                  {index === steps.length - 1 ? 'Finish' : 'Continue'}
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}