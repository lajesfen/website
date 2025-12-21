import { SoftShadows } from "@react-three/drei";

function Lights() {
  return (
    <>
      <SoftShadows size={25} samples={24} />

      <ambientLight intensity={0.8} color={"#ffffff"} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={2.5}
        castShadow={true}
        color={"#ffffff"}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
    </>
  );
}

export default Lights;
