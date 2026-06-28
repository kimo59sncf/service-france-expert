import { Router } from "express";
import { db } from "@workspace/db";
import {
  contactsTable,
  appointmentsTable,
  consultationsTable,
  newsletterTable,
} from "@workspace/db";
import { eq, count } from "drizzle-orm";

const router = Router();

router.get("/stats", async (_req, res) => {
  const [totalContacts] = await db
    .select({ value: count() })
    .from(contactsTable);
  const [totalAppointments] = await db
    .select({ value: count() })
    .from(appointmentsTable);
  const [totalConsultations] = await db
    .select({ value: count() })
    .from(consultationsTable);
  const [totalNewsletter] = await db
    .select({ value: count() })
    .from(newsletterTable);
  const [pendingAppointments] = await db
    .select({ value: count() })
    .from(appointmentsTable)
    .where(eq(appointmentsTable.status, "pending"));
  const [completedConsultations] = await db
    .select({ value: count() })
    .from(consultationsTable)
    .where(eq(consultationsTable.status, "completed"));

  res.json({
    totalContactRequests: Number(totalContacts.value),
    totalAppointments: Number(totalAppointments.value),
    totalConsultations: Number(totalConsultations.value),
    totalNewsletterSubscribers: Number(totalNewsletter.value),
    pendingAppointments: Number(pendingAppointments.value),
    completedConsultations: Number(completedConsultations.value),
  });
});

export default router;
