import HeaderMUI from "@/components/mui/HeaderMUI";
import HeroSectionMUI from "@/components/mui/HeroSectionMUI";
import CategoryCarouselMUI from "@/components/mui/CategoryCarouselMUI";
import RecommendedCarsMUI from "@/components/mui/RecommendedCarsMUI";
import { Box } from '@mui/material';

const Index = () => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <HeaderMUI />
      <HeroSectionMUI />
      <CategoryCarouselMUI />
      <RecommendedCarsMUI />
    </Box>
  );
};

export default Index;
