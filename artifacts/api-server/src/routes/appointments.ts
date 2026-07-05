import { Router } from "express";
import { CreateAppointmentBody } from "@workspace/api-zod";
import { createLead } from "../lib/local-store";

const router = Router();

router.post("/appointments", async (req, res) => {
  const parsed = CreateAppointmentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  const data = parsed.data;
  const lead = await createLead({
    source: "appointment",
    type: "Rendez-vous téléphonique",
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    subject: data.consultationType,
    message: data.description,
    metadata: {
      appointmentType: data.appointmentType,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime ?? null,
      nationality: data.nationality ?? null,
      currentStatus: data.currentStatus ?? null,
    },
    status: "rdv_pris",
    nextStep: "Confirmer le créneau téléphonique",
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

router.get("/appointments", async (_req, res) => {
  res.json([]);
});

export default router;
