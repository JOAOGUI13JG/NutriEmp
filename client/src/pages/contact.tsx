import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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
      <PageHeader title="Fale Conosco" />
      
      <Card>
        <CardContent className="p-6">
          <p className="text-slate-600 mb-6">
            Tem dúvidas, sugestões ou precisa de ajuda? Entre em contato conosco através de um dos canais abaixo:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="https://wa.me/5511999999999" className="flex flex-col items-center p-6 border border-slate-200 rounded-lg hover:bg-slate-50">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3">
                <i className="ri-whatsapp-line text-2xl"></i>
              </div>
              <h3 className="font-medium mb-1">WhatsApp</h3>
              <p className="text-sm text-slate-500">Resposta rápida</p>
            </a>
            
            <a href="https://instagram.com/nutritrack" className="flex flex-col items-center p-6 border border-slate-200 rounded-lg hover:bg-slate-50">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-3">
                <i className="ri-instagram-line text-2xl"></i>
              </div>
              <h3 className="font-medium mb-1">Instagram</h3>
              <p className="text-sm text-slate-500">@nutritrack</p>
            </a>
            
            <a href="mailto:contato@nutritrack.com" className="flex flex-col items-center p-6 border border-slate-200 rounded-lg hover:bg-slate-50">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
                <i className="ri-mail-line text-2xl"></i>
              </div>
              <h3 className="font-medium mb-1">Email</h3>
              <p className="text-sm text-slate-500">contato@nutritrack.com</p>
            </a>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Envie uma Mensagem</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label>Nome</Label>
            <Input
              value={contactForm.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Seu nome"
            />
          </div>
          
          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              type="email"
              value={contactForm.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="seu@email.com"
            />
          </div>
          
          <div className="space-y-1">
            <Label>Assunto</Label>
            <Select
              value={contactForm.subject}
              onValueChange={(value) => handleInputChange("subject", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um assunto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="support">Suporte</SelectItem>
                <SelectItem value="suggestion">Sugestão</SelectItem>
                <SelectItem value="bug">Reportar um problema</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1">
            <Label>Mensagem</Label>
            <Textarea
              rows={4}
              value={contactForm.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Digite sua mensagem aqui..."
            />
          </div>
          
          <div>
            <Button
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? "Enviando..." : "Enviar Mensagem"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>FAQ - Perguntas Frequentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="border border-slate-200 rounded-lg">
            <button className="flex justify-between items-center w-full p-4 text-left">
              <span className="font-medium">Como posso personalizar minhas metas nutricionais?</span>
              <i className="ri-arrow-down-s-line"></i>
            </button>
            <div className="px-4 pb-4 text-slate-600">
              Você pode personalizar suas metas nutricionais acessando a seção de Perfil, onde poderá configurar seus objetivos de calorias e macronutrientes.
            </div>
          </div>
          
          <div className="border border-slate-200 rounded-lg">
            <button className="flex justify-between items-center w-full p-4 text-left">
              <span className="font-medium">Posso adicionar meus próprios alimentos ao banco de dados?</span>
              <i className="ri-arrow-down-s-line"></i>
            </button>
            <div className="hidden px-4 pb-4 text-slate-600">
              Sim, você pode adicionar alimentos personalizados durante o registro de uma refeição, preenchendo todos os valores nutricionais manualmente.
            </div>
          </div>
          
          <div className="border border-slate-200 rounded-lg">
            <button className="flex justify-between items-center w-full p-4 text-left">
              <span className="font-medium">Como exportar meus dados nutricionais?</span>
              <i className="ri-arrow-down-s-line"></i>
            </button>
            <div className="hidden px-4 pb-4 text-slate-600">
              Atualmente, não oferecemos a opção de exportação de dados, mas estamos trabalhando para implementar esta funcionalidade em breve.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
