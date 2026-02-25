import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BackstageSection from "@/components/BackstageSection";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import RunningSection from "@/components/RunningSection";
import FootballSection from "@/components/FootballSection";
import SamboSection from "@/components/SamboSection";
import VideosSection from "@/components/VideosSection";
import InteractiveSection from "@/components/InteractiveSection";
import QuizCompetition from "@/components/QuizCompetition";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <Navbar />
    <main>
      <HeroSection />
      <BackstageSection />
      <AboutSection />
      <TeamSection />
      <RunningSection />
      <FootballSection />
      <SamboSection />
      <VideosSection />
      <InteractiveSection />
      <QuizCompetition />
    </main>
    <Footer />
  </>
);

export default Index;
