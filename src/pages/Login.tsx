import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Shield } from "lucide-react";
import Header from "@/components/Header";
import loginBackground from "@/assets/login-background.jpg";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Get form data
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      if (isAdmin) {
        // Check admin credentials
        if (email === 'emilly.rodrigues@gmail.com' && password === '12345') {
          localStorage.setItem('isAdmin', 'true');
          localStorage.setItem('userLoggedIn', 'true');
          alert("Login de administrador realizado com sucesso!");
          window.location.href = '/admin'; // Redirect to admin dashboard
        } else {
          alert("Credenciais de administrador inválidas!");
        }
      } else {
        localStorage.setItem('isAdmin', 'false');
        localStorage.setItem('userLoggedIn', 'true');
        alert("Login realizado com sucesso!");
        window.location.href = '/'; // Redirect to home
      }
    }, 1000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('userLoggedIn', 'true');
      localStorage.setItem('isAdmin', 'false');
      alert("Conta criada com sucesso!");
      window.location.href = '/'; // Redirect to home
    }, 1000);
  };

  return (
    <div className="min-h-screen relative">
      {/* Beautiful gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/20 to-secondary/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      
      <Header />
      <div className="relative container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Bem-vindo ao CarHub
            </h1>
            <p className="text-muted-foreground">
              Faça login ou crie sua conta para continuar
            </p>
          </div>

          <div className="mb-6 p-4 border rounded-lg bg-card/80 backdrop-blur-sm shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {isAdmin ? "Login de Administrador" : "Login de Usuário"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="admin-switch" className="text-sm text-muted-foreground">
                  Administrador
                </Label>
                <Switch
                  id="admin-switch"
                  checked={isAdmin}
                  onCheckedChange={setIsAdmin}
                />
              </div>
            </div>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className={`grid w-full ${isAdmin ? 'grid-cols-1' : 'grid-cols-2'} bg-card/80 backdrop-blur-sm`}>
              <TabsTrigger value="login">Entrar</TabsTrigger>
              {!isAdmin && <TabsTrigger value="register">Criar Conta</TabsTrigger>}
            </TabsList>
            
            <TabsContent value="login">
              <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 ring-1 ring-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {isAdmin && <Shield className="h-5 w-5 text-primary" />}
                    {isAdmin ? "Login de Administrador" : "Fazer Login"}
                  </CardTitle>
                  <CardDescription>
                    {isAdmin 
                      ? "Acesse o painel administrativo da loja"
                      : "Entre com suas credenciais para acessar sua conta"
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    {isAdmin && (
                      <div className="space-y-2">
                        <Label htmlFor="store-code">Código da Loja</Label>
                        <Input 
                          id="store-code" 
                          name="store-code"
                          type="text" 
                          placeholder="CH001" 
                          required 
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        placeholder={isAdmin ? "emilly.rodrigues@gmail.com" : "seu@email.com"}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Senha</Label>
                      <Input 
                        id="password" 
                        name="password"
                        type="password" 
                        placeholder="••••••••" 
                        required 
                      />
                    </div>
                    {isAdmin && (
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          <strong>Acesso de administrador:</strong><br />
                          E-mail: emilly.rodrigues@gmail.com<br />
                          Senha: 12345<br />
                          Código: CH001
                        </p>
                      </div>
                    )}
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Entrando..." : (isAdmin ? "Acessar Painel" : "Entrar")}
                    </Button>
                  </form>
                  
                  {!isAdmin && (
                    <div className="mt-4 text-center">
                      <a href="#" className="text-sm text-primary hover:underline">
                        Esqueceu sua senha?
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 ring-1 ring-border/50">
                <CardHeader>
                  <CardTitle>Criar Conta</CardTitle>
                  <CardDescription>
                    Crie sua conta gratuita para salvar favoritos e mais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo</Label>
                      <Input 
                        id="name" 
                        type="text" 
                        placeholder="Seu nome completo" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">E-mail</Label>
                      <Input 
                        id="register-email" 
                        type="email" 
                        placeholder="seu@email.com" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="(11) 99999-9999" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Senha</Label>
                      <Input 
                        id="register-password" 
                        type="password" 
                        placeholder="••••••••" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar Senha</Label>
                      <Input 
                        id="confirm-password" 
                        type="password" 
                        placeholder="••••••••" 
                        required 
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Criando conta..." : "Criar Conta"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <a href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao início
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;