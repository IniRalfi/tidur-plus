import Navbar from "./Navbar";
import Hero from "./Hero";
import Stats from "./Stats";
import Features from "./Features";
import Books from "./Books";
import CTA from "./CTA";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Books />
      <CTA />
      <Footer />
    </div>
  );
}