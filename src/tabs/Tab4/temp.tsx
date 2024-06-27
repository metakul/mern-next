import dynamic from 'next/dynamic';

const ThreeScene = dynamic(() => import('@/components/Three.js/index'), { ssr: false });

const Userpage: React.FC = () => {
  return (
    <div>
      <ThreeScene />
    </div>
  );
};

export default Userpage;
