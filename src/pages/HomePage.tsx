import CategoriesSection from "@/components/modules/HomePage/CategoriesSection";
import FeaturedCoursesSection from "@/components/modules/HomePage/FeaturedCoursesSection";
import HeroSection from "@/components/modules/HomePage/HeroSection";
import StatsSection from "@/components/modules/HomePage/StatsSection";
import TestimonialSection from "@/components/modules/HomePage/TestimonialSection";
import PageTitle from "@/components/PageTitle";

export default function HomePage() {
  return (
    <div>
      <PageTitle title="Home"/>
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <FeaturedCoursesSection />
      <TestimonialSection />
    </div>
  );
}
