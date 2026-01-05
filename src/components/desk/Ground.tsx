function Ground() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      scale={[100, 100, 100]}
      receiveShadow={true}
    >
      <planeGeometry />
      <shadowMaterial opacity={0.2} />
    </mesh>
  );
}

export default Ground;