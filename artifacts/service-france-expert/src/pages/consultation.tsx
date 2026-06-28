import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSubmitConsultation } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, ChevronRight, ChevronLeft, ShieldCheck } from "lucide-react";

const STEPS = 3;

const formSchema = z.object({
  // Step 1
  fullName: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Téléphone requis"),
  nationality: z.string().min(2, "Nationalité requise"),
  
  // Step 2
  situationType: z.string().min(1, "Veuillez sélectionner un type de situation"),
  currentTitle: z.string().optional(),
  arrivalDate: z.string().optional(),
  
  // Step 3
  description: z.string().min(10, "Veuillez détailler votre situation"),
  urgency: z.enum(["normal", "urgent", "very_urgent"]).default("normal"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Consultation() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const submitConsultation = useSubmitConsultation();
  const [step, setStep] = useState(1);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      nationality: "",
      situationType: "",
      currentTitle: "",
      arrivalDate: "",
      description: "",
      urgency: "normal",
    },
    mode: "onChange",
  });

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ["fullName", "email", "phone", "nationality"];
    if (step === 2) fieldsToValidate = ["situationType", "currentTitle", "arrivalDate"];

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setStep(s => Math.min(s + 1, STEPS));
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(s => Math.max(s - 1, 1));
    window.scrollTo(0, 0);
  };

  const onSubmit = (data: FormValues) => {
    submitConsultation.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: "Dossier soumis avec succès",
            description: "Un conseiller va étudier votre situation et vous recontacter très rapidement.",
          });
          form.reset();
          setLocation("/");
        },
        onError: () => {
          toast({
            title: "Erreur",
            description: "Une erreur est survenue. Veuillez réessayer.",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-muted/20 pb-24">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Demande d'analyse de dossier
          </h1>
          <p className="text-lg text-primary-foreground/80 font-light">
            Confiez-nous les détails de votre situation. Notre équipe d'experts l'analysera pour vous proposer la stratégie la plus adaptée.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-sm shadow-xl border border-border overflow-hidden">
          
          {/* Progress Bar */}
          <div className="bg-muted/30 border-b border-border p-6">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border z-0"></div>
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-accent transition-all duration-300 z-0"
                style={{ width: `${((step - 1) / (STEPS - 1)) * 100}%` }}
              ></div>
              
              {[1, 2, 3].map(i => (
                <div key={i} className="relative z-10 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 ${
                    step === i 
                      ? "bg-accent border-accent text-white" 
                      : step > i 
                        ? "bg-primary border-primary text-white"
                        : "bg-white border-border text-muted-foreground"
                  }`}>
                    {step > i ? <CheckCircle2 className="w-5 h-5" /> : i}
                  </div>
                  <span className={`text-xs mt-2 font-medium ${step >= i ? "text-primary" : "text-muted-foreground"}`}>
                    {i === 1 && "Identité"}
                    {i === 2 && "Situation"}
                    {i === 3 && "Détails"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 md:p-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* STEP 1: Personal Info */}
                {step === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="mb-8">
                      <h2 className="text-2xl font-serif font-bold text-primary mb-2">Informations personnelles</h2>
                      <p className="text-muted-foreground">Ces informations nous permettront de vous recontacter.</p>
                    </div>

                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom et prénom</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Jean Dupont" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: jean@email.com" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Téléphone</FormLabel>
                            <FormControl>
                              <Input placeholder="+33 6 00 00 00 00" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="nationality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nationalité actuelle</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Marocaine, Américaine..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* STEP 2: Situation */}
                {step === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="mb-8">
                      <h2 className="text-2xl font-serif font-bold text-primary mb-2">Votre situation en France</h2>
                      <p className="text-muted-foreground">Sélectionnez le contexte de votre demande.</p>
                    </div>

                    <FormField
                      control={form.control}
                      name="situationType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nature de la demande</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez une option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="premiere_demande">Première demande de titre de séjour</SelectItem>
                              <SelectItem value="renouvellement">Renouvellement de titre de séjour</SelectItem>
                              <SelectItem value="changement_statut">Changement de statut</SelectItem>
                              <SelectItem value="naturalisation">Demande de naturalisation</SelectItem>
                              <SelectItem value="regroupement">Regroupement familial</SelectItem>
                              <SelectItem value="regularisation">Régularisation / Admission exceptionnelle</SelectItem>
                              <SelectItem value="recours">Recours (OQTF, refus, etc.)</SelectItem>
                              <SelectItem value="autre">Autre situation</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="currentTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre de séjour actuel (le cas échéant)</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: VLS-TS Etudiant, Carte pluriannuelle Passeport Talent..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="arrivalDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date d'arrivée en France (approximative)</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Septembre 2019" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* STEP 3: Details & Urgency */}
                {step === 3 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="mb-8">
                      <h2 className="text-2xl font-serif font-bold text-primary mb-2">Détails de la demande</h2>
                      <p className="text-muted-foreground">Expliquez-nous votre besoin plus en détail.</p>
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description de votre situation</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Soyez le plus précis possible (dates importantes, diplômes, contrats de travail, situation familiale...)" 
                              className="min-h-[150px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="urgency"
                      render={({ field }) => (
                        <FormItem className="space-y-3 border border-border p-4 rounded-sm bg-muted/20">
                          <FormLabel className="text-base font-semibold text-primary">Degré d'urgence</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-2"
                            >
                              <div className="flex items-center space-x-3">
                                <RadioGroupItem value="normal" id="normal" />
                                <Label htmlFor="normal" className="font-normal cursor-pointer">Normal (Démarche d'anticipation)</Label>
                              </div>
                              <div className="flex items-center space-x-3">
                                <RadioGroupItem value="urgent" id="urgent" />
                                <Label htmlFor="urgent" className="font-normal cursor-pointer">Urgent (Échéance dans moins d'un mois)</Label>
                              </div>
                              <div className="flex items-center space-x-3">
                                <RadioGroupItem value="very_urgent" id="very_urgent" />
                                <Label htmlFor="very_urgent" className="font-normal text-destructive cursor-pointer flex items-center">
                                  <AlertCircle className="w-4 h-4 mr-1" />
                                  Très urgent (OQTF, Placement en rétention, Titre expiré)
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="bg-primary/5 p-4 rounded-sm flex items-start gap-3 mt-8 border border-primary/20">
                      <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-sm text-primary/80">
                        <strong>Confidentialité garantie.</strong> Toutes les informations transmises dans ce formulaire sont strictement confidentielles et couvertes par le secret professionnel.
                      </p>
                    </div>
                  </div>
                )}

                {/* Footer Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-border mt-8">
                  {step > 1 ? (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Précédent
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  
                  {step < STEPS ? (
                    <Button type="button" onClick={nextStep} className="bg-primary text-white hover:bg-primary/90">
                      Suivant
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      className="bg-accent text-white hover:bg-accent/90 px-8"
                      disabled={submitConsultation.isPending}
                    >
                      {submitConsultation.isPending ? "Envoi en cours..." : "Soumettre mon dossier"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
