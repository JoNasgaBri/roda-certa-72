import React from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  useTheme,
  alpha
} from '@mui/material';
import {
  DirectionsCar,
  LocalShipping,
  ElectricBolt,
  Star,
  Group,
  Circle
} from '@mui/icons-material';

const categories = [
  {
    id: "sedan",
    name: "Sedan",
    icon: DirectionsCar,
    count: "2.840 veículos",
    color: "#3B82F6"
  },
  {
    id: "suv", 
    name: "SUV",
    icon: LocalShipping,
    count: "1.520 veículos",
    color: "#10B981"
  },
  {
    id: "eletrico",
    name: "Elétrico",
    icon: ElectricBolt,
    count: "340 veículos", 
    color: "#F59E0B"
  },
  {
    id: "premium",
    name: "Premium",
    icon: Star,
    count: "890 veículos",
    color: "#8B5CF6"
  },
  {
    id: "familiar",
    name: "Familiar",
    icon: Group,
    count: "1.200 veículos",
    color: "#EC4899"
  },
  {
    id: "compacto",
    name: "Compacto",
    icon: Circle,
    count: "980 veículos",
    color: "#F97316"
  }
];

const CategoryCarouselMUI = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 8, backgroundColor: alpha(theme.palette.secondary.main, 0.3) }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h2" sx={{ mb: 2, color: theme.palette.text.primary }}>
            Categorias de Veículos
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
            Encontre o tipo de carro perfeito para suas necessidades
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(6, 1fr)' }, 
          gap: 3 
        }}>
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={category.id}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    '& .category-icon': {
                      transform: 'scale(1.1)',
                    },
                  },
                }}
              >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box
                      className="category-icon"
                      sx={{
                        width: 64,
                        height: 64,
                        mx: 'auto',
                        mb: 2,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: alpha(category.color, 0.1),
                        color: category.color,
                        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      <IconComponent sx={{ fontSize: 32 }} />
                    </Box>
                    <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
                      {category.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      {category.count}
                    </Typography>
                  </CardContent>
                </Card>
            );
          })}
        </Box>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button variant="outlined" size="large" sx={{ borderRadius: 2, px: 4 }}>
            Ver Todas as Categorias
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CategoryCarouselMUI;