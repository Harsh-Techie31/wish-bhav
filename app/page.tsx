import SplashScreen from "@/components/SplashScreen";
import ChopstickCursor from "@/components/ChopstickCursor";
import Navbar from "@/components/Navbar";
import LaunchHero from "@/components/LaunchHero";
import CategoryIntro from "@/components/CategoryIntro";
import MoodboardSection from "@/components/MoodboardSection";
import SKUShowcase from "@/components/SKUShowcase";
import InteractivePhone from "@/components/InteractivePhone";
import ProductionSection from "@/components/ProductionSection";
import CatalogueBlendCheck from "@/components/CatalogueBlendCheck";
import FinalDeliverables from "@/components/FinalDeliverables";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ChopstickCursor />
      <SplashScreen />
      <Navbar />
      <main>
        <LaunchHero />
        <CategoryIntro />
        <MoodboardSection />
        <SKUShowcase />
        <InteractivePhone />
        <ProductionSection />
        <CatalogueBlendCheck />
        <FinalDeliverables />
      </main>
      <Footer />
    </>
  );
}
