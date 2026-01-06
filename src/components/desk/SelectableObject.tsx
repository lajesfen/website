import { useState } from "react";

function SelectableObject({ component: Model, focused, ...props }: any) {
  const [hover, setHover] = useState(false);

  return (
    <group
      {...props}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
      }}
      onPointerOut={() => setHover(false)}
    >
      <Model hover={focused || hover} />
    </group>
  );
}

export default SelectableObject;
