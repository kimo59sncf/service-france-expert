import { Router } from "express";
import { createLead, listLeads, updateLead } from "../lib/local-store";

const router = Router();

router.get("/leads", async (_req, res) => {
  res.json(await listLeads());
});

router.post("/leads", async (req, res) => {
  const lead = await createLead({
    source: req.body?.source ?? "contact",
    type: req.body?.type ?? "lead",
    fullName: req.body?.fullName ?? "Client local",
    email: req.body?.email ?? "contact@servicefranceexpert.fr",
    phone: req.body?.phone ?? null,
    subject: req.body?.subject ?? null,
    message: req.body?.message ?? null,
    metadata: req.body?.metadata ?? {},
  });
  res.status(201).json(lead);
});

router.patch("/leads/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const updated = await updateLead(id, req.body);
  if (!updated) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }

  res.json(updated);
});

export default router;
