import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CarCard from "./CarCard";

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

const RecommendedCars = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Recomendados para Você
            </h2>
            <p className="text-muted-foreground">
              Veículos selecionados especialmente baseados nas suas preferências
            </p>
          </div>
          <Badge variant="secondary" className="text-sm">
            {recommendedCars.length} veículos
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCars.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Ver Mais Recomendações
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecommendedCars;