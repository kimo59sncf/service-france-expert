import { Link } from "wouter";
import { ArrowRight, FileText, Landmark, ShieldCheck, ChevronRight, HeartHandshake, Briefcase, Mail, Phone, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useListServices, useListBlogPosts, useSubscribeNewsletter } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function Home() {
  const { data: services, isLoading: servicesLoading } = useListServices();
  const { data: blogPosts, isLoading: blogLoading } = useListBlogPosts();
  const subscribeNewsletter = useSubscribeNewsletter();
  const { toast } = useToast();

  const [email, setEmail] = useState("");

  const featuredServices = services?.filter(s => s.featured).slice(0, 3) || services?.slice(0, 3) || [];
  const recentPosts = blogPosts?.slice(0, 3) || [];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    subscribeNewsletter.mutate(
      { data: { email } },
      {
        onSuccess: () => {
          toast({
            title: "Inscription réussie",
            description: "Vous êtes maintenant inscrit à notre newsletter.",
          });
          setEmail("");
        },
        onError: () => {
          toast({
            title: "Erreur",
            description: "Une erreur est survenue lors de l'inscription.",
            variant: "destructive",
          });
        }
      }
    );
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.png" 
            alt="Parisian office interior" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white w-full">
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium tracking-wide uppercase mb-6 text-red-400">
              Cabinet d'accompagnement premium
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold leading-tight mb-8">
              Un accompagnement expert pour vos démarches administratives en France.
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed font-light">
              Nous vous aidons à préparer et constituer vos dossiers de titre de séjour auprès des préfectures, avec rigueur et transparence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/consultation">
                <Button size="lg" className="w-full sm:w-auto text-base h-14 px-8 bg-accent hover:bg-accent/90 text-white rounded-sm shadow-xl shadow-accent/20">
                  Réserver une consultation
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-14 px-8 bg-white/10 hover:bg-white/20 text-white border-white/30 rounded-sm backdrop-blur-sm">
                  Découvrir nos services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modes de consultation */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 bg-primary/5 rounded-sm flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-primary">Consultation par téléphone</p>
                <p className="text-sm text-muted-foreground">Échangez directement avec un conseiller expert</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 bg-primary/5 rounded-sm flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-bold text-primary">Suivi par email</p>
                <p className="text-sm text-muted-foreground">Compte rendu et échanges écrits sécurisés</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 bg-primary/5 rounded-sm flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="font-bold text-primary">Suivi SMS & téléphone</p>
                <p className="text-sm text-muted-foreground">Notifications et mises à jour tout au long de la procédure</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              L'exigence comme norme
            </h2>
            <p className="text-lg text-muted-foreground">
              Notre cabinet repose sur des fondations solides pour vous garantir le meilleur accompagnement possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-6">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Expertise Juridique</h3>
              <p className="text-muted-foreground leading-relaxed">
                Une veille juridique permanente et une parfaite maîtrise des textes réglementaires régissant le droit des étrangers.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Transparence Totale</h3>
              <p className="text-muted-foreground leading-relaxed">
                Des tarifs clairs, des délais annoncés et une évaluation honnête de vos chances de succès dès le premier rendez-vous.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mb-6">
                <HeartHandshake className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Approche Humaine</h3>
              <p className="text-muted-foreground leading-relaxed">
                Au-delà de la technique, nous comprenons les enjeux personnels de chaque dossier et vous accompagnons avec bienveillance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Une expertise pointue pour chaque situation
            </h2>
            <p className="text-lg text-muted-foreground">
              Que vous soyez étudiant, professionnel, investisseur ou que vous souhaitiez rejoindre votre famille, nous vous accompagnons sur mesure.
            </p>
          </div>

          {servicesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-8 rounded-sm border border-border">
                  <Skeleton className="w-12 h-12 mb-6" />
                  <Skeleton className="h-6 w-3/4 mb-4" />
                  <Skeleton className="h-20 w-full mb-6" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredServices.map(service => (
                <div key={service.id} className="bg-white p-8 rounded-sm border border-border hover:shadow-lg transition-shadow group flex flex-col h-full">
                  <div className="w-12 h-12 bg-primary/5 rounded-sm flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-8 flex-1">
                    {service.description}
                  </p>
                  <Link href={`/rendez-vous?service=${service.id}`} className="mt-auto">
                    <Button variant="outline" className="w-full justify-between group-hover:border-primary group-hover:text-primary transition-colors">
                      Prendre rendez-vous
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <Link href="/services">
              <Button variant="ghost" className="text-primary font-medium hover:text-accent">
                Voir tous nos services d'accompagnement
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10">
          <Landmark className="w-96 h-96" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Notre méthodologie
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Un processus rigoureux et transparent pour garantir le succès de vos démarches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="text-6xl font-serif font-bold text-white/10 absolute -top-6 -left-4">01</div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-3">Diagnostic</h3>
                <p className="text-primary-foreground/70">Analyse approfondie de votre situation personnelle et de votre éligibilité.</p>
              </div>
            </div>
            <div className="relative">
              <div className="text-6xl font-serif font-bold text-white/10 absolute -top-6 -left-4">02</div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-3">Stratégie</h3>
                <p className="text-primary-foreground/70">Définition de la procédure la plus adaptée et liste précise des pièces requises.</p>
              </div>
            </div>
            <div className="relative">
              <div className="text-6xl font-serif font-bold text-white/10 absolute -top-6 -left-4">03</div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-3">Constitution</h3>
                <p className="text-primary-foreground/70">Vérification, traduction et assemblage de votre dossier de manière exhaustive.</p>
              </div>
            </div>
            <div className="relative">
              <div className="text-6xl font-serif font-bold text-white/10 absolute -top-6 -left-4">04</div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white mb-3">Suivi</h3>
                <p className="text-primary-foreground/70">Dépôt et communication avec l'administration jusqu'à l'obtention de votre titre.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos engagements */}
      <section className="py-24 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Nos engagements envers vous
            </h2>
            <p className="text-lg text-muted-foreground">
              Service France Expert est un cabinet d'accompagnement administratif. Voici ce que vous pouvez attendre de nous.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-5 p-6 bg-muted/30 rounded-sm border border-border">
              <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-primary mb-2">Analyse honnête de votre situation</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Nous vous informons clairement des démarches possibles selon votre situation réelle, sans promettre de résultats que nous ne pouvons garantir. La décision finale appartient toujours à l'administration.
                </p>
              </div>
            </div>
            <div className="flex gap-5 p-6 bg-muted/30 rounded-sm border border-border">
              <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center shrink-0 mt-0.5">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-primary mb-2">Dossier complet et conforme</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Nous vérifions chaque pièce justificative avant le dépôt pour limiter les risques de dossier incomplet ou non conforme aux exigences de la préfecture.
                </p>
              </div>
            </div>
            <div className="flex gap-5 p-6 bg-muted/30 rounded-sm border border-border">
              <div className="w-10 h-10 bg-primary/10 rounded-sm flex items-center justify-center shrink-0 mt-0.5">
                <HeartHandshake className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-primary mb-2">Accompagnement à chaque étape</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Nous restons présents tout au long de la procédure : suivi du dossier, relances administratives, réponses à vos questions et orientation vers les bons interlocuteurs.
                </p>
              </div>
            </div>
            <div className="flex gap-5 p-6 bg-muted/30 rounded-sm border border-border">
              <div className="w-10 h-10 bg-accent/10 rounded-sm flex items-center justify-center shrink-0 mt-0.5">
                <AlertCircle className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-primary mb-2">Transparence sur nos limites</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Nous sommes un cabinet d'accompagnement administratif, pas un cabinet d'avocats. Lorsque votre situation nécessite une représentation juridique, nous vous orientons vers un professionnel habilité.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                Actualités & Guides
              </h2>
              <p className="text-lg text-muted-foreground">
                Dernières informations réglementaires et conseils pratiques.
              </p>
            </div>
            <Link href="/blog" className="hidden md:inline-flex items-center text-primary font-medium hover:text-accent">
              Voir tous les articles
              <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          {blogLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-sm border border-border overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-16 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <article className="bg-white rounded-sm border border-border overflow-hidden group hover:shadow-lg transition-all h-full flex flex-col cursor-pointer">
                    {post.imageUrl ? (
                      <div className="h-48 overflow-hidden relative">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground/30 font-serif text-2xl font-bold">SF</span>
                      </div>
                    )}
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent mb-3">
                        {post.category}
                      </span>
                      <h3 className="text-lg font-bold text-primary mb-3 leading-tight group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="text-xs text-muted-foreground mt-auto">
                        {format(new Date(post.publishedAt), 'd MMMM yyyy', { locale: fr })}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link href="/blog">
              <Button variant="ghost" className="text-primary font-medium hover:text-accent">
                Voir tous les articles
                <ChevronRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary text-primary-foreground border-t border-primary-border/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="w-12 h-12 mx-auto mb-6 text-accent" />
          <h2 className="text-3xl font-serif font-bold mb-4">
            Restez informé
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Abonnez-vous à notre newsletter pour recevoir les dernières actualités sur le droit des étrangers, les évolutions réglementaires et nos conseils.
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3">
            <Input 
              type="email" 
              placeholder="Votre adresse email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-accent"
            />
            <Button 
              type="submit" 
              className="h-12 bg-accent hover:bg-accent/90 text-white shrink-0 px-8"
              disabled={subscribeNewsletter.isPending}
            >
              {subscribeNewsletter.isPending ? "Inscription..." : "S'abonner"}
            </Button>
          </form>
          <p className="text-xs text-primary-foreground/50 mt-4">
            Nous respectons votre vie privée. Vous pourrez vous désabonner à tout moment.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-muted/30 rounded-sm border border-border p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                Ne restez pas bloqué dans vos démarches
              </h2>
              <p className="text-lg text-muted-foreground">
                L'administration française est complexe, mais vous n'avez pas à l'affronter seul. Obtenez une évaluation claire de votre situation dès aujourd'hui.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link href="/consultation">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white w-full sm:w-auto h-12 px-8">
                  Faire analyser mon dossier
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8">
                  Être rappelé
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
