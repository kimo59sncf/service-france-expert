import { Router } from "express";
import { SubscribeNewsletterBody } from "@workspace/api-zod";
import { createLead } from "../lib/local-store";

const router = Router();

router.post("/newsletter", async (req, res) => {
  const parsed = SubscribeNewsletterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  const data = parsed.data;
  const lead = await createLead({
    source: "newsletter",
    type: "Newsletter",
    fullName: data.fullName ?? "Abonné newsletter",
    email: data.email,
    notes: "Inscription à la newsletter locale.",
    metadata: { source: "homepage" },
  });

  res.status(201).json({ id: lead.id, email: lead.email, createdAt: lead.createdAt });
});

export default router;
