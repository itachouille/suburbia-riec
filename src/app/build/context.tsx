"use client";

import { Content } from "@prismicio/client";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type CustomizeControlsContext = {
  selectedWheels?: Content.BoardCustomizerDocumentDataWheelsItem;
  setWheels: (wheels: Content.BoardCustomizerDocumentDataWheelsItem) => void;
  selectedDeck?: Content.BoardCustomizerDocumentDataDecksItem;
  setDeck: (deck: Content.BoardCustomizerDocumentDataDecksItem) => void;
  selectedTrucks?: Content.BoardCustomizerDocumentDataMetalsItem;
  setTrucks: (trucks: Content.BoardCustomizerDocumentDataMetalsItem) => void;
  selectedBolts?: Content.BoardCustomizerDocumentDataMetalsItem;
  setBolts: (bolts: Content.BoardCustomizerDocumentDataMetalsItem) => void;
};

const defaultContext: CustomizeControlsContext = {
  setWheels: () => {},
  setDeck: () => {},
  setTrucks: () => {},
  setBolts: () => {},
};

const CustomizerControlsContext = createContext(defaultContext);

type CustomizerControlersProviderProps = {
  children?: ReactNode;
  defaultWheels?: Content.BoardCustomizerDocumentDataWheelsItem;
  defaultDeck?: Content.BoardCustomizerDocumentDataDecksItem;
  defaulTrucks?: Content.BoardCustomizerDocumentDataMetalsItem;
  defaultBolts?: Content.BoardCustomizerDocumentDataMetalsItem;
};

export function CustomizerControlersProvider({
  children,
  defaultWheels,
  defaultDeck,
  defaulTrucks,
  defaultBolts,
}: CustomizerControlersProviderProps) {
  const [selectedWheels, setWheels] = useState(defaultWheels);
  const [selectedDeck, setDeck] = useState(defaultDeck);
  const [selectedTrucks, setTrucks] = useState(defaulTrucks);
  const [selectedBolts, setBolts] = useState(defaultBolts);

  const value = useMemo<CustomizeControlsContext>(() => {
    return {
      selectedWheels,
      setWheels,
      selectedDeck,
      setDeck,
      selectedTrucks,
      setTrucks,
      selectedBolts,
      setBolts,
    };
  }, [selectedWheels, selectedDeck, selectedTrucks, selectedBolts]);

  return (
    <CustomizerControlsContext.Provider value={value}>
      {children}
    </CustomizerControlsContext.Provider>
  );
}

export function useCustomizerControls() {
  return useContext(CustomizerControlsContext);
}
