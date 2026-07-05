import { Router } from "express";
import { SubmitConsultationBody } from "@workspace/api-zod";
import { createLead } from "../lib/local-store";

const router = Router();

router.post("/consultations", async (req, res) => {
  const parsed = SubmitConsultationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  const data = parsed.data;
  const lead = await createLead({
    source: "consultation",
    type: "Consultation juridique",
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    subject: data.situationType,
    message: data.description,
    metadata: {
      nationality: data.nationality,
      currentTitle: data.currentTitle ?? null,
      arrivalDate: data.arrivalDate ?? null,
      urgency: data.urgency ?? "normal",
    },
  });

  res.status(201).json({
    id: lead.id,
    fullName: lead.fullName,
    email: lead.email,
    phone: lead.phone,
    createdAt: lead.createdAt,
    leadId: lead.id,
  });
});

router.get("/consultations", async (_req, res) => {
  res.json([]);
});

export default router;
