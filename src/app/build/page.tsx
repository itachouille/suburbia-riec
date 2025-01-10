import { ButtonLink } from "@/components/ButtonLink";
import { Heading } from "@/components/Heading";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import { CustomizerControlersProvider } from "./context";
import { createClient } from "@/prismicio";

export default async function Page() {
  const client = createClient();
  const customizerSettings = await client.getSingle("board_customizer");

  const { wheels, decks, metals } = customizerSettings.data;

  const defaultWheels = wheels[0];
  const defaultDeck = decks[0];
  const defaulTrucks = metals[0];
  const defaultBolts = metals[0];

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <CustomizerControlersProvider
        defaultWheels={defaultWheels}
        defaultDeck={defaultDeck}
        defaulTrucks={defaulTrucks}
        defaultBolts={defaultBolts}
      >
        <div className="relative aspect-square shrink-0 bg-[#3a414a] lg:aspect-auto lg:grow">
          <Link href="/" className="absolute left-5 top-6">
            <Logo className="h-12 text-white" />
          </Link>
        </div>
        <div className="grow bg-texture bg-zinc-900 text-white ~p-4/6 lg:w-96 lg:shrink-0 lg:grow-0">
          <Heading as="h1" size="sm" className="mb-6 mt-0">
            Build your board
          </Heading>

          <ButtonLink href="" color="lime" icon="plus">
            Add to cart
          </ButtonLink>
        </div>
      </CustomizerControlersProvider>
    </div>
  );
}
