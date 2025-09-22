import Header from "@/components/Header";
import CarCard from "@/components/CarCard";

// Sample favorite cars data
const favoriteCars = [
  {
    id: "1",
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
    promoted: true,
    isFavorite: true
  },
  {
    id: "2",
    brand: "Toyota",
    model: "Corolla",
    year: 2022,
    price: 128000,
    mileage: 22000,
    fuel: "Flex",
    transmission: "Automático",
    location: "Rio de Janeiro, RJ",
    images: ["https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800"],
    fipePrice: 135000,
    promoted: false,
    isFavorite: true
  }
];

const Favoritos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Seus Veículos Favoritos
          </h1>
          <p className="text-muted-foreground">
            Veja todos os veículos que você salvou como favoritos.
          </p>
        </div>
        
        {favoriteCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteCars.map((car) => (
              <CarCard key={car.id} {...car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Nenhum favorito ainda
            </h2>
            <p className="text-muted-foreground mb-6">
              Comece a salvar os veículos que mais gosta para vê-los aqui.
            </p>
            <a href="/comprar">
              <button className="bg-gradient-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors">
                Explorar Veículos
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favoritos;