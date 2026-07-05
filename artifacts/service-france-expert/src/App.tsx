import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import { AdminAuthProvider } from "@/components/admin-auth";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import Services from "@/pages/services";
import Consultation from "@/pages/consultation";
import RendezVous from "@/pages/rendez-vous";
import Contact from "@/pages/contact";
import Faq from "@/pages/faq";
import BlogList from "@/pages/blog-list";
import BlogPost from "@/pages/blog-post";
import Admin from "@/pages/admin";
import Confidentialite from "@/pages/confidentialite";
import Cgv from "@/pages/cgv";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/consultation" component={Consultation} />
      <Route path="/rendez-vous" component={RendezVous} />
      <Route path="/contact" component={Contact} />
      <Route path="/faq" component={Faq} />
      <Route path="/blog" component={BlogList} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/admin" component={Admin} />
      <Route path="/confidentialite" component={Confidentialite} />
      <Route path="/cgv" component={Cgv} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AdminAuthProvider>
            <AppLayout>
              <Router />
            </AppLayout>
          </AdminAuthProvider>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
