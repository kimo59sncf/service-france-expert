import { Router } from "express";
import { db } from "@workspace/db";
import { contactsTable } from "@workspace/db";
import { SubmitContactBody, GetContactParams } from "@workspace/api-zod";
import { eq } from "drizzle-orm";

const router = Router();

router.post("/contact", async (req, res) => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }
  const data = parsed.data;
  const [contact] = await db
    .insert(contactsTable)
    .values({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      callbackRequested: data.callbackRequested ?? false,
      preferredTime: data.preferredTime ?? null,
    })
    .returning();
  res.status(201).json({
    ...contact,
    createdAt: contact.createdAt.toISOString(),
  });
});

router.get("/contact/:id", async (req, res) => {
  const parsed = GetContactParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [contact] = await db
    .select()
    .from(contactsTable)
    .where(eq(contactsTable.id, parsed.data.id));
  if (!contact) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ ...contact, createdAt: contact.createdAt.toISOString() });
});

export default router;
