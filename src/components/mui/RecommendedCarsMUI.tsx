import React from 'react';
import {
  Box,
  Typography,
  Container,
  Button,
  Chip,
  useTheme
} from '@mui/material';
import CarCardMUI from './CarCardMUI';

const recommendedCars = [
  {
    id: "rec1",
    brand: "Honda",
    model: "Civic",
    year: 2023,
    price: 135000,
    mileage: 15000,
    fuel: "Flex",
    transmission: "Automático",
    location: "São Paulo, SP",
    images: ["https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800"],
    fipePrice: 142000,
    promoted: true
  },
  {
    id: "rec2",
    brand: "Toyota",
    model: "Corolla",
    year: 2022,
    price: 128000,
    mileage: 28000,
    fuel: "Flex",
    transmission: "Automático", 
    location: "Rio de Janeiro, RJ",
    images: ["https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800"],
    fipePrice: 125000,
    isFavorite: true
  },
  {
    id: "rec3",
    brand: "Hyundai",
    model: "Elantra",
    year: 2023,
    price: 142000,
    mileage: 8000,
    fuel: "Flex",
    transmission: "Automático",
    location: "Curitiba, PR",
    images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800"],
    fipePrice: 145000
  }
];

const RecommendedCarsMUI = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 6 }}>
          <Box>
            <Typography variant="h2" component="h2" sx={{ mb: 1, color: theme.palette.text.primary }}>
              Recomendados para Você
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
              Veículos selecionados especialmente baseados nas suas preferências
            </Typography>
          </Box>
          <Chip 
            label={`${recommendedCars.length} veículos`}
            variant="outlined"
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.text.primary,
              fontWeight: 600,
            }}
          />
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, 
          gap: 4 
        }}>
          {recommendedCars.map((car) => (
            <CarCardMUI key={car.id} {...car} />
          ))}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button variant="outlined" size="large" sx={{ borderRadius: 2, px: 4 }}>
            Ver Mais Recomendações
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default RecommendedCarsMUI;