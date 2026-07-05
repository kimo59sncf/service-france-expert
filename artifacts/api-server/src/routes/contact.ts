import { Router } from "express";
import { SubmitContactBody } from "@workspace/api-zod";
import { createLead } from "../lib/local-store";

const router = Router();

router.post("/contact", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  const data = parsed.data;
  const lead = await createLead({
    source: "contact",
    type: "Demande de contact",
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    subject: data.subject,
    message: data.message,
    metadata: {
      callbackRequested: data.callbackRequested ?? false,
      preferredTime: data.preferredTime ?? null,
    },
  });

  res.status(201).json({
    id: lead.id,
    fullName: lead.fullName,
    email: lead.email,
    phone: lead.phone,
    subject: lead.subject,
    message: lead.message,
    callbackRequested: Boolean(req.body?.callbackRequested),
    preferredTime: req.body?.preferredTime ?? null,
    createdAt: lead.createdAt,
    leadId: lead.id,
  });
});

export default router;
