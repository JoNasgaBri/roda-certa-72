import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  useTheme,
  alpha
} from '@mui/material';
import {
  Search,
  Favorite,
  Person,
  Menu as MenuIcon,
  Shield,
  Logout
} from '@mui/icons-material';

const HeaderMUI = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  // Verificação de status de login
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true' || isAdmin;

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userLoggedIn');
    window.location.href = '/';
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        {/* Logo */}
        <Box component="a" href="/" sx={{ textDecoration: 'none' }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
              },
              transition: 'opacity 0.3s ease',
            }}
          >
            CarHub
          </Typography>
        </Box>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
          <Button 
            color="inherit" 
            href="/comprar"
            sx={{ color: theme.palette.text.primary, '&:hover': { color: theme.palette.primary.main } }}
          >
            Comprar
          </Button>
          <Button 
            color="inherit" 
            href="/car-details/1"
            sx={{ color: theme.palette.text.primary, '&:hover': { color: theme.palette.primary.main } }}
          >
            Ver Detalhes
          </Button>
          <Button 
            color="inherit" 
            href="/test-drive"
            sx={{ color: theme.palette.text.primary, '&:hover': { color: theme.palette.primary.main } }}
          >
            Test Drive
          </Button>
          {isAdmin && (
            <Button 
              color="inherit" 
              href="/admin"
              startIcon={<Shield />}
              sx={{ color: theme.palette.text.primary, '&:hover': { color: theme.palette.primary.main } }}
            >
              Dashboard
            </Button>
          )}
        </Box>

        {/* Search Bar - Hidden on mobile */}
        <Box sx={{ display: { xs: 'none', lg: 'flex' }, flex: 1, maxWidth: 400, mx: 4 }}>
          <TextField
            fullWidth
            placeholder="Buscar marca, modelo..."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
              sx: {
                backgroundColor: alpha(theme.palette.secondary.main, 0.3),
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.secondary.main,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />
        </Box>

        {/* Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            href="/favoritos"
            startIcon={<Favorite />}
            sx={{ 
              display: { xs: 'none', sm: 'flex' },
              color: theme.palette.text.primary,
              '&:hover': { color: theme.palette.primary.main }
            }}
          >
            Favoritos
          </Button>
          
          {isLoggedIn ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1, 
                  px: 2, 
                  py: 0.5, 
                  backgroundColor: alpha(theme.palette.primary.main, 0.1), 
                  borderRadius: 2 
                }}
              >
                <Person sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                  {isAdmin ? 'Administrador' : 'Usuário'}
                </Typography>
              </Box>
              <IconButton onClick={handleLogout} sx={{ color: theme.palette.text.secondary }}>
                <Logout />
              </IconButton>
            </Box>
          ) : (
            <Button
              variant="outlined"
              href="/login"
              startIcon={<Person />}
              sx={{ borderRadius: 2 }}
            >
              Login
            </Button>
          )}
          
          {/* Mobile menu */}
          <IconButton 
            sx={{ display: { xs: 'flex', md: 'none' } }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Mobile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuItem onClick={handleMenuClose} component="a" href="/comprar">
            Comprar
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component="a" href="/car-details/1">
            Ver Detalhes
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component="a" href="/test-drive">
            Test Drive
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component="a" href="/favoritos">
            Favoritos
          </MenuItem>
          {isAdmin && (
            <MenuItem onClick={handleMenuClose} component="a" href="/admin">
              Dashboard
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderMUI;