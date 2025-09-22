import React from 'react';
import {
  Box,
  Typography,
  Container,
  useTheme,
  alpha
} from '@mui/material';
import heroImage from "@/assets/hero-cars.jpg";

const HeroSectionMUI = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${alpha(theme.palette.text.primary, 0.8)}, ${alpha(theme.palette.primary.main, 0.6)})`,
          zIndex: 1,
        },
      }}
    >
      {/* Content */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative', 
          zIndex: 2, 
          textAlign: 'center',
          py: 8
        }}
      >
        <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              color: 'white',
              mb: 3,
              fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            Encontre o{' '}
            <Box
              component="span"
              sx={{
                display: 'block',
                background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${alpha(theme.palette.primary.light, 0.8)})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mt: 1,
              }}
            >
              Carro Perfeito
            </Box>
          </Typography>
          
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: alpha('#ffffff', 0.9),
              mb: 6,
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Milhares de veículos verificados, preços justos e experiência completa de compra.
          </Typography>
        </Box>
      </Container>

      {/* Decorative gradient at bottom */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '96px',
          background: `linear-gradient(to top, ${theme.palette.background.default}, transparent)`,
          zIndex: 2,
        }}
      />
    </Box>
  );
};

export default HeroSectionMUI;