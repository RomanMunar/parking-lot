import { useState } from "react";

export const useToggle = () => {
  const [state, setState] = useState(false);
  const toggle = () => setState((p) => !p);

  return { state, toggle };
};
