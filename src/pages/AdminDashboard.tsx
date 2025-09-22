import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, UserPlus, Heart, Car, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import Header from "@/components/Header";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Usuários Logados Hoje",
      value: 247,
      change: +12,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Test Drives Agendados",
      value: 34,
      change: +8,
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Novos Cadastros",
      value: 156,
      change: +23,
      icon: UserPlus,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Carros Favoritados",
      value: 892,
      change: -5,
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Visualizações de Carros",
      value: 3247,
      change: +45,
      icon: Car,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Taxa de Conversão",
      value: "12.5%",
      change: +2.1,
      icon: TrendingUp,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  const recentActivity = [
    {
      user: "João Silva",
      action: "Agendou test drive",
      car: "Toyota Corolla 2023",
      time: "há 5 minutos",
    },
    {
      user: "Maria Santos",
      action: "Favoritou",
      car: "Honda Civic 2022",
      time: "há 12 minutos",
    },
    {
      user: "Carlos Oliveira",
      action: "Visualizou detalhes",
      car: "Volkswagen Polo 2023",
      time: "há 18 minutos",
    },
    {
      user: "Ana Costa",
      action: "Fez cadastro",
      car: "-",
      time: "há 25 minutos",
    },
  ];

  const topCars = [
    { name: "Toyota Corolla 2023", views: 234, favorites: 45 },
    { name: "Honda Civic 2022", views: 189, favorites: 38 },
    { name: "Volkswagen Polo 2023", views: 156, favorites: 29 },
    { name: "Hyundai HB20 2023", views: 143, favorites: 31 },
    { name: "Chevrolet Onix 2022", views: 128, favorites: 22 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Painel Administrativo
          </h1>
          <p className="text-muted-foreground">
            Acompanhe as estatísticas e atividades da sua loja
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <div className="flex items-center mt-2">
                        {stat.change > 0 ? (
                          <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-red-600 mr-1" />
                        )}
                        <span className={`text-sm ${stat.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change > 0 ? '+' : ''}{stat.change}
                        </span>
                        <span className="text-sm text-muted-foreground ml-1">
                          vs ontem
                        </span>
                      </div>
                    </div>
                    <div className={`${stat.bgColor} p-3 rounded-lg`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">
                        {activity.user}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.action} {activity.car !== '-' && `- ${activity.car}`}
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {activity.time}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Cars */}
          <Card>
            <CardHeader>
              <CardTitle>Carros Mais Populares</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCars.map((car, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">
                        {car.name}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-muted-foreground">
                          👁️ {car.views} visualizações
                        </span>
                        <span className="text-sm text-muted-foreground">
                          ❤️ {car.favorites} favoritos
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline">
                      #{index + 1}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;