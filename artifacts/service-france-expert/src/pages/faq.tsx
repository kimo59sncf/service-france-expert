import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { HelpCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { staticFaq } from "@/data/static-data";

export default function Faq() {
  const faqs = staticFaq;
  const isLoading = false;

  const categories = Array.isArray(faqs)
    ? Array.from(new Set(faqs.map((f) => f.category)))
    : [];

  return (
    <div className="pt-8 pb-24">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Questions Fréquentes
          </h1>
          <p className="text-xl text-primary-foreground/80 font-light leading-relaxed">
            Retrouvez les réponses aux questions les plus courantes sur nos
            services et l'administration française.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {isLoading ? (
          <div className="space-y-8">
            <Skeleton className="h-10 w-48 mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </div>
        ) : (
          <div className="space-y-16">
            {categories.map((category) => (
              <div key={category}>
                <h2 className="text-2xl font-serif font-bold text-primary mb-6 pb-2 border-b border-border">
                  {category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {(Array.isArray(faqs) ? faqs : [])
                    .filter((f) => f.category === category)
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .map((faq) => (
                      <AccordionItem
                        key={faq.id}
                        value={`faq-${faq.id}`}
                        className="border-b border-border"
                      >
                        <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary py-4 px-2 hover:bg-muted/30 rounded-sm transition-all data-[state=open]:text-primary">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground px-2 pb-4 pt-1 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Still need help */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-muted/40 rounded-sm border border-border p-10 text-center">
          <div className="flex justify-center mb-4">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-4">
            Vous n'avez pas trouvé votre réponse ?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos
            interrogations spécifiques.
          </p>
          <div className="flex justify-center gap-4 flex-col sm:flex-row">
            <Link href="/contact">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white"
              >
                Nous contacter
              </Button>
            </Link>
            <Link href="/consultation">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Demander une consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
