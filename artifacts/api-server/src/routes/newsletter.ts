import { Router } from "express";
import { db } from "@workspace/db";
import { newsletterTable } from "@workspace/db";
import { SubscribeNewsletterBody } from "@workspace/api-zod";

const router = Router();

router.post("/newsletter", async (req, res) => {
  const parsed = SubscribeNewsletterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }
  const data = parsed.data;
  try {
    const [sub] = await db
      .insert(newsletterTable)
      .values({
        email: data.email,
        fullName: data.fullName ?? null,
      })
      .returning();
    res.status(201).json({
      ...sub,
      createdAt: sub.createdAt.toISOString(),
    });
  } catch {
    res.status(400).json({ error: "Email already subscribed" });
  }
});

export default router;
