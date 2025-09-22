import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon, Car, Clock, MapPin, User, Edit, Trash2, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface Agendamento {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cnh: string;
  marcaModelo: string;
  data: Date | undefined;
  horario: string;
  unidade: string;
  observacoes: string;
  criadoEm: Date;
}

const TestDrive = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cnh, setCnh] = useState("");
  const [marcaModelo, setMarcaModelo] = useState("");
  const [data, setData] = useState<Date>();
  const [horario, setHorario] = useState("");
  const [unidade, setUnidade] = useState("");
  const [observacoes, setObservacoes] = useState("");
  
  // Estados para os agendamentos
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [editandoVeiculo, setEditandoVeiculo] = useState<string | null>(null);
  const [editandoObservacoes, setEditandoObservacoes] = useState<string | null>(null);
  const [editandoCnh, setEditandoCnh] = useState<string | null>(null);
  const [editandoUnidade, setEditandoUnidade] = useState<string | null>(null);

  const handleAgendar = () => {
    if (!nome || !email || !telefone || !cnh || !marcaModelo || !data || !horario || !unidade) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const novoAgendamento: Agendamento = {
      id: Date.now().toString(),
      nome,
      email,
      telefone,
      cnh,
      marcaModelo,
      data,
      horario,
      unidade,
      observacoes,
      criadoEm: new Date(),
    };

    setAgendamentos([...agendamentos, novoAgendamento]);
    
    // Limpar formulário
    setNome("");
    setEmail("");
    setTelefone("");
    setCnh("");
    setMarcaModelo("");
    setData(undefined);
    setHorario("");
    setUnidade("");
    setObservacoes("");

    console.log("Test drive agendado:", novoAgendamento);
  };

  const deletarAgendamento = (id: string) => {
    setAgendamentos(agendamentos.filter(agendamento => agendamento.id !== id));
  };

  const salvarVeiculo = (id: string, novoVeiculo: string) => {
    setAgendamentos(agendamentos.map(agendamento => 
      agendamento.id === id 
        ? { ...agendamento, marcaModelo: novoVeiculo }
        : agendamento
    ));
    setEditandoVeiculo(null);
  };

  const salvarObservacoes = (id: string, novasObservacoes: string) => {
    setAgendamentos(agendamentos.map(agendamento => 
      agendamento.id === id 
        ? { ...agendamento, observacoes: novasObservacoes }
        : agendamento
    ));
    setEditandoObservacoes(null);
  };

  const salvarCnh = (id: string, novaCnh: string) => {
    setAgendamentos(agendamentos.map(agendamento => 
      agendamento.id === id 
        ? { ...agendamento, cnh: novaCnh }
        : agendamento
    ));
    setEditandoCnh(null);
  };

  const salvarUnidade = (id: string, novaUnidade: string) => {
    setAgendamentos(agendamentos.map(agendamento => 
      agendamento.id === id 
        ? { ...agendamento, unidade: novaUnidade }
        : agendamento
    ));
    setEditandoUnidade(null);
  };

  const horariosDisponiveis = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const unidadesDisponiveis = [
    "São Paulo - Vila Olímpia",
    "São Paulo - Morumbi", 
    "Rio de Janeiro - Barra da Tijuca",
    "Belo Horizonte - Savassi",
    "Brasília - Asa Sul"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              Agendar Test Drive
            </h1>
            <p className="text-xl text-muted-foreground">
              Experimente o veículo dos seus sonhos antes de decidir
            </p>
          </div>

          {/* Alerta de login necessário */}
          <Alert className="mb-8 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="text-amber-800 dark:text-amber-200">
              <strong>Atenção:</strong> Para agendar um test drive é necessário estar logado em sua conta. 
              Caso não tenha uma conta, você pode criar uma gratuitamente na página de login.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Dados Pessoais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Dados Pessoais
                </CardTitle>
                <CardDescription>
                  Informações necessárias para o agendamento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo *</Label>
                  <Input
                    id="nome"
                    placeholder="Seu nome completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone/WhatsApp *</Label>
                  <Input
                    id="telefone"
                    placeholder="(11) 99999-9999"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cnh">CNH (últimos 4 dígitos) *</Label>
                  <Input
                    id="cnh"
                    placeholder="1234"
                    maxLength={4}
                    value={cnh}
                    onChange={(e) => setCnh(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Detalhes do Test Drive */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Detalhes do Test Drive
                </CardTitle>
                <CardDescription>
                  Escolha o veículo, data e horário
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="marca-modelo">Marca/Modelo de Interesse</Label>
                  <Select value={marcaModelo} onValueChange={setMarcaModelo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o veículo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="honda-civic">Honda Civic 2023</SelectItem>
                      <SelectItem value="toyota-corolla">Toyota Corolla 2022</SelectItem>
                      <SelectItem value="hyundai-hb20">Hyundai HB20 2023</SelectItem>
                      <SelectItem value="volkswagen-jetta">Volkswagen Jetta 2022</SelectItem>
                      <SelectItem value="chevrolet-onix">Chevrolet Onix Plus 2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Data Preferida</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !data && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {data ? format(data, "PPP", { locale: ptBR }) : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={data}
                        onSelect={setData}
                        disabled={(date) => date < new Date()}
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="horario">Horário Preferido</Label>
                  <Select value={horario} onValueChange={setHorario}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {horariosDisponiveis.map((hora) => (
                        <SelectItem key={hora} value={hora}>
                          {hora}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unidade">Unidade para Test Drive</Label>
                  <Select value={unidade} onValueChange={setUnidade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a unidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {unidadesDisponiveis.map((local) => (
                        <SelectItem key={local} value={local}>
                          {local}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Observações e Confirmação */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Informações Adicionais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações (opcional)</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Alguma observação especial ou dúvida sobre o veículo..."
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Importante:
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Leve um documento com foto e CNH válida</li>
                  <li>• O test drive tem duração aproximada de 30 minutos</li>
                  <li>• Confirmaremos o agendamento por e-mail e WhatsApp</li>
                  <li>• Em caso de chuva, reagendaremos para sua segurança</li>
                </ul>
              </div>

              <Button
                onClick={handleAgendar}
                className="w-full bg-gradient-primary hover:bg-primary-hover"
                size="lg"
              >
                <Car className="h-4 w-4 mr-2" />
                Confirmar Agendamento
              </Button>
            </CardContent>
          </Card>

          {/* Agendamentos Criados */}
          {agendamentos.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Agendamentos Criados</h2>
              <div className="space-y-4">
                {agendamentos.map((agendamento) => (
                  <Card key={agendamento.id} className="relative">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-5 w-5" />
                          {agendamento.nome}
                        </CardTitle>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deletarAgendamento(agendamento.id)}
                          className="shrink-0"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir Agendamento
                        </Button>
                      </div>
                      <CardDescription>
                        Agendado em {format(agendamento.criadoEm, "dd/MM/yyyy 'às' HH:mm")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">E-mail</Label>
                          <p className="text-sm">{agendamento.email}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Telefone/WhatsApp</Label>
                          <p className="text-sm">{agendamento.telefone}</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-sm font-medium text-muted-foreground">CNH</Label>
                            {editandoCnh !== agendamento.id && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditandoCnh(agendamento.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          {editandoCnh === agendamento.id ? (
                            <div className="flex gap-2">
                              <Input
                                value={agendamento.cnh}
                                onChange={(e) => {
                                  if (e.target.value.length <= 4) {
                                    setAgendamentos(agendamentos.map(a => 
                                      a.id === agendamento.id 
                                        ? { ...a, cnh: e.target.value }
                                        : a
                                    ));
                                  }
                                }}
                                placeholder="1234"
                                maxLength={4}
                                className="flex-1"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => salvarCnh(agendamento.id, agendamento.cnh)}
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditandoCnh(null)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <p className="text-sm">****{agendamento.cnh}</p>
                          )}
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-muted-foreground">Data e Horário</Label>
                          <p className="text-sm">
                            {agendamento.data && format(agendamento.data, "dd/MM/yyyy", { locale: ptBR })} às {agendamento.horario}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <div className="flex items-center justify-between mb-2">
                            <Label className="text-sm font-medium text-muted-foreground">Unidade</Label>
                            {editandoUnidade !== agendamento.id && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditandoUnidade(agendamento.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          {editandoUnidade === agendamento.id ? (
                            <div className="flex gap-2">
                              <Select
                                value={agendamento.unidade}
                                onValueChange={(value) => salvarUnidade(agendamento.id, value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {unidadesDisponiveis.map((local) => (
                                    <SelectItem key={local} value={local}>
                                      {local}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditandoUnidade(null)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <p className="text-sm">{agendamento.unidade}</p>
                          )}
                        </div>
                      </div>

                      {/* Veículo - Editável */}
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-sm font-medium text-muted-foreground">Veículo de Interesse</Label>
                          {editandoVeiculo !== agendamento.id && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditandoVeiculo(agendamento.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        {editandoVeiculo === agendamento.id ? (
                          <div className="flex gap-2">
                            <Select
                              value={agendamento.marcaModelo}
                              onValueChange={(value) => salvarVeiculo(agendamento.id, value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="honda-civic">Honda Civic 2023</SelectItem>
                                <SelectItem value="toyota-corolla">Toyota Corolla 2022</SelectItem>
                                <SelectItem value="hyundai-hb20">Hyundai HB20 2023</SelectItem>
                                <SelectItem value="volkswagen-jetta">Volkswagen Jetta 2022</SelectItem>
                                <SelectItem value="chevrolet-onix">Chevrolet Onix Plus 2023</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditandoVeiculo(null)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <p className="text-sm">{agendamento.marcaModelo}</p>
                        )}
                      </div>

                      {/* Observações - Editável */}
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <Label className="text-sm font-medium text-muted-foreground">Observações</Label>
                          {editandoObservacoes !== agendamento.id && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditandoObservacoes(agendamento.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        {editandoObservacoes === agendamento.id ? (
                          <div className="space-y-2">
                            <Textarea
                              value={agendamento.observacoes}
                              onChange={(e) => {
                                setAgendamentos(agendamentos.map(a => 
                                  a.id === agendamento.id 
                                    ? { ...a, observacoes: e.target.value }
                                    : a
                                ));
                              }}
                              className="min-h-[100px]"
                            />
                            <div className="flex gap-2">
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => salvarObservacoes(agendamento.id, agendamento.observacoes)}
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Salvar
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditandoObservacoes(null)}
                              >
                                <X className="h-4 w-4 mr-2" />
                                Cancelar
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm whitespace-pre-wrap">
                            {agendamento.observacoes || "Nenhuma observação adicional"}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestDrive;