import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import PlayersManager from "@/components/Lobby/PlayersManager";
import CardPrice from "@/components/Lobby/CardPrice";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Play&nbsp;</span>
        <span className={title({ color: "violet" })}>Bingo&nbsp;</span>
      </div>
      <div className="flex gap-3 mt-40">
        <PlayersManager />
        <CardPrice />
      </div>

      
    </section>
  );
}
