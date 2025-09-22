import { useParams } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Heart, Share2, MapPin, Calendar, Fuel, Gauge, Cog, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";

// Sample car data - in a real app this would come from an API
const carData = {
  "1": {
    brand: "Honda",
    model: "Civic",
    year: 2023,
    price: 135000,
    mileage: 15000,
    fuel: "Flex",
    transmission: "Automático",
    location: "São Paulo, SP",
    images: [
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800",
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
      "https://images.unsplash.com/photo-1592853625511-ad0edcc69c07?w=800"
    ],
    fipePrice: 142000,
    promoted: true,
    description: "Honda Civic EXL 2023 em excelente estado de conservação. Único dono, sempre revisado na concessionária. Veículo impecável com baixa quilometragem.",
    features: [
      "Ar condicionado digital",
      "Central multimídia",
      "Câmera de ré",
      "Sensores de estacionamento",
      "Banco de couro",
      "Rodas de liga leve",
      "Faróis LED",
      "Controle de cruzeiro"
    ],
    specs: {
      engine: "2.0 16V",
      power: "154 cv",
      torque: "19,4 kgfm",
      consumption: "14,2 km/l"
    }
  }
};

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const car = carData[id as keyof typeof carData];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!car) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground">Veículo não encontrado</h1>
          <a href="/comprar">
            <Button className="mt-4">Voltar para catálogo</Button>
          </a>
        </div>
      </div>
    );
  }

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <div className="mb-6">
          <a href="/comprar" className="inline-flex items-center text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar aos resultados
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Images */}
            <div className="mb-8">
              <div className="aspect-[16/10] mb-4 rounded-lg overflow-hidden">
                <img 
                  src={car.images[selectedImageIndex]} 
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {car.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {car.images.map((image, index) => (
                    <div 
                      key={index} 
                      className={`aspect-[4/3] rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                        selectedImageIndex === index 
                          ? 'border-primary shadow-lg' 
                          : 'border-transparent hover:border-muted'
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img 
                        src={image} 
                        alt={`${car.brand} ${car.model} ${index + 1}`}
                        className="w-full h-full object-cover hover:opacity-80 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Title and badges */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {car.brand} {car.model} {car.year}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {car.location}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => alert("Para salvar favoritos, você precisa fazer login!")}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                {car.promoted && (
                  <Badge className="bg-warning text-warning-foreground">
                    Destaque
                  </Badge>
                )}
                <Badge className="bg-success text-success-foreground">
                  Abaixo FIPE
                </Badge>
              </div>
            </div>

            {/* Description */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Descrição</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{car.description}</p>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Especificações Técnicas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Quilometragem</p>
                      <p className="font-medium">{new Intl.NumberFormat('pt-BR').format(car.mileage)} km</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Combustível</p>
                      <p className="font-medium">{car.fuel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cog className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Câmbio</p>
                      <p className="font-medium">{car.transmission}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Ano</p>
                      <p className="font-medium">{car.year}</p>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Motor</p>
                    <p className="font-medium">{car.specs.engine}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Potência</p>
                    <p className="font-medium">{car.specs.power}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Torque</p>
                    <p className="font-medium">{car.specs.torque}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Consumo</p>
                    <p className="font-medium">{car.specs.consumption}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Equipamentos e Opcionais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-success" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-foreground mb-2">
                      {formatPrice(car.price)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      FIPE: {formatPrice(car.fipePrice || 0)}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <a href="/test-drive" className="w-full">
                      <Button className="w-full bg-gradient-primary hover:bg-primary-hover">
                        Agendar Test Drive
                      </Button>
                    </a>
                    <Button variant="outline" className="w-full">
                      Simular Financiamento
                    </Button>
                    <Button variant="outline" className="w-full">
                      Fazer Proposta
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Se interessou?</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Deixe seu email para entrarmos em contato com você
                  </p>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Nome</Label>
                      <Input id="contact-name" placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input id="contact-email" type="email" placeholder="seu@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-phone">Telefone</Label>
                      <Input id="contact-phone" placeholder="(11) 99999-9999" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-message">Mensagem (opcional)</Label>
                      <Textarea 
                        id="contact-message" 
                        placeholder="Deixe sua mensagem..."
                        rows={3}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Enviar Contato
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;