import { Environment, SoftShadows } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import CameraController from "../components/CameraController";
import Computer from "../components/Computer";

function Scene() {
  return (
    <Canvas shadows>
      <CameraController />
      <Environment files={"/assets/environment/brown_photostudio_01_4k.hdr"} />
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
      <Computer />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[100, 100, 100]}
        receiveShadow={true}
      >
        <planeGeometry />
        <shadowMaterial opacity={0.2} />
      </mesh>
    </Canvas>
  );
}

export default Scene;
