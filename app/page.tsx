import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ScrollStory } from "@/components/sections/ScrollStory";
import { FeatureExplorer } from "@/components/sections/FeatureExplorer";
import { ImmersiveReveal } from "@/components/sections/ImmersiveReveal";
import { Comparison } from "@/components/sections/Comparison";
import { Portfolio } from "@/components/sections/Portfolio";
import { ProcessExplorer } from "@/components/sections/ProcessExplorer";
import { Statement } from "@/components/sections/Statement";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { MarbellaSection } from "@/components/sections/MarbellaSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ProposalSection } from "@/components/sections/ProposalSection";

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const proposalMode =
    sp?.proposal === "true" || sp?.proposal === "1";

  return (
    <>
      <Suspense fallback={null}>
        <Header proposalMode={proposalMode} />
      </Suspense>

      <main>
        <Hero />
        <ScrollStory />
        <FeatureExplorer />
        <ImmersiveReveal />
        <Comparison />
        <Portfolio />
        <ProcessExplorer />
        <Statement />
        <FeatureCards />
        <MarbellaSection />
        <ContactCTA />
        {proposalMode && <ProposalSection />}
      </main>

      <Footer />
    </>
  );
}
