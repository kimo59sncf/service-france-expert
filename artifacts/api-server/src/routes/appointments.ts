import { Router } from "express";
import { db } from "@workspace/db";
import { appointmentsTable } from "@workspace/db";
import {
  CreateAppointmentBody,
  GetAppointmentParams,
  UpdateAppointmentParams,
  UpdateAppointmentBody,
} from "@workspace/api-zod";
import { eq } from "drizzle-orm";

const router = Router();

router.post("/appointments", async (req, res) => {
  const parsed = CreateAppointmentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }
  const data = parsed.data;
  const [appointment] = await db
    .insert(appointmentsTable)
    .values({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      consultationType: data.consultationType,
      appointmentType: data.appointmentType,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime ?? null,
      description: data.description,
      nationality: data.nationality ?? null,
      currentStatus: data.currentStatus ?? null,
      status: "pending",
    })
    .returning();
  res.status(201).json({
    ...appointment,
    createdAt: appointment.createdAt.toISOString(),
  });
});

router.get("/appointments", async (_req, res) => {
  const appointments = await db.select().from(appointmentsTable);
  res.json(
    appointments.map((a) => ({ ...a, createdAt: a.createdAt.toISOString() }))
  );
});

router.get("/appointments/:id", async (req, res) => {
  const parsed = GetAppointmentParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [appointment] = await db
    .select()
    .from(appointmentsTable)
    .where(eq(appointmentsTable.id, parsed.data.id));
  if (!appointment) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ ...appointment, createdAt: appointment.createdAt.toISOString() });
});

router.patch("/appointments/:id", async (req, res) => {
  const paramsParsed = UpdateAppointmentParams.safeParse({
    id: Number(req.params.id),
  });
  const bodyParsed = UpdateAppointmentBody.safeParse(req.body);
  if (!paramsParsed.success || !bodyParsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }
  const updateData: Record<string, string> = {};
  if (bodyParsed.data.status) updateData.status = bodyParsed.data.status;
  if (bodyParsed.data.preferredDate)
    updateData.preferredDate = bodyParsed.data.preferredDate;
  if (bodyParsed.data.preferredTime)
    updateData.preferredTime = bodyParsed.data.preferredTime;

  const [updated] = await db
    .update(appointmentsTable)
    .set(updateData)
    .where(eq(appointmentsTable.id, paramsParsed.data.id))
    .returning();
  if (!updated) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ ...updated, createdAt: updated.createdAt.toISOString() });
});

export default router;
