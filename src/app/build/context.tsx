"use client";

import { Content } from "@prismicio/client";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type CustomizeControlsContext = {
  selectedWheel?: Content.BoardCustomizerDocumentDataWheelsItem;
  setWheel: (wheel: Content.BoardCustomizerDocumentDataWheelsItem) => void;
};

const defaultContext: CustomizeControlsContext = {
  setWheel: () => {},
};

const CustomizerControlsContext = createContext(defaultContext);

type CustomizerControlersProvidersProps = {
  children?: ReactNode;
  defaultWheel?: Content.BoardCustomizerDocumentDataWheelsItem;
};

export function CustomizerControlersProviders({
  children,
  defaultWheel,
}: CustomizerControlersProvidersProps) {
  const [selectedWheel, setWheel] = useState(defaultWheel);

  const value = useMemo<CustomizeControlsContext>(() => {
    return { selectedWheel, setWheel };
  }, [selectedWheel]);

  return (
    <CustomizerControlsContext.Provider value={value}>
      {children}
    </CustomizerControlsContext.Provider>
  );
}

export function useCustomizerControls() {
  return useContext(CustomizerControlsContext);
}
