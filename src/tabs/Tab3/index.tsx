
import { Container } from '@mui/material';
import { Canvas } from "@react-three/fiber";
const Tab3 = () => {

  return (
    <Container className="">
    <div className="">
      <Canvas
        shadows
        className=""
        camera={{
          position: [-6, 7, 7],
        }}
      >
          Hey
      </Canvas>
    </div>
    </Container>
  );
};

export default Tab3;