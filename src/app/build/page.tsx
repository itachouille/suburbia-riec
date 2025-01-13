import { ButtonLink } from "@/components/ButtonLink";
import { Heading } from "@/components/Heading";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import { CustomizerControlersProvider } from "./context";
import { createClient } from "@/prismicio";
import { Preview } from "./Preview";
import { asImageSrc } from "@prismicio/client";
import { Controls } from "./Controls";

type SearchParams = {
  deck?: string;
  wheels?: string;
  trucks?: string;
  bolts?: string;
};

export default async function Page(props: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;

  const client = createClient();
  const customizerSettings = await client.getSingle("board_customizer");

  const { wheels, decks, metals } = customizerSettings.data;

  const defaultWheels =
    wheels.find((wheel) => wheel.uid === searchParams.wheels) ?? wheels[0];
  const defaultDeck =
    decks.find((deck) => deck.uid === searchParams.deck) ?? decks[0];
  const defaulTrucks =
    metals.find((metal) => metal.uid === searchParams.trucks) ?? metals[0];
  const defaultBolts =
    metals.find((metal) => metal.uid === searchParams.bolts) ?? metals[0];

  const wheelsTextureURLs = wheels
    .map((texture) => asImageSrc(texture.texture))
    .filter((url): url is string => Boolean(url));

  const decksTextureURLs = decks
    .map((texture) => asImageSrc(texture.textures))
    .filter((url): url is string => Boolean(url));

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <CustomizerControlersProvider
        defaultWheels={defaultWheels}
        defaultDeck={defaultDeck}
        defaulTrucks={defaulTrucks}
        defaultBolts={defaultBolts}
      >
        <div className="relative aspect-square shrink-0 bg-[#3a414a] lg:aspect-auto lg:grow">
          <div className="absolute inset-0">
            <Preview
              deckTextureURLs={decksTextureURLs}
              wheelsTextureURLs={wheelsTextureURLs}
            />
          </div>

          <Link href="/" className="absolute left-5 top-6">
            <Logo className="h-12 text-white" />
          </Link>
        </div>
        <div className="grow bg-texture bg-zinc-900 text-white ~p-4/6 lg:w-96 lg:shrink-0 lg:grow-0">
          <Heading as="h1" size="sm" className="mb-6 mt-0">
            Build your board
          </Heading>

          <Controls
            wheels={wheels}
            decks={decks}
            metals={metals}
            className="mb-6"
          />

          <ButtonLink href="" color="lime" icon="plus">
            Add to cart
          </ButtonLink>
        </div>
      </CustomizerControlersProvider>
    </div>
  );
}
