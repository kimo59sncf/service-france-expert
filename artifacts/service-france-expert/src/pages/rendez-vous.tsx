import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { staticServices } from "@/data/static-data";
import { useLocation } from "wouter";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Clock, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Seo } from "@/components/seo";

const formSchema = z.object({
  fullName: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Téléphone requis"),
  consultationType: z.string().min(1, "Veuillez sélectionner un motif"),
  appointmentType: z.literal("telephone"),
  preferredDate: z.date({
    required_error: "Veuillez sélectionner une date",
  }),
  preferredTime: z.string().optional(),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function RendezVous() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const services = staticServices;

  const urlParams = new URLSearchParams(window.location.search);
  const serviceIdParam = urlParams.get('service');
  
  const selectedService = services.find(s => s.id.toString() === serviceIdParam);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      consultationType: selectedService?.title || "",
      appointmentType: "telephone",
      description: "",
    },
  });

  const [isPending, setIsPending] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setIsPending(true);
    toast({
      title: "Demande de rendez-vous enregistrée",
      description: "Nous vous contacterons très rapidement pour confirmer l'horaire.",
    });
    setIsPending(false);
    setLocation("/");
  };

  const timeslots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  return (
    <div className="min-h-screen bg-muted/20 pb-24">
      <Seo
        title="Prendre rendez-vous"
        description="Réservez un rendez-vous téléphonique avec Service France Expert pour un accompagnement administratif local et efficace."
        path="/rendez-vous"
        type="localBusiness"
      />
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Prendre rendez-vous
          </h1>
          <p className="text-lg text-primary-foreground/80 font-light">
            Planifiez un échange avec l'un de nos conseillers experts.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-sm shadow-xl border border-border p-8 md:p-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              
              {/* Info consultation téléphonique */}
              <div className="flex items-start gap-4 p-5 bg-primary/5 border border-primary/20 rounded-sm">
                <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-sm shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-primary">Consultation par téléphone</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Toutes nos consultations se déroulent par téléphone. Un conseiller vous appellera au numéro indiqué, à la date et l'heure choisies. Le suivi de votre dossier s'effectue ensuite par email, SMS et téléphone.
                  </p>
                </div>
              </div>

              {/* Motif */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-serif font-bold text-primary border-b border-border pb-2 mb-6">1. Motif de la consultation</h2>
                </div>
                
                <FormField
                  control={form.control}
                  name="consultationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pour quel sujet souhaitez-vous nous consulter ?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value || selectedService?.title}>
                        <FormControl>
                          <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="Sélectionnez un motif principal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services?.map(service => (
                            <SelectItem key={service.id} value={service.title}>{service.title}</SelectItem>
                          ))}
                          <SelectItem value="Autre demande">Autre demande spécifique</SelectItem>
                          <SelectItem value="Premier diagnostic">Premier diagnostic général</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Précisions supplémentaires (optionnel)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Si vous le souhaitez, décrivez brièvement le contexte..." 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Date & Heure */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-serif font-bold text-primary border-b border-border pb-2 mb-6">2. Date & Horaires</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="preferredDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date souhaitée</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full h-12 pl-3 text-left font-normal border-border",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "EEEE d MMMM yyyy", { locale: fr })
                                ) : (
                                  <span>Choisir une date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() || date.getDay() === 0 || date.getDay() === 6 // Disable past dates and weekends
                              }
                              initialFocus
                              locale={fr}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Heure de préférence</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 border-border">
                              <SelectValue placeholder="Sélectionnez un horaire" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <div className="grid grid-cols-2 gap-2 p-2">
                              {timeslots.map(time => (
                                <SelectItem key={time} value={time} className="justify-center cursor-pointer">
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-3 h-3 text-muted-foreground" />
                                    <span>{time}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </div>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Coordonnées */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-serif font-bold text-primary border-b border-border pb-2 mb-6">3. Vos coordonnées</h2>
                </div>
                
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom et prénom</FormLabel>
                      <FormControl>
                        <Input placeholder="Jean Dupont" className="h-12" {...field} />
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
                          <Input placeholder="jean.dupont@email.com" type="email" className="h-12" {...field} />
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
                          <Input placeholder="+33 6 00 00 00 00" className="h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="pt-8 border-t border-border mt-8 flex justify-end">
                <Button 
                  type="submit" 
                  size="lg"
                  className="bg-accent text-white hover:bg-accent/90 px-10 h-14 text-lg w-full md:w-auto"
                  disabled={isPending}
                >
                  {isPending ? "Traitement..." : "Confirmer le rendez-vous"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
