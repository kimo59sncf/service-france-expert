import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, Phone } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Consultation", href: "/consultation" },
    { name: "FAQ", href: "/faq" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-3 group">
              <img
                src="/logo-sfe.png"
                alt="Service France Expert"
                className="h-12 w-12 object-contain"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-serif font-bold text-lg text-primary leading-tight group-hover:text-accent transition-colors">
                  Service France Expert
                </span>
                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">
                  Assistance Administrative
                </span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center justify-end space-x-8">
            <div className="flex space-x-6">
              {navigation.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${
                      isActive 
                        ? "text-accent border-b-2 border-accent" 
                        : "text-foreground hover:text-accent border-b-2 border-transparent"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center text-sm font-medium text-muted-foreground">
                <Phone className="w-4 h-4 mr-2" />
                <span>01 40 00 00 00</span>
              </div>
              <Link href="/rendez-vous" className="inline-flex">
                <Button className="bg-accent hover:bg-accent/90 text-white rounded-sm font-medium transition-all shadow-sm">
                  Prendre rendez-vous
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border animate-in slide-in-from-top-2 duration-200">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive
                      ? "bg-accent/5 border-accent text-accent"
                      : "border-transparent text-foreground hover:bg-muted hover:border-muted-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div className="pt-4 pb-6 border-t border-border px-4 space-y-4">
            <div className="flex items-center text-sm font-medium text-muted-foreground">
              <Phone className="w-4 h-4 mr-2" />
              <span>01 40 00 00 00</span>
            </div>
            <Link href="/rendez-vous" onClick={() => setIsOpen(false)} className="block w-full">
              <Button className="w-full bg-accent hover:bg-accent/90 text-white rounded-sm font-medium shadow-sm justify-center">
                Prendre rendez-vous
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
