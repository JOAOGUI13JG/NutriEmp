import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Contact() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      toast({
        title: "Formulário incompleto",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setIsPending(true);
    
    try {
      await apiRequest('POST', '/api/contact', contactForm);
      
      toast({
        title: "Mensagem enviada",
        description: "Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.",
      });
      
      // Reset form
      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Não foi possível enviar sua mensagem. Tente novamente mais tarde.",
        variant: "destructive",
      });
      console.error("Failed to send contact message:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 pb-16 md:pb-0">
      <PageHeader 
        title="Fale Conosco" 
        description="Entre em contato conosco e receba suporte nutricional personalizado"
      />
      
      {/* Seção de Canais de Contato com Design Aprimorado */}
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-2 text-primary-900">Canais de Atendimento</h2>
          <p className="text-primary-700 mb-8">
            Escolha o canal de sua preferência para receber suporte e orientações sobre nutrição e dieta
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* WhatsApp Card */}
            <a 
              href="https://wa.me/5511999999999" 
              className="bg-white rounded-xl p-6 transition-all hover:shadow-md hover:-translate-y-1 border border-green-100 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:shadow">
                  <i className="ri-whatsapp-line text-3xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-700">WhatsApp</h3>
                <p className="text-slate-600">Atendimento rápido e personalizado via chat</p>
                <div className="mt-4 text-green-600 font-medium flex items-center">
                  <span>Conversar agora</span>
                  <i className="ri-arrow-right-line ml-1"></i>
                </div>
              </div>
            </a>
            
            {/* Instagram Card */}
            <a 
              href="https://instagram.com/nutritrack" 
              className="bg-white rounded-xl p-6 transition-all hover:shadow-md hover:-translate-y-1 border border-purple-100 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:shadow">
                  <i className="ri-instagram-line text-3xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-purple-700">Instagram</h3>
                <p className="text-slate-600">Siga nosso perfil para dicas e atendimento</p>
                <div className="mt-4 text-purple-600 font-medium flex items-center">
                  <span>@nutritrack</span>
                  <i className="ri-arrow-right-line ml-1"></i>
                </div>
              </div>
            </a>
            
            {/* Email Card */}
            <a 
              href="mailto:contato@nutritrack.com" 
              className="bg-white rounded-xl p-6 transition-all hover:shadow-md hover:-translate-y-1 border border-blue-100 group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:shadow">
                  <i className="ri-mail-line text-3xl"></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-700">Email</h3>
                <p className="text-slate-600">Para assuntos mais detalhados e formais</p>
                <div className="mt-4 text-blue-600 font-medium flex items-center">
                  <span>contato@nutritrack.com</span>
                  <i className="ri-arrow-right-line ml-1"></i>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      
      {/* Formulário de Contato e FAQ com Tabs */}
      <Tabs defaultValue="message" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="message">Enviar Mensagem</TabsTrigger>
          <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
        </TabsList>
        
        {/* Tab de Envio de Mensagem */}
        <TabsContent value="message">
          <Card>
            <CardHeader>
              <CardTitle>Envie uma Mensagem</CardTitle>
              <CardDescription>
                Preencha o formulário abaixo para entrar em contato com nossa equipe de nutrição
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input
                    value={contactForm.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Seu nome completo"
                    className="focus:border-primary-400"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="seu@email.com"
                    className="focus:border-primary-400"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Assunto</Label>
                <Select
                  value={contactForm.subject}
                  onValueChange={(value) => handleInputChange("subject", value)}
                >
                  <SelectTrigger className="focus:border-primary-400">
                    <SelectValue placeholder="Selecione um assunto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="support">Suporte e Ajuda</SelectItem>
                    <SelectItem value="suggestion">Sugestão de Melhoria</SelectItem>
                    <SelectItem value="nutrition">Consultoria Nutricional</SelectItem>
                    <SelectItem value="bug">Reportar um Problema</SelectItem>
                    <SelectItem value="other">Outro Assunto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Mensagem</Label>
                <Textarea
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Digite sua mensagem detalhada aqui..."
                  className="focus:border-primary-400"
                />
              </div>
              
              <div className="pt-2">
                <Button
                  onClick={handleSubmit}
                  disabled={isPending}
                  className="w-full md:w-auto px-8"
                  size="lg"
                >
                  {isPending ? 
                    <span className="flex items-center">
                      <i className="ri-loader-4-line animate-spin mr-2"></i> Enviando...
                    </span> : 
                    <span className="flex items-center">
                      <i className="ri-send-plane-fill mr-2"></i> Enviar Mensagem
                    </span>
                  }
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Tab de Perguntas Frequentes */}
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
              <CardDescription>
                Encontre respostas para as perguntas mais comuns sobre nutrição e o uso do NutriTrack
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors">
                <h3 className="font-semibold text-primary-700 flex items-center">
                  <i className="ri-question-line mr-2 text-primary-500"></i>
                  Como posso personalizar minhas metas nutricionais?
                </h3>
                <div className="mt-2 pl-6 text-slate-700">
                  Você pode personalizar suas metas nutricionais acessando a seção de Perfil, onde poderá configurar seus objetivos de calorias e macronutrientes com base na sua idade, peso, altura e nível de atividade.
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors">
                <h3 className="font-semibold text-primary-700 flex items-center">
                  <i className="ri-question-line mr-2 text-primary-500"></i>
                  Posso adicionar meus próprios alimentos ao banco de dados?
                </h3>
                <div className="mt-2 pl-6 text-slate-700">
                  Sim, você pode adicionar alimentos personalizados durante o registro de uma refeição, preenchendo todos os valores nutricionais manualmente ou escolhendo entre os alimentos pré-cadastrados.
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors">
                <h3 className="font-semibold text-primary-700 flex items-center">
                  <i className="ri-question-line mr-2 text-primary-500"></i>
                  Como exportar meus dados nutricionais?
                </h3>
                <div className="mt-2 pl-6 text-slate-700">
                  Atualmente, você pode visualizar seus dados na página de Relatórios. A funcionalidade de exportação está sendo desenvolvida e em breve estará disponível para exportar em PDF ou CSV.
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-lg p-4 hover:bg-slate-100 transition-colors">
                <h3 className="font-semibold text-primary-700 flex items-center">
                  <i className="ri-question-line mr-2 text-primary-500"></i>
                  Posso configurar lembretes para registrar minhas refeições?
                </h3>
                <div className="mt-2 pl-6 text-slate-700">
                  Sim, na área de Perfil você pode configurar lembretes para registrar suas refeições em horários específicos. As notificações serão enviadas para ajudá-lo a manter o registro consistente.
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-slate-600 mb-4">Não encontrou a resposta que procurava?</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    const tabs = document.querySelector('[role="tablist"]');
                    if (tabs) {
                      const messageTab = tabs.children[0] as HTMLElement;
                      if (messageTab) messageTab.click();
                    }
                  }}
                >
                  <i className="ri-message-3-line mr-2"></i> Envie sua pergunta
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
