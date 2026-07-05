import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Seo } from "@/components/seo";

const formSchema = z.object({
  fullName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  subject: z.string().min(5, "Sujet requis"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
  callbackRequested: z.boolean().default(false),
  preferredTime: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
  const { toast } = useToast();
  const submitContact = useSubmitContact();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      callbackRequested: false,
      preferredTime: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    submitContact.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: "Demande envoyée",
            description: "Nous avons bien reçu votre message. Notre équipe vous contactera dans les plus brefs délais.",
          });
          form.reset();
        },
        onError: () => {
          toast({
            title: "Erreur",
            description: "Une erreur est survenue lors de l'envoi. Veuillez réessayer ultérieurement.",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <div className="pt-8 pb-24">
      <Seo
        title="Contact expert administratif"
        description="Contactez Service France Expert pour un accompagnement fiable des démarches administratives en France, avec prise de rendez-vous rapide."
        path="/contact"
        type="localBusiness"
      />
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Contactez-nous
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-light leading-relaxed">
            Notre équipe d'experts est à votre écoute pour répondre à vos questions et vous orienter vers la solution adaptée.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">Nos Coordonnées</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center shrink-0 mr-4">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Cabinet de lille  </h3>
                    <p className="text-muted-foreground text-sm">
                      89 rue de la plaine<br />
                      59000 Lille, France
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center shrink-0 mr-4">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Téléphone</h3>
                    <p className="text-muted-foreground text-sm">
                      +33 (0)1 87 66 68 79
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center shrink-0 mr-4">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Email</h3>
                    <p className="text-muted-foreground text-sm">
                      contact@servicefranceexpert.fr
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center shrink-0 mr-4">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Horaires d'ouverture</h3>
                    <p className="text-muted-foreground text-sm">
                      Lundi - Vendredi: 09:00 - 18:00<br />
                      Sur rendez-vous uniquement
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/40 p-6 rounded-sm border border-border">
              <h3 className="font-semibold text-primary mb-2">Service d'Urgence</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Pour toute urgence (OQTF, placement en rétention), une ligne dédiée est disponible pour nos clients.
              </p>
              <p className="text-sm font-medium text-accent">
                Urgences : +33 (0)7 63 34 93 11
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 rounded-sm border border-border shadow-sm">
              <h2 className="text-2xl font-serif font-bold text-primary mb-6">Envoyez-nous un message</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom complet</FormLabel>
                          <FormControl>
                            <Input placeholder="Jean Dupont" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="jean.dupont@email.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sujet de votre demande</FormLabel>
                          <FormControl>
                            <Input placeholder="Titre de séjour, Naturalisation..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Votre message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Décrivez votre situation et vos besoins de manière détaillée..." 
                            className="min-h-[150px] resize-y"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-muted/30 p-4 rounded-sm border border-border space-y-4">
                    <FormField
                      control={form.control}
                      name="callbackRequested"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="font-medium cursor-pointer">
                              Je souhaite être rappelé(e) par téléphone
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    {form.watch("callbackRequested") && (
                      <FormField
                        control={form.control}
                        name="preferredTime"
                        render={({ field }) => (
                          <FormItem className="animate-in fade-in slide-in-from-top-2">
                            <FormLabel>Plage horaire de préférence</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Plutôt le matin entre 9h et 11h" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white text-base"
                    disabled={submitContact.isPending}
                  >
                    {submitContact.isPending ? "Envoi en cours..." : (
                      <>
                        Envoyer ma demande
                        <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    En soumettant ce formulaire, vous acceptez que vos données soient traitées dans le cadre de votre demande de contact.
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
