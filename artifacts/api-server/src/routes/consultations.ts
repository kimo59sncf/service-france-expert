import { Router } from "express";
import { db } from "@workspace/db";
import { consultationsTable } from "@workspace/db";
import { SubmitConsultationBody } from "@workspace/api-zod";

const router = Router();

router.post("/consultations", async (req, res) => {
  const parsed = SubmitConsultationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }
  const data = parsed.data;
  const [consultation] = await db
    .insert(consultationsTable)
    .values({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      nationality: data.nationality,
      situationType: data.situationType,
      currentTitle: data.currentTitle ?? null,
      arrivalDate: data.arrivalDate ?? null,
      description: data.description,
      urgency: data.urgency ?? "normal",
      status: "pending",
    })
    .returning();
  res.status(201).json({
    ...consultation,
    createdAt: consultation.createdAt.toISOString(),
  });
});

router.get("/consultations", async (_req, res) => {
  const consultations = await db.select().from(consultationsTable);
  res.json(
    consultations.map((c) => ({ ...c, createdAt: c.createdAt.toISOString() }))
  );
});

export default router;
