import { Link } from "wouter";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 border-t border-primary-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm">
                <span className="text-primary font-serif font-bold text-xl leading-none">SF</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-semibold text-lg text-white leading-tight">
                  Service France
                </span>
                <span className="text-xs font-medium text-white/70 uppercase tracking-wider">
                  Expert
                </span>
              </div>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Votre expert en accompagnement administratif pour réussir vos démarches en France. Nous vous guidons pas à pas avec expertise et bienveillance.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Liens rapides</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link href="/" className="hover:text-accent transition-colors">Accueil</Link></li>
              <li><Link href="/services" className="hover:text-accent transition-colors">Nos Services</Link></li>
              <li><Link href="/consultation" className="hover:text-accent transition-colors">Obtenir une consultation</Link></li>
              <li><Link href="/rendez-vous" className="hover:text-accent transition-colors">Prendre rendez-vous</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Ressources</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><Link href="/faq" className="hover:text-accent transition-colors">Questions fréquentes (FAQ)</Link></li>
              <li><Link href="/blog" className="hover:text-accent transition-colors">Guides et actualités</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contactez-nous</Link></li>
              <li><Link href="/mentions-legales" className="hover:text-accent transition-colors">Mentions légales</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">Contact</h3>
            <ul className="space-y-4 text-sm text-primary-foreground/70">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-accent shrink-0 mt-0.5" />
                <span>
                  12 Avenue des Champs-Élysées<br />
                  75008 Paris, France
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-accent shrink-0" />
                <span>+33 (0)1 40 00 00 00</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-accent shrink-0" />
                <span>contact@servicefranceexpert.fr</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/50">
            &copy; {new Date().getFullYear()} Service France Expert. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/50">
            <Link href="/confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link>
            <Link href="/cgv" className="hover:text-white transition-colors">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
