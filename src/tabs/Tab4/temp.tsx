import { Button, Container } from '@mui/material';
import { useState } from 'react';
import ThreeScene from '@/components/Three.js/index';

const Userpage: React.FC = () => {
  const [xrEnabled, setXrEnabled] = useState(false);

  const enableXr = () => {
    setXrEnabled(!xrEnabled);
  };

  return (
    <Container>
      <ThreeScene xrEnabled={xrEnabled} />

      <Button onClick={enableXr}>
        {xrEnabled ? "Disable VR" : "Enable VR"}
      </Button>
    </Container>
  );
};

export default Userpage;
