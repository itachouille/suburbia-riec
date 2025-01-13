"use client";

import { Heading } from "@/components/Heading";
import {
  ColorField,
  Content,
  ImageField,
  isFilled,
  KeyTextField,
} from "@prismicio/client";
import { PrismicNextImage, PrismicNextImageProps } from "@prismicio/next";
import clsx from "clsx";
import { ComponentProps, ReactNode, useEffect } from "react";
import { useCustomizerControls } from "./context";
import { useRouter } from "next/navigation";

type Props = Pick<
  Content.BoardCustomizerDocumentData,
  "wheels" | "decks" | "metals"
> & {
  className?: string;
};

export function Controls({ wheels, decks, metals, className }: Props) {
  const router = useRouter();

  const {
    setBolts,
    setDeck,
    setTrucks,
    setWheels,
    selectedBolts,
    selectedDeck,
    selectedTrucks,
    selectedWheels,
  } = useCustomizerControls();

  useEffect(() => {
    const url = new URL(window.location.href);

    if (isFilled.keyText(selectedDeck?.uid))
      url.searchParams.set("deck", selectedDeck.uid);
    if (isFilled.keyText(selectedWheels?.uid))
      url.searchParams.set("wheels", selectedWheels.uid);
    if (isFilled.keyText(selectedTrucks?.uid))
      url.searchParams.set("trucks", selectedTrucks.uid);
    if (isFilled.keyText(selectedBolts?.uid))
      url.searchParams.set("bolts", selectedBolts.uid);

    router.replace(url.href);

    return () => {};
  }, [selectedWheels, selectedDeck, selectedTrucks, selectedBolts, router]);

  return (
    <div className={clsx("flex flex-col gap-6", className)}>
      <Options title="Deck" selectedName={selectedDeck?.uid}>
        {decks.map((deck) => (
          <Option
            key={deck.uid}
            imageField={deck.textures}
            imgixParams={{
              /* crop deck image for build a button image */
              rect: [20, 1550, 1000, 1000],
              width: 150,
              height: 150,
            }}
            selected={deck.uid === selectedDeck?.uid}
            onClick={() => setDeck(deck)}
          >
            {deck.uid?.replace(/-/g, " ")}
          </Option>
        ))}
      </Options>
      <Options title="Wheels" selectedName={selectedWheels?.uid}>
        {wheels.map((wheel) => (
          <Option
            key={wheel.uid}
            imageField={wheel.texture}
            imgixParams={{
              /* crop deck image for build a button image */
              rect: [20, 10, 850, 850],
              width: 150,
              height: 150,
            }}
            selected={wheel.uid === selectedWheels?.uid}
            onClick={() => setWheels(wheel)}
          >
            {wheel.uid?.replace(/-/g, " ")}
          </Option>
        ))}
      </Options>
      <Options title="Trucks" selectedName={selectedTrucks?.uid}>
        {metals.map((metal) => (
          <Option
            key={metal.uid}
            colorField={metal.color}
            selected={metal.uid === selectedTrucks?.uid}
            onClick={() => setTrucks(metal)}
          >
            {metal.uid?.replace(/-/g, " ")}
          </Option>
        ))}
      </Options>
      <Options title="Bolts" selectedName={selectedBolts?.uid}>
        {metals.map((metal) => (
          <Option
            key={metal.uid}
            colorField={metal.color}
            selected={metal.uid === selectedBolts?.uid}
            onClick={() => setBolts(metal)}
          >
            {metal.uid?.replace(/-/g, " ")}
          </Option>
        ))}
      </Options>
    </div>
  );
}

type OptionsProps = {
  title?: ReactNode;
  selectedName?: KeyTextField;
  children?: ReactNode;
};

function Options({ title, selectedName, children }: OptionsProps) {
  const formattedName = selectedName?.replace(/-/g, " ");

  return (
    <div className="">
      <div className="flex">
        <Heading as="h2" size="xs" className="mb-2">
          {title}
        </Heading>
        <p className="ml-3 text-zinc-300">
          <span className="select-none text-zinc-500">| </span>
          {formattedName}
        </p>
      </div>
      <ul className="mb-1 flex flex-wrap gap-2">{children}</ul>
    </div>
  );
}

type OptionProps = Omit<ComponentProps<"button">, "children"> & {
  selected: boolean;
  children: ReactNode;
  onClick: () => void;
} & (
    | {
        imageField: ImageField;
        imgixParams?: PrismicNextImageProps["imgixParams"];
        colorField?: never;
      }
    | {
        colorField: ColorField;
        imageField?: never;
        imgixParams?: never;
      }
  );

function Option({
  children,
  selected,
  imageField,
  imgixParams,
  colorField,
  onClick,
}: OptionProps) {
  return (
    <li>
      <button
        className={clsx(
          "size-10 cursor-pointer rounded-full bg-black p-0.5 outline-2 outline-white",
          selected && "outline"
        )}
        onClick={onClick}
      >
        {imageField ? (
          <PrismicNextImage
            field={imageField}
            imgixParams={imgixParams}
            className="pointer-events-none size-full rounded-full"
            alt=""
          />
        ) : (
          <div
            className="size-full rounded-full"
            style={{ backgroundColor: colorField ?? undefined }}
          />
        )}

        <span className="sr-only">{children}</span>
      </button>
    </li>
  );
}