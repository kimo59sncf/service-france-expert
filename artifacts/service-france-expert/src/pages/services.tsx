import { useListServices } from "@workspace/api-client-react";
import { Link } from "wouter";
import { FileText, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Seo } from "@/components/seo";

export default function Services() {
  const { data: services, isLoading } = useListServices();

  const categories = services 
    ? Array.from(new Set(services.map(s => s.category)))
    : [];

  return (
    <div className="pt-8 pb-24">
      <Seo
        title="Services d'accompagnement administratif"
        description="Découvrez les services premium de Service France Expert pour les démarches administratives, titres de séjour et suivis de dossier."
        path="/services"
        type="localBusiness"
      />
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Nos Services d'Accompagnement
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto font-light leading-relaxed">
            Une expertise sur-mesure pour chaque étape de votre vie en France. Nous prenons en charge la complexité administrative pour vous.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {isLoading ? (
          <div className="space-y-16">
            {[1, 2].map(categoryIdx => (
              <div key={categoryIdx}>
                <Skeleton className="h-10 w-64 mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map(itemIdx => (
                    <div key={itemIdx} className="bg-white p-8 rounded-sm border border-border">
                      <Skeleton className="w-12 h-12 mb-6" />
                      <Skeleton className="h-6 w-3/4 mb-4" />
                      <Skeleton className="h-20 w-full mb-6" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-20">
            {categories.map(category => (
              <div key={category}>
                <h2 className="text-3xl font-serif font-bold text-primary mb-8 pb-4 border-b border-border">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services?.filter(s => s.category === category).map(service => (
                    <div key={service.id} className="bg-white p-8 rounded-sm border border-border hover:shadow-lg transition-shadow group flex flex-col h-full relative overflow-hidden">
                      {service.featured && (
                        <div className="absolute top-4 right-4 bg-accent/10 text-accent px-3 py-1 text-xs font-semibold rounded-sm">
                          Populaire
                        </div>
                      )}
                      
                      <div className="w-12 h-12 bg-primary/5 rounded-sm flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                        <FileText className="w-6 h-6" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                      <p className="text-muted-foreground mb-8 flex-1 leading-relaxed">
                        {service.description}
                      </p>
                      
                      {(service.price || service.duration) && (
                        <div className="flex flex-col gap-2 mb-8 p-4 bg-muted/50 rounded-sm">
                          {service.price && (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Tarif indicatif</span>
                              <span className="font-semibold text-foreground">{service.price}</span>
                            </div>
                          )}
                          {service.duration && (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Délai estimé</span>
                              <span className="font-medium text-foreground">{service.duration}</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="mt-auto">
                        <Link href={`/rendez-vous?service=${service.id}`}>
                          <Button className="w-full justify-between group-hover:bg-primary group-hover:text-white transition-colors">
                            Sélectionner ce service
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Trust guarantees */}
      <section className="mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary text-primary-foreground rounded-sm p-12 lg:p-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Expertise Juridique</h3>
              <p className="text-primary-foreground/70 leading-relaxed">
                Nos conseillers maîtrisent les subtilités du droit des étrangers et de l'administration.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Gain de Temps</h3>
              <p className="text-primary-foreground/70 leading-relaxed">
                Évitez les allers-retours inutiles et les dossiers rejetés pour pièces manquantes.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sérénité Garantie</h3>
              <p className="text-primary-foreground/70 leading-relaxed">
                Un interlocuteur unique vous accompagne jusqu'à l'aboutissement de votre démarche.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
