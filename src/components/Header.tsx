import { Search, Heart, User, Menu, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  // Verificação de status de login
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true' || isAdmin;

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userLoggedIn');
    window.location.href = '/';
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/">
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
                CarHub
              </h1>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/comprar" className="text-foreground hover:text-primary transition-colors">
              Comprar
            </a>
            <a href="/car-details/1" className="text-foreground hover:text-primary transition-colors">
              Ver Detalhes
            </a>
            <a href="/test-drive" className="text-foreground hover:text-primary transition-colors">
              Test Drive
            </a>
            {isAdmin && (
              <a href="/admin" className="text-foreground hover:text-primary transition-colors flex items-center gap-1">
                <Shield className="h-4 w-4" />
                Dashboard
              </a>
            )}
          </nav>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Buscar marca, modelo..." 
                className="pl-10 border-muted bg-muted/30"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <a href="/favoritos">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Heart className="h-4 w-4 mr-2" />
                Favoritos
              </Button>
            </a>
            
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center px-3 py-1 bg-primary/10 rounded-md">
                  <User className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {isAdmin ? 'Administrador' : 'Usuário'}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <a href="/login">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </a>
            )}
            
            {/* Mobile menu */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;