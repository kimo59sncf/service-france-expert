import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export type LeadStatus = "nouveau" | "en_cours" | "rdv_pris" | "client" | "archive";
export type LeadPriority = "basse" | "moyenne" | "haute";
export type LeadSource = "contact" | "consultation" | "appointment" | "newsletter";

export interface LeadRecord {
  id: number;
  source: LeadSource;
  type: string;
  fullName: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message?: string | null;
  status: LeadStatus;
  priority: LeadPriority;
  nextStep: string;
  notes: string;
  isClient: boolean;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

interface LeadInput {
  source: LeadSource;
  type: string;
  fullName: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message?: string | null;
  status?: LeadStatus;
  priority?: LeadPriority;
  nextStep?: string;
  notes?: string;
  isClient?: boolean;
  metadata?: Record<string, unknown>;
}

const dataDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "data");
const dataFile = path.join(dataDir, "leads.json");

async function ensureStore(): Promise<void> {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify([], null, 2), "utf8");
  }
}

async function readLeads(): Promise<LeadRecord[]> {
  await ensureStore();
  const raw = await fs.readFile(dataFile, "utf8");
  const parsed = JSON.parse(raw) as LeadRecord[];
  return Array.isArray(parsed) ? parsed : [];
}

async function writeLeads(leads: LeadRecord[]): Promise<void> {
  await ensureStore();
  await fs.writeFile(dataFile, JSON.stringify(leads, null, 2), "utf8");
}

export async function listLeads(): Promise<LeadRecord[]> {
  const leads = await readLeads();
  return leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function createLead(input: LeadInput): Promise<LeadRecord> {
  const leads = await readLeads();
  const now = new Date().toISOString();
  const lead: LeadRecord = {
    id: leads.length > 0 ? Math.max(...leads.map((item) => item.id)) + 1 : 1,
    source: input.source,
    type: input.type,
    fullName: input.fullName,
    email: input.email,
    phone: input.phone ?? null,
    subject: input.subject ?? null,
    message: input.message ?? null,
    status: input.status ?? "nouveau",
    priority: input.priority ?? "moyenne",
    nextStep: input.nextStep ?? "Appeler dans la journée",
    notes: input.notes ?? "Lead capturé depuis le formulaire local.",
    isClient: input.isClient ?? false,
    metadata: input.metadata ?? {},
    createdAt: now,
    updatedAt: now,
  };
  leads.unshift(lead);
  await writeLeads(leads);
  return lead;
}

export async function updateLead(id: number, updates: Partial<LeadRecord>): Promise<LeadRecord | null> {
  const leads = await readLeads();
  const index = leads.findIndex((lead) => lead.id === id);
  if (index === -1) {
    return null;
  }
  const updated = {
    ...leads[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  leads[index] = updated;
  await writeLeads(leads);
  return updated;
}

export async function getLeadCount(): Promise<number> {
  const leads = await readLeads();
  return leads.length;
}

export async function getPendingLeadCount(): Promise<number> {
  const leads = await readLeads();
  return leads.filter((lead) => lead.status !== "client" && lead.status !== "archive").length;
}
