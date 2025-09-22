import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  useTheme,
  alpha
} from '@mui/material';
import {
  Favorite,
  LocationOn,
  LocalGasStation,
  Speed,
  Settings
} from '@mui/icons-material';

interface CarCardMUIProps {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  location: string;
  images: string[];
  fipePrice?: number;
  promoted?: boolean;
  isFavorite?: boolean;
}

const CarCardMUI = ({ 
  id,
  brand, 
  model, 
  year, 
  price, 
  mileage, 
  fuel, 
  transmission, 
  location, 
  images, 
  fipePrice,
  promoted = false,
  isFavorite = false
}: CarCardMUIProps) => {
  const theme = useTheme();

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatMileage = (km: number) => {
    return new Intl.NumberFormat('pt-BR').format(km) + ' km';
  };

  const getFipeComparison = () => {
    if (!fipePrice) return null;
    const diff = ((price - fipePrice) / fipePrice) * 100;
    if (diff < -5) return { type: 'below', text: 'Abaixo FIPE', color: theme.palette.success.main };
    if (diff > 5) return { type: 'above', text: 'Acima FIPE', color: theme.palette.warning.main };
    return { type: 'equal', text: 'Preço FIPE', color: theme.palette.primary.main };
  };

  const fipeComparison = getFipeComparison();

  const handleFavoriteClick = () => {
    if (isFavorite) {
      alert("Veículo removido dos favoritos!");
    } else {
      alert("Para salvar veículos favoritos, você precisa fazer login primeiro!");
    }
  };

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${alpha(theme.palette.secondary.main, 0.3)})`,
        '&:hover': {
          transform: 'translateY(-4px)',
          '& .car-image': {
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      {/* Image */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="240"
          image={images[0]}
          alt={`${brand} ${model} ${year}`}
          className="car-image"
          sx={{
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />

        {/* Badges */}
        <Box sx={{ position: 'absolute', top: 12, left: 12, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {promoted && (
            <Chip
              label="Destaque"
              size="small"
              sx={{
                backgroundColor: theme.palette.warning.main,
                color: theme.palette.warning.contrastText,
                fontWeight: 600,
              }}
            />
          )}
          {fipeComparison && (
            <Chip
              label={fipeComparison.text}
              size="small"
              sx={{
                backgroundColor: fipeComparison.color,
                color: 'white',
                fontWeight: 600,
              }}
            />
          )}
        </Box>

        {/* Favorite Button */}
        <IconButton
          onClick={handleFavoriteClick}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            backgroundColor: alpha('#ffffff', 0.9),
            '&:hover': {
              backgroundColor: '#ffffff',
              transform: 'scale(1.1)',
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Favorite
            sx={{
              color: isFavorite ? theme.palette.error.main : theme.palette.text.secondary,
              ...(isFavorite && { fill: theme.palette.error.main }),
            }}
          />
        </IconButton>
      </Box>

      <CardContent sx={{ p: 3 }}>
        {/* Title */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              transition: 'color 0.3s ease',
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
          >
            {brand} {model}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
            {year} • {transmission}
          </Typography>
        </Box>

        {/* Price */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 700, mb: 0.5 }}>
            {formatPrice(price)}
          </Typography>
          {fipePrice && (
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              FIPE: {formatPrice(fipePrice)}
            </Typography>
          )}
        </Box>

        {/* Details */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Speed sx={{ fontSize: 16, mr: 1, color: theme.palette.text.secondary }} />
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              {formatMileage(mileage)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocalGasStation sx={{ fontSize: 16, mr: 1, color: theme.palette.text.secondary }} />
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              {fuel}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gridColumn: '1 / -1' }}>
            <LocationOn sx={{ fontSize: 16, mr: 1, color: theme.palette.text.secondary }} />
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              {location}
            </Typography>
          </Box>
        </Box>

        {/* Actions */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
          <Button
            variant="outlined"
            fullWidth
            href={`/car-details/${id}`}
            sx={{ borderRadius: 2 }}
          >
            Ver Detalhes
          </Button>
          <Button
            variant="contained"
            fullWidth
            href="/test-drive"
            sx={{
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${alpha(theme.palette.primary.dark, 0.8)})`,
              },
            }}
          >
            Test Drive
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CarCardMUI;