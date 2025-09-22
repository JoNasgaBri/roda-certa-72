import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryCarousel from "@/components/CategoryCarousel";
import RecommendedCars from "@/components/RecommendedCars";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CategoryCarousel />
      <RecommendedCars />
    </div>
  );
};

export default Index;
