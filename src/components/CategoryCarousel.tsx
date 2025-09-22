import { Car, Truck, Zap, Crown, Users, Baby } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: "sedan",
    name: "Sedan",
    icon: Car,
    count: "2.840 veículos",
    color: "bg-blue-50 text-blue-600 border-blue-200"
  },
  {
    id: "suv", 
    name: "SUV",
    icon: Truck,
    count: "1.520 veículos",
    color: "bg-green-50 text-green-600 border-green-200"
  },
  {
    id: "eletrico",
    name: "Elétrico",
    icon: Zap,
    count: "340 veículos", 
    color: "bg-yellow-50 text-yellow-600 border-yellow-200"
  },
  {
    id: "premium",
    name: "Premium",
    icon: Crown,
    count: "890 veículos",
    color: "bg-purple-50 text-purple-600 border-purple-200"
  },
  {
    id: "familiar",
    name: "Familiar",
    icon: Users,
    count: "1.200 veículos",
    color: "bg-pink-50 text-pink-600 border-pink-200"
  },
  {
    id: "compacto",
    name: "Compacto",
    icon: Baby,
    count: "980 veículos",
    color: "bg-orange-50 text-orange-600 border-orange-200"
  }
];

const CategoryCarousel = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Categorias de Veículos
          </h2>
          <p className="text-muted-foreground">
            Encontre o tipo de carro perfeito para suas necessidades
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.id} className="hover:shadow-hover transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Ver Todas as Categorias
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;