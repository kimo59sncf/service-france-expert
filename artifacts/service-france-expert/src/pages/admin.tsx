import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Seo } from "@/components/seo";
import { LogOut } from "lucide-react";
import { useAdminAuth } from "@/components/admin-auth";
import { AdminLogin } from "@/components/admin-login";

interface Lead {
  id: number;
  source: string;
  type: string;
  fullName: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message?: string | null;
  status: string;
  priority: string;
  nextStep: string;
  notes: string;
  isClient: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
}

const statusOptions = [
  { value: "nouveau", label: "Nouveau" },
  { value: "en_cours", label: "En cours" },
  { value: "rdv_pris", label: "Rendez-vous pris" },
  { value: "client", label: "Client" },
  { value: "archive", label: "Archivé" },
];

const priorityOptions = [
  { value: "basse", label: "Basse" },
  { value: "moyenne", label: "Moyenne" },
  { value: "haute", label: "Haute" },
];

function AdminContent() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const { logout } = useAdminAuth();

  const fetchLeads = async () => {
    setLoading(true);
    const response = await fetch("/api/leads");
    const data = await response.json();
    setLeads(data);
    setLoading(false);
  };

  useEffect(() => {
    void fetchLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    if (filter === "all") return leads;
    return leads.filter((lead) => lead.status === filter);
  }, [filter, leads]);

  const updateLead = async (leadId: number, updates: Partial<Lead>) => {
    const response = await fetch(`/api/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (response.ok) {
      const updated = await response.json();
      setLeads((current) =>
        current.map((lead) => (lead.id === updated.id ? updated : lead)),
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <Seo
        title="Administration leads"
        description="Centre de suivi des leads, dossiers et clients pour l'accompagnement administratif local."
        path="/admin"
        type="localBusiness"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary">
              Back-office local
            </p>
            <h1 className="text-3xl font-serif font-bold text-primary">
              Pilotage des leads & dossiers
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Centralisez les demandes de contact, les consultations et les
              rendez-vous pour suivre chaque dossier jusqu'au statut client.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-muted-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les leads</SelectItem>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => void fetchLeads()}>
              Actualiser
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Leads actifs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {
                  leads.filter(
                    (lead) =>
                      lead.status !== "client" && lead.status !== "archive",
                  ).length
                }
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Clients convertis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">
                {leads.filter((lead) => lead.isClient).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Rendez-vous à confirmer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {leads.filter((lead) => lead.status === "rdv_pris").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {loading ? (
          <div className="rounded-lg border bg-white p-8 text-center text-muted-foreground">
            Chargement des leads…
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="rounded-lg border bg-white p-8 text-center text-muted-foreground">
            Aucun lead pour ce filtre.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <Card key={lead.id} className="bg-white">
                <CardContent className="p-6 space-y-4">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-semibold text-primary">
                          {lead.fullName}
                        </h2>
                        <Badge variant="secondary">{lead.source}</Badge>
                        <Badge variant="outline">{lead.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {lead.email}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {lead.phone ?? "Pas de téléphone"}
                      </p>
                      {lead.subject ? (
                        <p className="text-sm mt-2">Sujet : {lead.subject}</p>
                      ) : null}
                      {lead.message ? (
                        <p className="text-sm text-muted-foreground mt-2">
                          {lead.message}
                        </p>
                      ) : null}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Créé le{" "}
                      {new Date(lead.createdAt).toLocaleDateString("fr-FR")}
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr]">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Statut</label>
                      <Select
                        value={lead.status}
                        onValueChange={(value) =>
                          void updateLead(lead.id, { status: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {statusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Priorité</label>
                      <Select
                        value={lead.priority}
                        onValueChange={(value) =>
                          void updateLead(lead.id, { priority: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {priorityOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Client final
                      </label>
                      <div className="flex items-center gap-2 rounded-md border p-3">
                        <Checkbox
                          checked={lead.isClient}
                          onCheckedChange={() =>
                            void updateLead(lead.id, {
                              isClient: !lead.isClient,
                            })
                          }
                        />
                        <span className="text-sm">Transformer en client</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Prochaine action
                      </label>
                      <Input
                        value={lead.nextStep}
                        onChange={(event) => {
                          const nextValue = event.target.value;
                          setLeads((current) =>
                            current.map((item) =>
                              item.id === lead.id
                                ? { ...item, nextStep: nextValue }
                                : item,
                            ),
                          );
                        }}
                        onBlur={() =>
                          void updateLead(lead.id, { nextStep: lead.nextStep })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Notes de suivi
                      </label>
                      <Textarea
                        value={lead.notes}
                        rows={3}
                        onChange={(event) => {
                          const nextValue = event.target.value;
                          setLeads((current) =>
                            current.map((item) =>
                              item.id === lead.id
                                ? { ...item, notes: nextValue }
                                : item,
                            ),
                          );
                        }}
                        onBlur={() =>
                          void updateLead(lead.id, { notes: lead.notes })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Admin() {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <AdminContent />;
}
