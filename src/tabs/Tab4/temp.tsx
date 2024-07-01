import { Button, Container } from '@mui/material';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const ThreeScene = dynamic(() => import('@/components/Three.js/index'), { ssr: false });

const Userpage: React.FC = () => {

  const [xrEnabled,setXrEnabled]=useState(false)
  const enableXr=()=>{
    setXrEnabled(!xrEnabled)
  }

  return (
    <Container>
      <ThreeScene xrEnabled={xrEnabled} />

      <Button onClick={enableXr}>
        {xrEnabled ? "Disable VR" :"Enable VR"}
      </Button>
    </Container>
  );
};

export default Userpage;
