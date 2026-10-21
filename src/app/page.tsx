import { AnalyticsListener } from "@/components/AnalyticsListener";
import { DevConfigNotice } from "@/components/DevConfigNotice";
import { Faq } from "@/components/Faq";
import { FocusAreas } from "@/components/FocusAreas";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Inclusion } from "@/components/Inclusion";
import { Invitation } from "@/components/Invitation";
import { Pathways } from "@/components/Pathways";
import { Principles } from "@/components/Principles";
import { Process } from "@/components/Process";
import { Purpose } from "@/components/Purpose";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <DevConfigNotice />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Purpose />
        <FocusAreas />
        <Pathways />
        <Principles />
        <Inclusion />
        <Process />
        <Invitation />
        <Faq />
      </main>
      <Footer />
      <AnalyticsListener />
    </>
  );
}
