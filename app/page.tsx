import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductRail from "@/components/ProductRail";
import VideoWall from "@/components/VideoWall";
import TerminalTheatre from "@/components/TerminalTheatre";
import LogoMarquee from "@/components/LogoMarquee";
import Stats from "@/components/Stats";
import Statement from "@/components/Statement";
import Bento from "@/components/Bento";
import Features from "@/components/Features";
import NeonProduct from "@/components/NeonProduct";
import StackSteps from "@/components/StackSteps";
import Savings from "@/components/Savings";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <ProductRail />
        <NeonProduct />
        <VideoWall />
        <TerminalTheatre />
        <LogoMarquee />
        <Stats />
        <Statement />
        <Bento />
        <Features />
        <Savings />
        <StackSteps />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
